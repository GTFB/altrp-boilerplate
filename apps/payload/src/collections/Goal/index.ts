import type { CollectionConfig } from 'payload'

/**
 * @description Goal entity for managing objectives and targets
 */
export const Goal: CollectionConfig = {
  slug: 'goals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'targetDate', 'status', 'priority', 'updatedAt'],
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
              // Generate AID in format: G-XXXXXX (G for Goal)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'G-'
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
        description: 'Goal title or name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description of the goal',
      },
    },
    {
      name: 'targetDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Target completion date',
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
        description: 'Goal priority level',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'not_started',
      admin: {
        description: 'Current status of the goal',
      },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: {
        description: 'Progress percentage (0-100)',
      },
    },
  ],
}
