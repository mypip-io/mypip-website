export const landingPageSchema = {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
        },
        {
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },

    // Features Section
    {
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Feature Icon',
                  type: 'string',
                  description: 'Emoji or icon identifier',
                },
                {
                  name: 'image',
                  title: 'Feature Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'image',
                },
              },
            },
          ],
        },
      ],
    },

    // Testimonials Section
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'author',
                  title: 'Author Name',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'authorTitle',
                  title: 'Author Title/Company',
                  type: 'string',
                },
                {
                  name: 'authorImage',
                  title: 'Author Photo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'rating',
                  title: 'Rating (1-5 stars)',
                  type: 'number',
                  validation: (Rule: any) => Rule.min(1).max(5),
                },
              ],
              preview: {
                select: {
                  title: 'author',
                  subtitle: 'quote',
                  media: 'authorImage',
                },
              },
            },
          ],
        },
      ],
    },

    // Case Studies Section
    {
      name: 'caseStudiesSection',
      title: 'Case Studies Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'caseStudies',
          title: 'Case Studies',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Case Study Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'summary',
                  title: 'Summary',
                  type: 'text',
                },
                {
                  name: 'metrics',
                  title: 'Key Metrics',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Metric Label',
                          type: 'string',
                        },
                        {
                          name: 'value',
                          title: 'Metric Value',
                          type: 'string',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'image',
                  title: 'Case Study Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'link',
                  title: 'Read More Link',
                  type: 'string',
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'summary',
                  media: 'image',
                },
              },
            },
          ],
        },
      ],
    },

    // Newsletter Section
    {
      name: 'newsletterSection',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'placeholderText',
          title: 'Email Placeholder Text',
          type: 'string',
        },
      ],
    },

    // Meta Information
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines and social media',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines and social media',
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'ogImage',
      title: 'Social Media Image',
      type: 'image',
      description: 'Image for social media sharing',
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      title: 'heroSection.headline',
      subtitle: 'seoDescription',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: title || 'Landing Page',
        subtitle: subtitle || 'Homepage content',
      }
    },
  },
}