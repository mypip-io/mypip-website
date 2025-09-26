export const emailSchema = {
  name: 'email',
  title: 'Email Submission',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Footer Section', value: 'footer' },
          { title: 'Blog', value: 'blog' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
    },
    {
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
    },
    {
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
    },
    {
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
    },
    {
      name: 'referrer',
      title: 'Referrer',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'source',
      description: 'subscribedAt',
    },
    prepare(selection: any) {
      const { title, subtitle, description } = selection
      return {
        title: title,
        subtitle: `Source: ${subtitle}`,
        description: description ? new Date(description).toLocaleDateString() : '',
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
    {
      title: 'Email A-Z',
      name: 'emailAsc',
      by: [{ field: 'email', direction: 'asc' }],
    },
  ],
}