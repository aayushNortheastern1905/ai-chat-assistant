import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { useChat } from './hooks/useChat';

function App() {
  const {
    chats,
    currentChat,
    isLoading,
    error,
    createNewChat,
    sendMessage,
    switchChat,
    deleteChat,
    clearCurrentChat  // NEW: Import clear function
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#fefdfb] overflow-hidden">
      <Sidebar
        chats={chats}
        currentChatId={currentChat?.id}
        onNewChat={createNewChat}
        onSelectChat={switchChat}
        onDeleteChat={deleteChat}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      <ChatArea
        chat={currentChat}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
        onToggleSidebar={toggleSidebar}
        onClearChat={clearCurrentChat}  // NEW: Pass clear function
      />
    </div>
  );
}

export default App;