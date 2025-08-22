import type { CollectionConfig } from 'payload'

/**
 * @description Invoice entity for managing billing and payment records
 */
export const Invoice: CollectionConfig = {
  slug: 'invoices',
  admin: {
    useAsTitle: 'invoiceNumber',
    defaultColumns: ['aid', 'invoiceNumber', 'amount', 'status', 'dueDate', 'updatedAt'],
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
              // Generate AID in format: I-XXXXXX (I for Invoice)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'I-'
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
      name: 'invoiceNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Invoice number',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Invoice amount',
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
        description: 'Currency for the invoice',
      },
    },
    {
      name: 'issueDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date when invoice was issued',
      },
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Due date for payment',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Paid', value: 'paid' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of the invoice',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Invoice description or notes',
      },
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Client name',
      },
    },
    {
      name: 'clientEmail',
      type: 'email',
      admin: {
        description: 'Client email address',
      },
    },
  ],
}
