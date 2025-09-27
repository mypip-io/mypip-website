export const pageSchema = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'About', value: 'about' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Features', value: 'features' },
          { title: 'Contact', value: 'contact' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },

    // Page Header
    {
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
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

    // Flexible Content Blocks
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        // Text Block
        {
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              content: 'content',
            },
            prepare(selection: any) {
              const { title, content } = selection
              const block = (content || []).find((block: any) => block._type === 'block')
              return {
                title: title || 'Text Block',
                subtitle: block
                  ? block.children
                      ?.filter((child: any) => child._type === 'span')
                      .map((span: any) => span.text)
                      .join('')
                  : 'No content',
              }
            },
          },
        },

        // Image Block
        {
          name: 'imageBlock',
          title: 'Image Block',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'size',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                  { title: 'Full Width', value: 'full' },
                ],
              },
              initialValue: 'medium',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'image',
            },
          },
        },

        // Features Grid
        {
          name: 'featuresGrid',
          title: 'Features Grid',
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
                      title: 'Icon',
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
          preview: {
            select: {
              title: 'title',
              subtitle: 'features.0.title',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection
              return {
                title: title || 'Features Grid',
                subtitle: subtitle ? `First feature: ${subtitle}` : 'No features yet',
              }
            },
          },
        },

        // Pricing Section
        {
          name: 'pricingSection',
          title: 'Pricing Section',
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
              name: 'plans',
              title: 'Pricing Plans',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Plan Name',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'price',
                      title: 'Price',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'period',
                      title: 'Billing Period',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Monthly', value: 'month' },
                          { title: 'Yearly', value: 'year' },
                          { title: 'One-time', value: 'once' },
                        ],
                      },
                    },
                    {
                      name: 'description',
                      title: 'Plan Description',
                      type: 'text',
                    },
                    {
                      name: 'features',
                      title: 'Features',
                      type: 'array',
                      of: [{ type: 'string' }],
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
                      name: 'isPopular',
                      title: 'Popular Plan',
                      type: 'boolean',
                      description: 'Mark this plan as most popular',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'price',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'plans.0.name',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection
              return {
                title: title || 'Pricing Section',
                subtitle: subtitle ? `First plan: ${subtitle}` : 'No plans yet',
              }
            },
          },
        },

        // CTA Section
        {
          name: 'ctaSection',
          title: 'Call-to-Action Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
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
              name: 'buttonUrl',
              title: 'Button URL',
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
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },

    // SEO
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

    // Publishing
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isActive',
      title: 'Page Active',
      type: 'boolean',
      description: 'Uncheck to hide this page from the website',
      initialValue: true,
    },
  ],

  orderings: [
    {
      title: 'Page Type',
      name: 'pageType',
      by: [{ field: 'pageType', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Last Modified',
      name: 'lastModified',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'pageType',
      description: 'slug.current',
    },
    prepare(selection: any) {
      const { title, subtitle, description } = selection
      return {
        title: title,
        subtitle: subtitle ? `Type: ${subtitle}` : 'Page',
        description: description ? `/${description}` : 'No slug',
      }
    },
  },
}