# CanopyBooking

A modern, full-stack canopy rental booking application built with React, TypeScript, Supabase, and Express.

## 🚀 Features

- **User Authentication** - Sign up, sign in, and user management with Supabase
- **Canopy Booking System** - Book different types of canopies for events
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Live booking confirmations and status updates
- **Email Notifications** - Automated booking confirmations
- **Admin Dashboard** - Manage bookings and user accounts

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **Supabase** for authentication and database

### Backend
- **Express.js** server
- **Prisma** ORM for database management
- **JWT** authentication
- **Nodemailer** for email notifications
- **CORS** enabled for cross-origin requests

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd builder-zen-nest-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # Backend Configuration
   VITE_API_URL=http://localhost:8080
   
   # Database
   DATABASE_URL=your-database-url
   
   # JWT Secret
   JWT_SECRET=your-jwt-secret
   
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Netlify Deployment

1. **Connect to GitHub**
   - Push your code to GitHub
   - Connect your GitHub repository to Netlify

2. **Configure build settings**
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`
   - Node version: 18

3. **Set environment variables**
   - Add your Supabase credentials
   - Add your email configuration
   - Add your JWT secret

4. **Deploy**
   - Netlify will automatically build and deploy your site

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build:client
   ```

2. **Deploy the `dist/spa` folder** to your hosting provider

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   └── ui/            # UI component library
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── pages/             # Page components
├── server/                # Express backend
│   └── routes/            # API routes
├── shared/                # Shared types and utilities
├── backend/               # Database and server logic
│   ├── prisma/            # Database schema and migrations
│   └── src/               # Server source code
└── netlify/               # Netlify functions
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript checks

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings` - Get all bookings
- `PUT /bookings/:id/status` - Update booking status

### Products
- `GET /products` - Get all products
- `POST /admin/products` - Create product (admin)
- `PUT /admin/products/:id` - Update product (admin)
- `DELETE /admin/products/:id` - Delete product (admin)

## 📱 Pages

- `/` - Home page with package selection
- `/auth` - Authentication page (sign up/sign in)
- `/booking` - Booking form
- `/*` - 404 page

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `DATABASE_URL` | Database connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `EMAIL_USER` | Email address for notifications | Yes |
| `EMAIL_PASS` | Email app password | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@canopybooking.com or create an issue in the repository.


