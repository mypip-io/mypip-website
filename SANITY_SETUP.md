# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the MyPip website, including Studio deployment and content management.

## 1. Create a Sanity Project

1. **Sign up/Login to Sanity**:
   - Go to [sanity.io](https://sanity.io)
   - Create an account or sign in

2. **Create a new project**:
   ```bash
   npx @sanity/cli init
   ```
   - Choose "Create new project"
   - Give it a name like "MyPip Website"
   - Choose dataset name (usually "production")
   - Select schema template: "Clean project with no predefined schemas"

3. **Note your project details**:
   - Project ID (looks like: abc123def)
   - Dataset name (usually: production)

## 2. Update Environment Variables

Update your `.env.local` file with the actual values:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token

# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 3. Generate API Token

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to API → Tokens
4. Click "Add API token"
5. Give it a name like "MyPip Website"
6. Set permissions to "Editor" or "Admin"
7. Copy the token and add it to your `.env.local` as `SANITY_API_TOKEN`

## 4. Deploy Sanity Studio

### Option A: Deploy to Sanity's hosting

```bash
# Login to Sanity CLI
npx @sanity/cli login

# Deploy the studio
npx @sanity/cli deploy
```

This will deploy your studio to: `https://mypip-cms.sanity.studio`

### Option B: Use local Studio

The Studio is also available at `http://localhost:3000/studio` when running your Next.js dev server.

## 5. Studio Features

Your Sanity Studio includes:

### 📧 Email Submissions
- View all email captures from your website
- Filter by source (hero, footer, blog)
- See UTM tracking data
- Export email lists

### 📝 Blog Management
- Create and edit blog posts
- Rich text editor with images
- SEO metadata fields
- Draft/publish workflow
- Featured post settings

### 📊 Analytics Dashboard
- Email capture analytics
- Content performance metrics
- Source tracking

## 6. Content Management Workflow

### Creating Blog Posts
1. Go to Studio → Blog Posts → Create
2. Add title, content, and featured image
3. Set SEO metadata
4. Publish when ready

### Managing Email Submissions
1. Go to Studio → Email Submissions
2. View all captures with source tracking
3. Export lists for email marketing
4. Monitor conversion by source

## 7. Schema Details

### Email Schema
- Email address (validated)
- Source tracking (hero/footer/blog)
- UTM parameters
- User agent and IP tracking
- Timestamp

### Blog Post Schema
- Title and slug
- Rich content with images
- SEO metadata
- Author and publish date
- Tags and categories
- Featured post flag

## 8. Testing the Setup

1. **Test email capture**:
   - Go to your website
   - Submit an email through any form
   - Check Studio → Email Submissions

2. **Test blog functionality**:
   - Create a test blog post in Studio
   - Visit `/blog` on your website
   - Verify the post appears

## 9. Production Deployment

When deploying to Railway:

1. Set environment variables in Railway dashboard
2. Ensure `SANITY_API_TOKEN` has write permissions
3. Test email submissions in production
4. Verify Studio access

## 10. Troubleshooting

### Common Issues

**"Session not found" errors**:
- Check that `SANITY_API_TOKEN` is set correctly
- Verify the token has proper permissions

**Studio not loading**:
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that the project exists in your Sanity account

**Email submissions not saving**:
- Verify API token has write permissions
- Check network requests in browser dev tools

### Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://slack.sanity.io)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)

## 11. Next Steps

After setup:

1. Create your first blog post
2. Test email capture functionality
3. Customize Studio appearance if needed
4. Set up automated backups
5. Configure webhooks for real-time updates (optional)

Your MyPip website now has a fully functional CMS for content management and email capture tracking!