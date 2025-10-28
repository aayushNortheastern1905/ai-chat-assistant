# Atlas AI

A modern AI chat application with a clean interface and smart features.

## What It Does

Atlas AI is a web-based chat application that lets you have conversations with AI. It features multiple chat sessions, persistent history, and a responsive design that works on any device.

## Key Features

- **AI Conversations** - Powered by OpenAI GPT-3.5-turbo
- **Multiple Chats** - Create and switch between different conversations
- **Chat History** - All conversations saved automatically in your browser
- **Time-Based Greetings** - Dynamic welcome messages based on time of day
- **Clear Chat** - Remove messages from current conversation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smart Validation** - Input validation, error handling, and rate limiting

## Tech Stack

- React 18
- Tailwind CSS 3
- Axios
- OpenAI API
- LocalStorage

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/[YOUR_USER_NAME]/ai-chat-assistant.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your OpenAI API key
Create a `.env` file in the root folder:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

### 4. Start the app
```bash
npm start
```

Open http://localhost:3000

## Project Structure

```
src/
├── components/        # UI components (Sidebar, ChatArea, Message, etc.)
├── services/         # API integration
├── hooks/            # Custom React hooks
├── utils/            # Helper functions and validation
├── App.js            # Main app
└── index.css         # Styles
```

## How to Use

1. Click "New Chat" to start a conversation
2. Type your message and press Enter or click Send
3. View all your chats in the left sidebar
4. Click "Clear Chat" to remove messages from current chat
5. Delete unwanted chats using the trash icon

## Common Issues

**App won't start?**
- Make sure Node.js is installed
- Run `npm install` again
- Check that `.env` file exists with your API key

**Getting API errors?**
- Verify your OpenAI API key is correct
- Check you have credits in your OpenAI account
- Make sure you're connected to the internet

**Styles not loading?**
- Run `npm install -D tailwindcss postcss autoprefixer`
- Restart the dev server

## Notes

- Chats are stored in your browser's localStorage
- API key is used client-side (add a backend for production)
- Maximum 100 chats and 4000 characters per message

## Author

Aayush Rajendra Sawant

Built as a technical assessment project.