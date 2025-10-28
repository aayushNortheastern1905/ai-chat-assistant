import { useState, useEffect, useRef } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { generateId } from '../utils/helpers';
import { 
  validateMessage, 
  isLocalStorageAvailable, 
  checkStorageQuota,
  sanitizeChatData,
  VALIDATION_RULES 
} from '../utils/validation';

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastRequestTime = useRef(0);
  const storageAvailable = useRef(true);

  // Load chats from localStorage with error handling
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      setError('Browser storage is not available. Chats will not be saved.');
      storageAvailable.current = false;
      return;
    }

    try {
      const savedChats = localStorage.getItem('chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        const sanitized = sanitizeChatData(parsedChats);
        
        if (sanitized.length > 0) {
          setChats(sanitized);
          setCurrentChatId(sanitized[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load chats:', err);
      setError('Failed to load saved chats. Starting fresh.');
      // Clear corrupted data
      try {
        localStorage.removeItem('chats');
      } catch (e) {
        console.error('Cannot clear storage:', e);
      }
    }
  }, []);

  // Save chats to localStorage with error handling
  useEffect(() => {
    if (!storageAvailable.current || chats.length === 0) return;

    try {
      // Check storage quota
      const quotaCheck = checkStorageQuota();
      if (!quotaCheck.available) {
        setError(quotaCheck.error);
        return;
      }

      const sanitized = sanitizeChatData(chats);
      localStorage.setItem('chats', JSON.stringify(sanitized));
    } catch (err) {
      console.error('Failed to save chats:', err);
      
      if (err.name === 'QuotaExceededError') {
        setError('Storage limit exceeded. Please delete some old chats.');
      } else {
        setError('Failed to save chat history.');
      }
    }
  }, [chats]);

  const createNewChat = () => {
    // Check chat limit
    if (chats.length >= VALIDATION_RULES.MAX_CHATS) {
      setError(`Maximum ${VALIDATION_RULES.MAX_CHATS} chats allowed. Please delete some old chats.`);
      return;
    }

    const newChat = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now()
    };
    
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setError(null);
  };

  const sendMessage = async (messageText) => {
    // Validate message
    const validation = validateMessage(messageText);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime.current < VALIDATION_RULES.RATE_LIMIT_DELAY) {
      setError('Please wait a moment before sending another message.');
      return;
    }
    lastRequestTime.current = now;

    // Create new chat if none exists
    if (!currentChatId) {
      createNewChat();
      return;
    }

    // Prevent concurrent requests
    if (isLoading) {
      setError('Please wait for the current response to complete.');
      return;
    }

    const userMessage = {
      id: generateId(),
      text: validation.message,
      sender: 'user',
      timestamp: Date.now()
    };

    // Add user message
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 
                ? validation.message.substring(0, 30) 
                : chat.title
            }
          : chat
      )
    );

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToAI(validation.message);
      
      const aiMessage = {
        id: generateId(),
        text: aiResponse,
        sender: 'ai',
        timestamp: Date.now()
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
    } catch (err) {
      setError(err.message);
      
      // Remove user message if request failed
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChatId
            ? { 
                ...chat, 
                messages: chat.messages.filter(msg => msg.id !== userMessage.id) 
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchChat = (chatId) => {
    if (isLoading) {
      setError('Please wait for the current response to complete.');
      return;
    }
    
    setCurrentChatId(chatId);
    setError(null);
  };

  const deleteChat = (chatId) => {
    if (isLoading && chatId === currentChatId) {
      setError('Cannot delete chat while a message is being processed.');
      return;
    }

    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const clearCurrentChat = () => {
    if (!currentChatId) return;
    
    if (isLoading) {
      setError('Cannot clear chat while a message is being processed.');
      return;
    }
    
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [], title: 'New Chat' }
          : chat
      )
    );
    setError(null);
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  return {
    chats,
    currentChat: getCurrentChat(),
    isLoading,
    error,
    createNewChat,
    sendMessage,
    switchChat,
    deleteChat,
    clearCurrentChat
  };
};
