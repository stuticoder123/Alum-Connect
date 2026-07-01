# 🎓 AlumConnect

### Empowering Alumni • Guiding Students • Building Futures 🚀

A modern AI-powered alumni-student networking platform designed to provide mentorship, collaboration, career guidance, and community-driven growth.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![MIT License](https://img.shields.io/badge/License-MIT-yellow)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)

## 🚀 Features

### 🎯 Core Features
- **Social Feed** - Share posts, experiences, and insights
- **Free Mentorship** - Connect students with alumni mentors
- **Coding Challenges** - Daily programming problems with leaderboards
- **Events & Workshops** - Community events and learning sessions
- **Resource Sharing** - Curated learning materials and guides
- **Real-time Chat** - Internal messaging and community discussions

### 🤖 AI-Powered Features
- **Smart Mentor Matching** - AI algorithm matches students with relevant alumni
- **Coding Bot** - Interactive bot for daily challenges and learning resources
- **Intelligent Recommendations** - Personalized content and connection suggestions

### 🏆 Gamification
- **Points System** - Earn points for solving problems and helping others
- **Leaderboards** - Compete with peers in coding challenges
- **Streaks** - Maintain daily coding streaks for rewards
- **Badges** - Achievement system for various milestones

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Router** for navigation

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** database with Row Level Security
- **Real-time subscriptions** for live updates
- **Authentication** with email/password

### Development Tools
- **Vite** for fast development
- **ESLint** for code quality
- **TypeScript** for type safety

## 📂 Project Structure

```text
Alum-Connect/
│
├── src/
│   │   App.tsx
│   │   main.tsx
│   │   index.css
│   │
│   ├── components/
│   │   ├── ai/
│   │   │   └── MentorshipMatcher.tsx
│   │   │
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatBot.tsx
│   │   │   ├── CodingBot.tsx
│   │   │   ├── FirebaseService.ts
│   │   │   ├── InternalChatModule.tsx
│   │   │   ├── SocketService.ts
│   │   │   └── WebRTCService.ts
│   │   │
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── mobile/
│   │   ├── pwa/
│   │   ├── ui/
│   │   └── verification/
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/
│   │   ├── useCodingProblems.ts
│   │   ├── useNotifications.ts
│   │   ├── usePosts.ts
│   │   └── usePWA.ts
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── CoursesPage.tsx
│       ├── ResourcesPage.tsx
│       ├── DashboardPage.tsx
│       ├── ProfilePage.tsx
│       ├── BlogPage.tsx
│       ├── SuccessStoriesPage.tsx
│       │
│       ├── auth/
│       │   ├── Callback.tsx
│       │   └── ResetPassword.tsx
│       │
│       └── courses/
│           └── GetStartedPage.tsx
│
├── public/
├── supabase/
├── package.json
├── vite.config.ts
└── README.md
```

### 📖 Folder Overview

| Folder | Purpose |
|----------|----------|
| `components/ai` | AI-powered mentor matching features |
| `components/chat` | Real-time chat, bots & communication modules |
| `components/dashboard` | Alumni, student & admin dashboards |
| `components/home` | Homepage sections and landing page UI |
| `components/layout` | Navbar, Footer & reusable layouts |
| `components/mobile` | Mobile-first interactions |
| `components/pwa` | Progressive Web App functionality |
| `components/ui` | Shared UI components |
| `components/verification` | User verification workflows |
| `contexts` | Global state management |
| `hooks` | Custom React hooks |
| `lib` | External integrations & utilities |
| `pages` | Application routes and pages |
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for production)
- LinkedIn Developer Account (for LinkedIn OAuth)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/alumconnect.git
   cd alumconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials in `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up LinkedIn OAuth (Optional)**
   **To enable LinkedIn sign-in:**
   
   a) **Create LinkedIn App:**
   - Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
   - Click "Create App" and fill in the required information:
     - App name: "AlumConnect"
     - LinkedIn Page: Create a LinkedIn page for your app or use personal
     - App logo: Upload your app logo
     - Legal agreement: Accept terms
   
   b) **Configure LinkedIn App:**
   - In your LinkedIn app dashboard, go to "Auth" tab
   - Add these redirect URLs:
     - For local development: `http://127.0.0.1:54321/auth/v1/callback`
     - For production: `https://your-project.supabase.co/auth/v1/callback`
   - Request access to these scopes:
     - `r_liteprofile` (to retrieve basic profile info)
     - `r_emailaddress` (to retrieve email address)
   
   c) **Configure Supabase:**
   - In your Supabase dashboard: Authentication > Providers > LinkedIn
   - Enable LinkedIn provider
   - Add your LinkedIn Client ID and Client Secret
   - Save the configuration
   
   d) **Update Local Config:**
   - In `supabase/config.toml`, update the LinkedIn section:
     ```toml
     [auth.external.linkedin]
     enabled = true
     client_id = "your_linkedin_client_id"
     secret = "your_linkedin_client_secret"
     redirect_uri = "http://127.0.0.1:54321/auth/v1/callback"
     ```

4. **Set up Supabase (Optional - for local development)**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Start local Supabase
   supabase start
   
   # Run migrations
   supabase db reset
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Deployment

#### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

#### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **profiles** - User profile information
- **posts** - Social media posts and content
- **post_reactions** - Likes, loves, and other reactions
- **comments** - Post comments and discussions
- **connections** - User network connections
- **mentorship_sessions** - Mentoring session records
- **coding_problems** - Daily coding challenges
- **user_problem_submissions** - User coding submissions
- **leaderboard** - Coding challenge rankings
- **events** - Community events and workshops
- **resources** - Learning materials and guides
- **notifications** - User notifications

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- **Authentication** via Supabase Auth
- **Data validation** on both client and server
- **Secure API endpoints** with proper authorization

## 🎨 Design System

- **Modern UI/UX** with clean, intuitive design
- **Responsive design** for all device sizes
- **Consistent color scheme** with indigo/purple gradients
- **Smooth animations** and micro-interactions
- **Accessibility** features and ARIA labels

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Created by Stuti Gupta**
- 3rd year B.Tech. CSE student @ RCEW, Jaipur
- GitHub: [@stuticoder123](https://github.com/stuticoder123)
- LinkedIn: [stuticoder1](https://www.linkedin.com/in/stuticoder1/)
- Email: stuticoder123@gmail.com

## 🙏 Acknowledgments

- Thanks to all the open-source libraries and tools used
- Inspired by the need for better alumni-student connections
- Built with ❤️ for the global student community

## 📞 Support

For support, email stuticoder123@gmail.com or create an issue in the GitHub repository.

---

**AlumConnect** - Empowering Connections. Enabling Futures. 🚀
