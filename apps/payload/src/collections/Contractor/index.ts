import type { CollectionConfig } from 'payload'

/**
 * @description Contractor entity for managing external contractors and service providers
 */
export const Contractor: CollectionConfig = {
  slug: 'contractors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'email', 'phone', 'updatedAt'],
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
              // Generate AID in format: C-XXXXXX (C for Contractor)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'C-'
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
        description: 'Contractor full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Contractor email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Contractor phone number',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company name',
      },
    },
    {
      name: 'specialization',
      type: 'text',
      admin: {
        description: 'Contractor specialization or skills',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description of the contractor',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the contractor',
      },
    },
  ],
}
