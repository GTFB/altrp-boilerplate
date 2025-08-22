import type { CollectionConfig } from 'payload'

/**
 * @description Qualification entity for managing certifications, licenses, and skills
 */
export const Qualification: CollectionConfig = {
  slug: 'qualifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'type', 'level', 'status', 'updatedAt'],
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
              // Generate AID in format: Q-XXXXXX (Q for Qualification)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'Q-'
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
        description: 'Qualification title or name',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Certification', value: 'certification' },
        { label: 'License', value: 'license' },
        { label: 'Training', value: 'training' },
        { label: 'Experience', value: 'experience' },
      ],
      required: true,
      admin: {
        description: 'Type of qualification',
      },
    },
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      defaultValue: 'beginner',
      admin: {
        description: 'Qualification level',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Qualification description',
      },
    },
    {
      name: 'issuingOrganization',
      type: 'text',
      admin: {
        description: 'Organization that issued the qualification',
      },
    },
    {
      name: 'issueDate',
      type: 'date',
      admin: {
        description: 'Date when qualification was issued',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      admin: {
        description: 'Expiration date of the qualification',
      },
    },
    {
      name: 'credentialId',
      type: 'text',
      admin: {
        description: 'Credential identification number',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Expired', value: 'expired' },
        { label: 'Pending', value: 'pending' },
        { label: 'Revoked', value: 'revoked' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the qualification',
      },
    },
  ],
}
