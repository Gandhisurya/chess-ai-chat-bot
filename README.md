Chess AI and AI-powered chatbot

📌 Live Preview URL

https://chess-ai-chat-bot.vercel.app

📖 Project Overview

ChessBot AI Messenger is an AI-powered chatbot designed to answer chess-related queries with precision. Built using Next.js and LangGraph, it intelligently responds to user messages, retrieves relevant FAQs, and generates context-aware responses using embeddings.

🔧 Tech Stack

Frontend: Next.js (React Framework)

Backend: Node.js

Database: MongoDB (Mongoose ORM)

AI Integration: LangGraph + Google GENAI

State Management: Zustand

Authentication: JWT-based authentication

📜 Architecture Diagram

![Architecture Diagram]([https://your-image-url.com/image.png](https://drive.google.com/file/d/1EHc1NcsDzJcv1K1Eu6MeU9mmcbEzKtkc/view?usp=sharing))

📊 Database Schema

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

📁 Reports & Videos

