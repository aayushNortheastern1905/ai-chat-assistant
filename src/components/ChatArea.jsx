import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import { getTimeBasedGreeting, getTimeEmoji } from '../utils/greetings';

const ChatArea = ({ chat, isLoading, error, onSendMessage, onToggleSidebar, onClearChat }) => {
  const messagesEndRef = useRef(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [greeting, setGreeting] = useState(getTimeBasedGreeting());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages, isLoading]);

  // Update greeting periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleClearClick = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    onClearChat();
    setShowClearConfirm(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col bg-[#fefdfb]">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#e8dcc8] bg-white">
          <button
            onClick={onToggleSidebar}
            className="text-[#6b5d52] hover:text-[#2d2521] p-2 touch-manipulation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-[#2d2521]">Atlas AI</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e8b88f] to-[#d4a574] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                <circle cx="10" cy="10" r="3"/>
              </svg>
            </div>
            <div className="mb-3">
              <span className="text-4xl mb-3 inline-block">{getTimeEmoji()}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2d2521] mb-3">
              {greeting.title}
            </h2>
            <p className="text-[#6b5d52] text-base md:text-lg">
              {greeting.subtitle}
            </p>
          </div>
        </div>
        <InputBox onSend={onSendMessage} isLoading={false} disabled={true} />
      </div>
    );
  }

  const hasMessages = chat.messages.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-[#fefdfb] relative">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#e8dcc8] bg-white sticky top-0 z-30">
        <button
          onClick={onToggleSidebar}
          className="text-[#6b5d52] hover:text-[#2d2521] p-2 touch-manipulation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#2d2521] truncate max-w-[60%]">{chat.title}</h1>
        {hasMessages && (
          <button
            onClick={handleClearClick}
            className="text-[#d4734e] hover:text-[#c85a36] p-2 touch-manipulation"
            title="Clear chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Desktop header with clear button */}
      {hasMessages && (
        <div className="hidden lg:flex items-center justify-end p-4 border-b border-[#e8dcc8] bg-white">
          <button
            onClick={handleClearClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#d4734e] hover:text-white hover:bg-[#d4734e] border border-[#d4734e] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Chat</span>
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2d2521] mb-2">Clear this chat?</h3>
                <p className="text-sm text-[#6b5d52]">
                  This will permanently delete all messages in this conversation. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelClear}
                className="px-4 py-2 text-sm font-medium text-[#6b5d52] hover:text-[#2d2521] hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {chat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center max-w-2xl">
              <div className="mb-4">
                <span className="text-5xl">{getTimeEmoji()}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2d2521] mb-3">
                {greeting.title}
              </h2>
              <p className="text-[#6b5d52] text-base md:text-lg">
                {greeting.subtitle}
              </p>
            </div>
          </div>
        ) : (
          <>
            {chat.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="py-6 md:py-8 bg-[#faf8f5]">
                <div className="max-w-3xl mx-auto px-4 md:px-6">
                  <div className="flex gap-3 md:gap-6">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-[#e8b88f] to-[#d4a574] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                        <circle cx="10" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="py-6 md:py-8 bg-white">
                <div className="max-w-3xl mx-auto px-4 md:px-6">
                  <div className="bg-[#fef2f2] border-l-4 border-[#d4734e] rounded-lg px-4 md:px-6 py-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#d4734e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-[#991b1b] text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <InputBox onSend={onSendMessage} isLoading={isLoading} disabled={false} />
    </div>
  );
};

export default ChatArea;