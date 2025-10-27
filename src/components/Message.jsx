import React from 'react';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`py-8 ${isUser ? 'bg-white' : 'bg-[#faf8f5]'}`}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-6">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-br from-[#d4734e] to-[#c85a36]' 
              : 'bg-gradient-to-br from-[#e8b88f] to-[#d4a574]'
          }`}>
            {isUser ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ) : (
              <span className="text-white font-bold text-sm">A</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-[#2d2521] leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;