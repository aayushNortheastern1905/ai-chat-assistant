export const VALIDATION_RULES = {
  MAX_MESSAGE_LENGTH: 4000,
  MIN_MESSAGE_LENGTH: 1,
  MAX_CHATS: 100,
  MAX_STORAGE_SIZE: 5 * 1024 * 1024, // 5MB
  API_TIMEOUT: 30000, // 30 seconds
  RATE_LIMIT_DELAY: 1000 // 1 second between requests
};

// Validate message input
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message must be a non-empty string' };
  }

  const trimmed = message.trim();
  
  if (trimmed.length < VALIDATION_RULES.MIN_MESSAGE_LENGTH) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (trimmed.length > VALIDATION_RULES.MAX_MESSAGE_LENGTH) {
    return { 
      valid: false, 
      error: `Message is too long. Maximum ${VALIDATION_RULES.MAX_MESSAGE_LENGTH} characters allowed.` 
    };
  }

  return { valid: true, message: trimmed };
};

// Check if localStorage is available
export const isLocalStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Check localStorage quota
export const checkStorageQuota = () => {
  if (!isLocalStorageAvailable()) {
    return { available: false, error: 'LocalStorage is not available' };
  }

  try {
    const used = new Blob(Object.values(localStorage)).size;
    const available = VALIDATION_RULES.MAX_STORAGE_SIZE - used;
    
    if (available < 100000) { // Less than 100KB
      return { 
        available: false, 
        error: 'Storage quota nearly full. Please delete some chats.' 
      };
    }

    return { available: true };
  } catch (e) {
    return { available: true }; // If we can't check, assume it's fine
  }
};

// Sanitize chat data
export const sanitizeChatData = (chats) => {
  if (!Array.isArray(chats)) return [];
  
  return chats
    .filter(chat => chat && chat.id && Array.isArray(chat.messages))
    .map(chat => ({
      id: chat.id,
      title: String(chat.title || 'New Chat').substring(0, 100),
      messages: chat.messages
        .filter(msg => msg && msg.id && msg.text && msg.sender)
        .map(msg => ({
          id: msg.id,
          text: String(msg.text).substring(0, VALIDATION_RULES.MAX_MESSAGE_LENGTH),
          sender: msg.sender,
          timestamp: Number(msg.timestamp) || Date.now()
        })),
      createdAt: Number(chat.createdAt) || Date.now()
    }))
    .slice(0, VALIDATION_RULES.MAX_CHATS);
};

// Check if online
export const isOnline = () => {
  return navigator.onLine;
};