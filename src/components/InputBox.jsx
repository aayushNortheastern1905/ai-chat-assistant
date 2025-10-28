import React, { useState } from 'react';
import { VALIDATION_RULES } from '../utils/validation';

const InputBox = ({ onSend, isLoading, disabled }) => {
  const [input, setInput] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    
    const trimmed = input.trim();
    
    if (!trimmed) {
      setLocalError('Message cannot be empty');
      return;
    }

    if (trimmed.length > VALIDATION_RULES.MAX_MESSAGE_LENGTH) {
      setLocalError(`Message too long (max ${VALIDATION_RULES.MAX_MESSAGE_LENGTH} characters)`);
      return;
    }

    if (!isLoading && !disabled) {
      onSend(trimmed);
      setInput('');
      setLocalError('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Clear error when user starts typing
    if (localError) setLocalError('');
    
    // Show warning near limit
    if (value.length > VALIDATION_RULES.MAX_MESSAGE_LENGTH - 100) {
      const remaining = VALIDATION_RULES.MAX_MESSAGE_LENGTH - value.length;
      if (remaining < 0) {
        setLocalError(`Message is ${Math.abs(remaining)} characters too long`);
      }
    }
  };

  const charCount = input.length;
  const showCount = charCount > VALIDATION_RULES.MAX_MESSAGE_LENGTH - 200;

  return (
    <div className="border-t border-[#e8dcc8] bg-white p-3 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative bg-white border-2 border-[#e8dcc8] rounded-xl md:rounded-2xl shadow-sm focus-within:border-[#d4734e] transition-colors">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message Atlas AI..."
            disabled={disabled || isLoading}
            rows={1}
            maxLength={VALIDATION_RULES.MAX_MESSAGE_LENGTH}
            className="w-full px-4 md:px-6 py-3 md:py-4 pr-12 md:pr-14 bg-transparent text-[#2d2521] placeholder-[#9a8c7f] focus:outline-none resize-none text-sm md:text-base disabled:opacity-50"
            style={{ minHeight: '48px', maxHeight: '200px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || disabled || charCount > VALIDATION_RULES.MAX_MESSAGE_LENGTH}
            className="absolute right-2 md:right-3 bottom-2 md:bottom-3 w-9 h-9 md:w-10 md:h-10 bg-[#d4734e] hover:bg-[#c85a36] active:bg-[#b44a2d] disabled:bg-[#e8dcc8] disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center touch-manipulation"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Character count and errors */}
        <div className="flex items-center justify-between mt-2 md:mt-3 px-1">
          <p className="text-xs text-[#9a8c7f]">
            AI can make mistakes. Check important info.
          </p>
          {showCount && (
            <p className={`text-xs font-medium ${
              charCount > VALIDATION_RULES.MAX_MESSAGE_LENGTH 
                ? 'text-red-600' 
                : charCount > VALIDATION_RULES.MAX_MESSAGE_LENGTH - 100
                ? 'text-orange-600'
                : 'text-[#9a8c7f]'
            }`}>
              {charCount}/{VALIDATION_RULES.MAX_MESSAGE_LENGTH}
            </p>
          )}
        </div>
        
        {localError && (
          <p className="text-xs text-red-600 mt-2 px-1">{localError}</p>
        )}
      </form>
    </div>
  );
};

export default InputBox;