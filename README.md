# Chess AI and AI-powered Chatbot

## 📌 Live Preview URL
[Chess AI Chatbot](https://chess-ai-chat-bot.vercel.app)

## 📖 Project Overview
ChessBot AI Messenger is an AI-powered chatbot designed to answer chess-related queries with precision. Built using **Next.js** and **LangGraph**, it intelligently responds to user messages, retrieves relevant FAQs, and generates context-aware responses using embeddings.

## 🔧 Tech Stack
- **Frontend:** Next.js (React Framework)
- **Backend:** Node.js
- **Database:** MongoDB (Mongoose ORM)
- **AI Integration:** LangGraph + Google GENAI
- **State Management:** Zustand
- **Authentication:** JWT-based authentication

## 📜 Architecture Diagram
![Architecture Diagram](https://res.cloudinary.com/dgxkm6xef/image/upload/v1739552094/Screenshot_2025-02-14_at_8.00.17_PM_duyggv.png)

## 📊 Database Schema
```yaml
users:
  - userId: string (Primary Key)
  - username: string
  - email: string
  - password: string (hashed)

messages:
  - messageId: string (Primary Key)
  - userId: string (Foreign Key → users.userId)
  - message: string
  - messageType: enum(USER, AI)
  - timestamp: date

faqs:
  - faqId: string (Primary Key)
  - question: string
  - answer: string
  - embeddings: array (768-dimension vector for similarity search)
```
✨ Why Choose Next.js & LangGraph?

✅ Next.js Advantages

Server-side rendering (SSR) for better performance

API routes to handle backend logic efficiently

Optimized for SEO with fast page loads

✅ LangGraph for AI Processing

Graph-based reasoning for enhanced AI workflows

Customizable pipeline for handling multi-step AI tasks

Seamless integration with OpenAI & embeddings

