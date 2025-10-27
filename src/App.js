import React from 'react';
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
    deleteChat
  } = useChat();

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar
        chats={chats}
        currentChatId={currentChat?.id}
        onNewChat={createNewChat}
        onSelectChat={switchChat}
        onDeleteChat={deleteChat}
      />
      <ChatArea
        chat={currentChat}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
      />
    </div>
  );
}

export default App;