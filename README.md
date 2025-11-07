# 🥇 FlowPilot - AI Project Manager

> **Notion × Trello × ChatGPT** for modern productivity teams

FlowPilot is a collaborative **AI-driven task management** application that organizes projects, predicts deadlines, and generates intelligent summaries for high-performing teams.

---

## 🚀 Features

### 🤖 AI-Powered Intelligence
- **AI Task Generator** – Convert project descriptions into structured task breakdowns using GPT-4  
- **Smart Notifications** – AI predicts which tasks need attention  
- **Weekly Summaries** – Automated project progress reports  
- **Intelligent Suggestions** – Priority adjustments and deadline predictions  

### 👥 Real-time Collaboration
- **Live Updates** – WebSocket-based team synchronization  
- **Kanban Boards** – Drag & drop with smooth animations  
- **Team Management** – Role-based access control  
- **Comment Threads** – Contextual task discussions  

### 📊 Advanced Analytics
- **Burn-down Charts** – Visual project progress tracking  
- **Velocity Metrics** – Team performance insights  
- **Completion Rates** – Project health monitoring  
- **Time Tracking** – Estimated vs actual hours  

### 🎨 Modern UI/UX
- **Responsive Design** – Works perfectly on all devices  
- **Dark/Light Mode** – Seamless theme switching  
- **Smooth Animations** – Framer Motion powered interactions  
- **Clean Interface** – Inspired by Linear.app with gradient accents  
- **Glass Morphism** – Modern backdrop blur effects  

---

## 🛠 Tech Stack

### 🖥️ Frontend
- **Next.js 14 (App Router)** – React framework  
- **TypeScript** – Type safety  
- **Tailwind CSS** – Utility-first styling  
- **ShadCN UI** – Component library  
- **Framer Motion** – Animations  
- **Recharts** – Data visualization  

### ⚙️ Backend & Database
- **Node.js** – Runtime environment  
- **Prisma ORM** – Database toolkit  
- **PostgreSQL** – Primary database  
- **WebSockets** – Real-time features  

### 🧠 AI & Services
- **OpenAI GPT-4** – AI task generation  
- **Clerk** – Authentication  
- **Zustand** – State management  
- **Date-fns** – Date utilities  
- **Next Themes** – Theme management  

---

## 🏁 Quick Start

### ✅ Prerequisites
- Node.js 18+  
- PostgreSQL database  
- Clerk account (for authentication)  
- OpenAI account (for AI features)  

---

### ⚡ Installation

#### 1. Clone and Setup
```bash
git clone <repository>
npm install
```
#### 2. Environment Configuration
```bash
cp .env.example .env.local
```
Edit .env.local with your credentials:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/flowpilot"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npx prisma db seed
```

#### 4. Run Development Server
```bash
npm run dev
```
Open 👉 http://localhost:3000

#### 5. 💻 VS Code Setup (Recommended)
🔌 Extensions
1. Tailwind CSS IntelliSense <br>
2. TypeScript and JavaScript Language Features <br>
3. Prisma <br>
4. Prettier – Code formatter <br>
5. Auto Rename Tag <br>
6. ESLint <br>
7. Framer Motion Snippets

#### 6. ⚙️ Recommended Settings
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

#### 7. 📦 Project Structure
```text
flowpilot/
├── app/                    # Next.js 14 App Router
│   ├── dashboard/          # Main application
│   │   ├── components/     # Dashboard components
│   │   ├── settings/       # Settings page
│   │   └── [pages]/        # Other dashboard pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   └── ui/                 # ShadCN UI components
├── lib/                    # Utilities and configuration
│   ├── utils.ts            # Helper functions
│   ├── prisma.ts           # Database client
│   └── auth.ts             # Authentication helpers
├── store/                  # Zustand state management
├── prisma/                 # Database schema and migrations
├── types/                  # TypeScript definitions
└── public/                 # Static assets
```

#### 8. 🚀 Deployment
🧭 Vercel (Recommended)

1. Connect your GitHub repository to Vercel

2. Add environment variables in Vercel Dashboard

3. Deploy automatically on git push

#### 9. 🌍 Production Environment Variables
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### 10. 🏗️ Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

#### 11. 📊 Module Information
```table
| Category             | Modules                    |
| -------------------- | -------------------------- |
| **Core Framework**   | Next.js, React, TypeScript |
| **Styling**          | Tailwind CSS, ShadCN UI    |
| **Database**         | Prisma, PostgreSQL         |
| **Authentication**   | Clerk                      |
| **AI Integration**   | OpenAI                     |
| **State Management** | Zustand                    |
| **UI Components**    | Radix UI, Lucide React     |
| **Animations**       | Framer Motion              |
| **Themes**           | Next Themes                |
| **Utilities**        | Date-fns, Axios            |
```
