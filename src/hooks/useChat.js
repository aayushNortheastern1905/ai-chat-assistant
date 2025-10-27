import { useState, useEffect } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { generateId } from '../utils/helpers';

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      }
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = () => {
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
    if (!currentChatId) {
      createNewChat();
      return;
    }

    const userMessage = {
      id: generateId(),
      text: messageText,
      sender: 'user',
      timestamp: Date.now()
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? messageText.substring(0, 30) : chat.title
            }
          : chat
      )
    );

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToAI(messageText);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const switchChat = (chatId) => {
    setCurrentChatId(chatId);
    setError(null);
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
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
    deleteChat
  };
};
