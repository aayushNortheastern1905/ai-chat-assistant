import React, { useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './InputBox';

const ChatArea = ({ chat, isLoading, error, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages, isLoading]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col bg-[#fefdfb]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e8b88f] to-[#d4a574] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#2d2521] mb-3">Welcome back</h2>
            <p className="text-[#6b5d52] text-lg">Start a new conversation to get started</p>
          </div>
        </div>
        <InputBox onSend={onSendMessage} isLoading={false} disabled={true} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fefdfb]">
      <div className="flex-1 overflow-y-auto">
        {chat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl px-6">
              <h2 className="text-3xl font-semibold text-[#2d2521] mb-3">
                How can I help you today?
              </h2>
              <p className="text-[#6b5d52] text-lg">
                Ask me anything, and I'll do my best to assist you.
              </p>
            </div>
          </div>
        ) : (
          <>
            {chat.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="py-8 bg-[#faf8f5]">
                <div className="max-w-3xl mx-auto px-6">
                  <div className="flex gap-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e8b88f] to-[#d4a574] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">A</span>
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
              <div className="py-8 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                  <div className="bg-[#fef2f2] border-l-4 border-[#d4734e] rounded-lg px-6 py-4">
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