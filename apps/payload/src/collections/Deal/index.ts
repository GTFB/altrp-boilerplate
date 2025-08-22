import type { CollectionConfig } from 'payload'

/**
 * @description Deal entity for managing business deals and sales opportunities
 */
export const Deal: CollectionConfig = {
  slug: 'deals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'value', 'status', 'updatedAt'],
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
              // Generate AID in format: D-XXXXXX (D for Deal)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'D-'
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
        description: 'Deal title or name',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      admin: {
        description: 'Deal value amount',
      },
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
        { label: 'RUB', value: 'rub' },
      ],
      defaultValue: 'usd',
      admin: {
        description: 'Currency for the deal value',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Prospecting', value: 'prospecting' },
        { label: 'Qualification', value: 'qualification' },
        { label: 'Proposal', value: 'proposal' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Closed Won', value: 'closed_won' },
        { label: 'Closed Lost', value: 'closed_lost' },
      ],
      defaultValue: 'prospecting',
      admin: {
        description: 'Current status of the deal',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description of the deal',
      },
    },
    {
      name: 'expectedCloseDate',
      type: 'date',
      admin: {
        description: 'Expected date when deal will close',
      },
    },
  ],
}
