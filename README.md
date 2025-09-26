# MyPip Website

A Next.js website for MyPip with a founder's notebook aesthetic - authentic, handwritten, and conversion-focused.

## 🎨 Design Features

- **Founder's notebook aesthetic** with grid paper background
- **Handwritten annotations** using Google Fonts Kalam
- **Yellow highlighter marks** on key benefits
- **Post-it note style cards** for testimonials and CTAs
- **Dashed borders** and hand-drawn elements
- **Coffee stains** and authentic imperfections
- **Crossed-out text** showing iteration
- **Red pen corrections** and annotations
- **Torn paper edges** using CSS clip-path
- **Gentle animations** for authentic feel

## 🛠 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Sanity CMS** for content management
- **PostHog** for analytics
- **Railway** for deployment

## 🚀 Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Sanity and PostHog credentials.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Structure

### Homepage Sections
1. **Hero** - "Stop playing SDR roulette" with email capture
2. **Product Video** - Placeholder with 2:34 duration note
3. **Case Studies** - Sticky notes with 40% reply rate, 65% connection rate, 3x meetings
4. **Logo Section** - Placeholder for customer logos
5. **Problem Section** - Old way broken (SDR costs, spam tools, DIY struggles)
6. **Solution Section** - Quality over quantity approach with green highlights
7. **Testimonial** - Sarah Chen from TechStart
8. **How It Works** - 3-step process demonstration
9. **Final CTA** - Sticky note styling with email capture
10. **Footer** - Founder-friendly messaging

### Blog Functionality
- SEO-optimized blog pages
- Sanity CMS integration
- Newsletter signup on each post

## 🎯 Key Features

- **Email Capture** - Saves to Sanity with source tracking
- **Analytics** - PostHog integration with event tracking
- **Mobile Responsive** - Works perfectly on all devices
- **SEO Optimized** - Proper meta tags and structure
- **CMS Integration** - Easy content management with Sanity

## 🚀 Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main

### Environment Variables Needed:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

## 📊 Sanity CMS Setup

The project includes schemas for:
- **Email captures** with source tracking
- **Blog posts** with rich content
- **Testimonials** with featured flagging

## 🎨 Design Philosophy

This website feels like a founder's working notebook:
- **Authentic imperfections** build trust
- **Handwritten annotations** add personality
- **Highlight markers** draw attention naturally
- **Post-it notes** create visual hierarchy
- **Coffee stains** add character
- **Crossed-out iterations** show transparency

Built by founders, for founders. Because we get it.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint