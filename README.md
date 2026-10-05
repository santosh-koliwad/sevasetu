# SevaSetu Digital Centre

A modern, mobile-friendly web application for an Indian Common Service Centre (CSC) / Digital Service Centre.

## Features
- Bilingual support (English + Kannada)
- Google Login authentication
- Customer service requests
- Admin CMS for managing services, categories, FAQs, and site settings
- Responsive modern UI using Tailwind CSS

## Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend/Database: Supabase (PostgreSQL, Auth)
- Hosting Target: Vercel Free Tier

## Deployment Instructions

### 1. Supabase Setup
1. Create a project on [Supabase](https://supabase.com).
2. Go to the SQL Editor and run the entire contents of `supabase/schema.sql` to create tables, RLS policies, and insert initial settings.
3. Enable Google Auth Provider in Authentication -> Providers. You will need a Google Cloud project with OAuth credentials.

### 2. Environment Variables
Create a `.env.local` file in the root of the project with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Vercel Deployment
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel environment variables.
4. Deploy.

### 4. Admin Access
The first user to log in will be a `customer`. To make them an admin:
1. Go to Supabase Table Editor -> `profiles`.
2. Find the user row and change `role` from `customer` to `admin`.
3. The user can now access `/admin` to manage the site.

## Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
