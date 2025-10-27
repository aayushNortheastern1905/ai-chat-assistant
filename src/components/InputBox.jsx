import React, { useState } from 'react';

const InputBox = ({ onSend, isLoading, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t border-[#e8dcc8] bg-white p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative bg-white border-2 border-[#e8dcc8] rounded-2xl shadow-sm focus-within:border-[#d4734e] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message AI Assistant..."
            disabled={disabled || isLoading}
            rows={1}
            className="w-full px-6 py-4 pr-14 bg-transparent text-[#2d2521] placeholder-[#9a8c7f] focus:outline-none resize-none"
            style={{ minHeight: '56px', maxHeight: '200px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || disabled}
            className="absolute right-3 bottom-3 w-10 h-10 bg-[#d4734e] hover:bg-[#c85a36] disabled:bg-[#e8dcc8] disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-[#9a8c7f] text-center mt-3">
          AI can make mistakes. Check important info.
        </p>
      </form>
    </div>
  );
};

export default InputBox;
