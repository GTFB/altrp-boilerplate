import type { CollectionConfig } from 'payload'

/**
 * @description Text entity for managing various types of text content and documents
 */
export const Text: CollectionConfig = {
  slug: 'texts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'type', 'language', 'status', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'aid',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique Alternative Identifier (AID)',
      },
      hooks: {
        beforeValidate: [
          /**
           * Generates AID before document validation
           */
          ({ data }) => {
            if (data && !data.aid) {
              // Generate AID in format: T-XXXXXX (T for Text)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'T-'
              for (let i = 0; i < 6; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length))
              }
              data.aid = result
            }
            return data
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Text title',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Text content',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Blog Post', value: 'blog_post' },
        { label: 'Documentation', value: 'documentation' },
        { label: 'News', value: 'news' },
        { label: 'Story', value: 'story' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'article',
      admin: {
        description: 'Type of text content',
      },
    },
    {
      name: 'language',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'en',
      admin: {
        description: 'Language of the text',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Text summary or abstract',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Tags for categorizing the text',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          admin: {
            description: 'Individual tag',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
        { label: 'Under Review', value: 'under_review' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of the text',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        description: 'Publication date',
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        description: 'Text author',
      },
    },
  ],
}
