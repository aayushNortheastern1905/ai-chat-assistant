import React from 'react';
import NewChatButton from './NewChatButton';
import { getPreviewText, formatTimestamp } from '../utils/helpers';

const Sidebar = ({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 lg:w-72 bg-[#f5f0e8] border-r border-[#e8dcc8] 
        flex flex-col h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-[#e8dcc8]">
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4734e] to-[#c85a36] flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                  <circle cx="10" cy="10" r="3"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-[#2d2521]">Atlas AI</h1>
            </div>
            
            {/* Close button - mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden text-[#6b5d52] hover:text-[#2d2521] p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <NewChatButton onClick={() => { onNewChat(); onClose(); }} />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => { onSelectChat(chat.id); onClose(); }}
              className={`group px-3 py-3 mb-1 cursor-pointer rounded-lg transition-all ${
                currentChatId === chat.id
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2d2521] truncate">
                    {chat.title}
                  </p>
                  {chat.messages.length > 0 && (
                    <p className="text-xs text-[#6b5d52] truncate mt-1">
                      {getPreviewText(chat.messages[0].text)}
                    </p>
                  )}
                  <p className="text-xs text-[#9a8c7f] mt-1">
                    {formatTimestamp(chat.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-[#9a8c7f] hover:text-[#d4734e] transition-all p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#e8dcc8]">
          <div className="flex items-center gap-2 text-xs text-[#6b5d52]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Powered by OpenAI</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
