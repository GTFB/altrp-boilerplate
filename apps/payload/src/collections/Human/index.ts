import type { CollectionConfig } from 'payload'

/**
 * @description Human entity for managing people and individuals
 */
export const Human: CollectionConfig = {
  slug: 'humans',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['aid', 'fullName', 'email', 'phone', 'status', 'updatedAt'],
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
              // Generate AID in format: H-XXXXXX (H for Human)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'H-'
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
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'Person full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        description: 'Person email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Person phone number',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        description: 'Person date of birth',
      },
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to say', value: 'prefer_not_to_say' },
      ],
      admin: {
        description: 'Person gender',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Person address',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Person biography or description',
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
        description: 'Current status of the person',
      },
    },
  ],
}
