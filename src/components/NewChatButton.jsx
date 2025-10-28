import React from 'react';

const NewChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#d4734e] hover:bg-[#c85a36] active:bg-[#b44a2d] transition-colors text-white font-medium shadow-sm touch-manipulation"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span>New Chat</span>
    </button>
  );
};

export default NewChatButton;