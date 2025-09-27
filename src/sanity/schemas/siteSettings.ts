export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [
    // disable create and delete actions for singleton
    'update',
    'publish',
  ],
  fields: [
    // Company Information
    {
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'tagline',
          title: 'Company Tagline',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
        },
        {
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Small icon for browser tabs (recommended: 32x32px)',
        },
      ],
    },

    // Contact Information
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
          validation: (Rule: any) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
        {
          name: 'supportEmail',
          title: 'Support Email',
          type: 'string',
          validation: (Rule: any) => Rule.email(),
        },
      ],
    },

    // Social Media Links
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'string',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'string',
        },
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'string',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'string',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'string',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'string',
        },
      ],
    },

    // Navigation
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'headerLinks',
          title: 'Header Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Link Label',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'isExternal',
                  title: 'External Link',
                  type: 'boolean',
                  description: 'Check if this link goes to an external website',
                },
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'url',
                },
              },
            },
          ],
        },
        {
          name: 'footerLinks',
          title: 'Footer Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'section',
                  title: 'Section Title',
                  type: 'string',
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Link Label',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: 'url',
                          title: 'URL',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: 'isExternal',
                          title: 'External Link',
                          type: 'boolean',
                        },
                      ],
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'section',
                  subtitle: 'links.0.label',
                },
              },
            },
          ],
        },
      ],
    },

    // Footer Content
    {
      name: 'footerContent',
      title: 'Footer Content',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
        },
        {
          name: 'aboutText',
          title: 'About Text',
          type: 'text',
          description: 'Brief description shown in footer',
        },
        {
          name: 'newsletterTitle',
          title: 'Newsletter Section Title',
          type: 'string',
        },
        {
          name: 'newsletterDescription',
          title: 'Newsletter Description',
          type: 'text',
        },
      ],
    },

    // SEO Defaults
    {
      name: 'seoDefaults',
      title: 'SEO Defaults',
      type: 'object',
      fields: [
        {
          name: 'defaultTitle',
          title: 'Default Page Title',
          type: 'string',
          description: 'Fallback title for pages without specific SEO titles',
        },
        {
          name: 'titleTemplate',
          title: 'Title Template',
          type: 'string',
          description: 'Template for page titles (use %s for page title)',
          placeholder: '%s | MyPip',
        },
        {
          name: 'defaultDescription',
          title: 'Default Meta Description',
          type: 'text',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'defaultOgImage',
          title: 'Default Social Media Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Twitter username (without @)',
        },
      ],
    },

    // Analytics & Tracking
    {
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (G-XXXXXXXXXX)',
        },
        {
          name: 'postHogKey',
          title: 'PostHog API Key',
          type: 'string',
          description: 'PostHog project API key',
        },
        {
          name: 'postHogHost',
          title: 'PostHog Host',
          type: 'string',
          description: 'PostHog instance URL',
        },
      ],
    },

    // Legal Pages
    {
      name: 'legalPages',
      title: 'Legal Pages',
      type: 'object',
      fields: [
        {
          name: 'privacyPolicyUrl',
          title: 'Privacy Policy URL',
          type: 'string',
        },
        {
          name: 'termsOfServiceUrl',
          title: 'Terms of Service URL',
          type: 'string',
        },
        {
          name: 'cookiePolicyUrl',
          title: 'Cookie Policy URL',
          type: 'string',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'companyInfo.companyName',
      subtitle: 'companyInfo.tagline',
      media: 'companyInfo.logo',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Global site configuration',
        media,
      }
    },
  },
}