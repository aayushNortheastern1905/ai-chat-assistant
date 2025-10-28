# AI Chat Assistant

A lightweight, Claude-inspired AI chat application built with React that integrates with OpenAI's GPT-3.5 API to provide intelligent conversational responses.

## 🎯 Overview

This project is a modern web application that allows users to interact with AI through a clean, intuitive interface. Users can create multiple chat sessions, view chat history, and receive AI-powered responses in real-time.

## ✨ Features

- **AI-Powered Conversations**: Real-time responses powered by OpenAI's GPT-3.5-turbo model
- **Multiple Chat Sessions**: Create and manage multiple independent conversations
- **Chat History**: Automatically saves all conversations locally using browser storage
- **Clean UI**: Claude-inspired design with warm, professional aesthetics
- **Error Handling**: Graceful error messages and loading states
- **Responsive Design**: Works seamlessly across different screen sizes
- **Delete Conversations**: Remove unwanted chat sessions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios
- **AI API**: OpenAI GPT-3.5-turbo
- **Build Tool**: Create React App
- **State Management**: React Hooks (useState, useEffect)
- **Local Storage**: Browser localStorage for chat persistence

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- An OpenAI API key

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-chat-assistant.git
cd ai-chat-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

**To get an OpenAI API key:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           # Left sidebar with chat history
│   ├── ChatArea.jsx           # Main chat display area
│   ├── Message.jsx            # Individual message component
│   ├── InputBox.jsx           # Message input field
│   └── NewChatButton.jsx      # New chat creation button
├── services/
│   └── aiService.js           # OpenAI API integration
├── hooks/
│   └── useChat.js             # Custom hook for chat logic
├── utils/
│   └── helpers.js             # Utility functions
├── App.js                     # Main app component
├── index.js                   # Entry point
└── index.css                  # Global styles
```

## 🎨 Design Philosophy

The UI is inspired by Claude AI's clean, professional aesthetic:
- Warm beige and cream color palette
- Clear visual hierarchy
- Smooth animations and transitions
- Minimalist, distraction-free interface

## 🔧 Configuration

### Changing the AI Model

To use a different OpenAI model, edit `src/services/aiService.js`:

```javascript
model: 'gpt-4' // Change from 'gpt-3.5-turbo'
```

### Adjusting Response Length

Modify the `max_tokens` parameter in `src/services/aiService.js`:

```javascript
max_tokens: 1000 // Increase for longer responses
```

## 🐛 Troubleshooting

**Issue: API Key Error (401/403)**
- Ensure your API key is correctly set in `.env`
- Verify the key is active on OpenAI platform
- Restart the development server after adding the key

**Issue: Rate Limit Error (429)**
- Check your OpenAI account has available credits
- Consider adding billing information to your OpenAI account

**Issue: Tailwind Styles Not Loading**
- Ensure `tailwind.config.js` and `postcss.config.js` exist
- Run `npm install -D tailwindcss postcss autoprefixer`
- Restart the development server

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## 🔒 Security Notes

- Never commit your `.env` file or expose your API key
- The `.env` file is included in `.gitignore`
- In production, use environment variables or a backend proxy

## 🚀 Future Enhancements

Potential features for future development:
- User authentication
- Cloud-based chat history sync
- Export chat conversations
- Custom AI prompt templates
- Dark/light theme toggle
- Voice input support
- Markdown rendering for code blocks

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Aayush Rajendra Sawant**

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Claude AI for design inspiration
- React and Tailwind CSS communities