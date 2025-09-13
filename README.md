# AlumConnect - Social Platform for Alumni-Student Connections

AlumConnect is a comprehensive social platform designed to bridge the gap between alumni and students, providing free mentorship, networking opportunities, and a thriving community for knowledge sharing.

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

---

## 🔐 Google OAuth Integration

Google sign-in is implemented via Supabase Auth OAuth provider.

### 1. Google Cloud Console Setup
1. Go to https://console.cloud.google.com/
2. Create or select a project.
3. Navigate to: APIs & Services > OAuth consent screen
   - User Type: External (publish when ready)
   - Add scopes: email, profile (OpenID basic info is implicit)
4. Go to: APIs & Services > Credentials > Create Credentials > OAuth Client ID
   - Application Type: Web application
   - Authorized redirect URIs (exact strings):
     - Local development: `http://127.0.0.1:54321/auth/v1/callback`
     - Production: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
5. Copy the Client ID & Client Secret.

### 2. Supabase Provider Configuration
In Supabase Dashboard:
Authentication > Providers > Google
- Enable the provider
- Paste your Client ID & Client Secret
- Save

No Google secret is exposed in the frontend code; Supabase performs the server-side exchange.

### 3. Environment Variables
Minimum required in your `.env` (copied from `.env.example`):
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional explicit base for constructing redirect URL
VITE_AUTH_REDIRECT_URL=http://localhost:5173
```

### 4. Frontend Usage
The reusable component `GoogleSignInButton` calls:
```ts
supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '<origin>/auth/callback' } });
```
Redirect target is centralized via `getAuthRedirectUrl()` in `src/lib/supabase.ts`.

### 5. Testing Checklist
| Scenario | Expected Result |
|----------|-----------------|
| Click Google button | Redirect to Google consent screen |
| Approve consent | Redirect back to `/auth/callback` then app session established |
| Cancel consent | Return with no session; show friendly error if provided |
| Wrong redirect URI | Google error page about mismatch |
| Missing Supabase keys | App throws startup error (guard rails) |

### 6. Common Issues
| Issue | Cause | Fix |
|-------|-------|-----|
| 400 redirect_uri_mismatch | Typo or missing URI in Google credentials | Add exact callback URI (no trailing slash) |
| Provider disabled | Not enabled in Supabase | Enable Google provider and save |
| Module not found: lucide-react | Dependencies missing | Run `npm install` |
| Blank screen after redirect | Runtime error / keys missing | Check browser console & `.env` values |

### 7. Next Enhancements (Optional)
- Auto-create profile on first OAuth login if not present.
- Add analytics event for OAuth start/success/failure.
- Add unified OAuth error banner on callback page.

---