import type { CollectionConfig } from 'payload'

/**
 * @description Routine entity for managing recurring tasks and activities
 */
export const Routine: CollectionConfig = {
  slug: 'routines',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'frequency', 'status', 'nextDue', 'updatedAt'],
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
              // Generate AID in format: R-XXXXXX (R for Routine)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'R-'
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
        description: 'Routine title or name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Routine description',
      },
    },
    {
      name: 'frequency',
      type: 'select',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Yearly', value: 'yearly' },
        { label: 'Custom', value: 'custom' },
      ],
      required: true,
      admin: {
        description: 'Frequency of the routine',
      },
    },
    {
      name: 'customFrequency',
      type: 'text',
      admin: {
        condition: (data) => data.frequency === 'custom',
        description: 'Custom frequency description',
      },
    },
    {
      name: 'nextDue',
      type: 'date',
      required: true,
      admin: {
        description: 'Next due date for the routine',
      },
    },
    {
      name: 'lastCompleted',
      type: 'date',
      admin: {
        description: 'Date when routine was last completed',
      },
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
      ],
      defaultValue: 'medium',
      admin: {
        description: 'Priority level of the routine',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the routine',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Additional notes for the routine',
      },
    },
  ],
}
