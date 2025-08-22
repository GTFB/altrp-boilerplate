import type { CollectionConfig } from 'payload'

/**
 * @description University entity for managing educational institutions
 */
export const University: CollectionConfig = {
  slug: 'universities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'country', 'type', 'status', 'updatedAt'],
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
              // Generate AID in format: U-XXXXXX (U for University)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'U-'
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
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'University name',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
        { label: 'For-Profit', value: 'for_profit' },
        { label: 'Non-Profit', value: 'non_profit' },
      ],
      defaultValue: 'public',
      admin: {
        description: 'Type of university',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country where university is located',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City where university is located',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'University address',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'University website URL',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'University contact email',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'University contact phone',
      },
    },
    {
      name: 'founded',
      type: 'number',
      admin: {
        description: 'Year when university was founded',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'University description',
      },
    },
    {
      name: 'accreditation',
      type: 'array',
      admin: {
        description: 'University accreditation information',
      },
      fields: [
        {
          name: 'body',
          type: 'text',
          admin: {
            description: 'Accrediting body',
          },
        },
        {
          name: 'date',
          type: 'date',
          admin: {
            description: 'Accreditation date',
          },
        },
        {
          name: 'expiry',
          type: 'date',
          admin: {
            description: 'Accreditation expiry date',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Suspended', value: 'suspended' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the university',
      },
    },
  ],
}
