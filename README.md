# Portfolio Website - Isah Ibn Muhammad

A modern, full-stack portfolio website with an admin dashboard built with Next.js, Prisma, and SQLite.

## Features

- **Modern Portfolio Design**: Light theme with bold headings and animated floating skill icons
- **Hero Section**: Eye-catching introduction with AI-generated profile picture and CTAs
- **Experience Section**: Showcase professional work history
- **Projects Section**: Display featured projects with technologies and impact
- **Skills Section**: Organized by category (Frontend, Backend, DevOps)
- **Products Section**: Highlight products like Retail POS Dashboard System
- **Contact Form**: Integrated with email notifications via Nodemailer
- **Admin Dashboard**: Full CRUD operations for all content
- **Secure Authentication**: Custom auth with bcrypt password hashing
- **Database**: Prisma ORM with SQLite (easily switchable to PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Gmail account for email notifications

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL="file:./dev.db"
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
```

For Gmail App Password, visit: https://myaccount.google.com/apppasswords

3. **Initialize and seed the database** (one command):
```bash
npm run db:setup
```

This command will:
- Generate Prisma client
- Run migrations to create all tables
- Seed the database with your professional data
- Create the default admin user

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Dashboard

Access the admin dashboard at `/admin/login`

**Default Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**Important:** Change the default password immediately after first login!

## Database Management

### View database:
```bash
npx prisma studio
```

### Available Database Commands:
```bash
npm run db:migrate    # Run migrations only
npm run db:seed       # Seed database only
npm run db:setup      # Run migrations + seed (fresh setup)
```

### Switch to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
```

3. Migrate:
```bash
npx prisma migrate dev --name init
npm run db:seed
```

## Email Configuration

The contact form uses Nodemailer with Gmail. To set up:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add credentials to `.env`:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   └── page.tsx            # Main portfolio page
├── components/
│   ├── admin/              # Admin dashboard components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # Authentication utilities
│   ├── email.tsx          # Email sending utilities
│   └── session.ts         # Session management
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeding script
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## Features Breakdown

### Portfolio Frontend
- Animated hero section with profile picture
- Dynamic content from database
- Responsive design with Tailwind CSS
- Smooth animations and transitions
- Contact form with validation

### Admin Dashboard
- Secure authentication with session management
- Manage experience entries
- Manage projects with featured flag
- Manage skills by category
- Manage products
- View and manage contact messages
- Mark messages as read/unread

### Email Integration
- Automatic email to admin when contact form is submitted
- Auto-reply email to sender
- HTML formatted emails
- Error handling (saves to DB even if email fails)

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL ready
- **Authentication**: Custom auth with bcrypt, HTTP-only cookies
- **Email**: Nodemailer with Gmail
- **UI Components**: shadcn/ui

## Security

- Passwords hashed with bcrypt (10 rounds)
- HTTP-only cookies for sessions
- Protected API routes with session verification
- Input validation on forms
- SQL injection protection via Prisma

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (PostgreSQL connection string from Neon/Supabase/etc.)
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
4. Run migrations in Vercel:
   - The build command automatically runs `prisma generate`
   - After first deploy, run: `npm run db:setup` in Vercel CLI or add as a build hook
5. Deploy!

## Troubleshooting

### Database Errors
If you see "relation does not exist" errors:
```bash
npm run db:setup
```

### Email Not Sending
1. Verify Gmail App Password is correct (16 characters, no spaces)
2. Ensure 2FA is enabled on Gmail account
3. Check `.env` file has correct credentials
4. Contact messages still save to database even if email fails

### Admin Login Issues
1. Ensure database is seeded: `npm run db:seed`
2. Default credentials: `admin@example.com` / `admin123`
3. Check browser console for errors

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

Isah Ibn Muhammad
- Email: officialibn001@gmail.com
- Phone: +234 903 888 0282
- GitHub: [@Officialibn1](https://github.com/Officialibn1)
- LinkedIn: [Isah Ibn Muhammad](https://www.linkedin.com/in/isah-ibn-muhammad)
