import type { CollectionConfig } from 'payload'

/**
 * @description Finance entity for managing financial transactions and records
 */
export const Finance: CollectionConfig = {
  slug: 'finances',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'amount', 'type', 'status', 'updatedAt'],
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
              // Generate AID in format: F-XXXXXX (F for Finance)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'F-'
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
        description: 'Financial transaction title',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Transaction amount',
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
        description: 'Currency for the transaction',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
        { label: 'Investment', value: 'investment' },
        { label: 'Loan', value: 'loan' },
      ],
      required: true,
      admin: {
        description: 'Type of financial transaction',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Transaction category',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description of the transaction',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Transaction date',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      admin: {
        description: 'Current status of the transaction',
      },
    },
  ],
}
