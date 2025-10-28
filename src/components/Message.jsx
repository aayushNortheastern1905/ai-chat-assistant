import React from 'react';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`py-6 md:py-8 ${isUser ? 'bg-white' : 'bg-[#faf8f5]'}`}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="flex gap-3 md:gap-6">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-br from-[#d4734e] to-[#c85a36]' 
              : 'bg-gradient-to-br from-[#e8b88f] to-[#d4a574]'
          }`}>
            {isUser ? (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                <circle cx="10" cy="10" r="3"/>
              </svg>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-[#2d2521] leading-relaxed whitespace-pre-wrap text-sm md:text-base break-words">
              {message.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
