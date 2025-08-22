import type { CollectionConfig } from 'payload'

/**
 * @description Outreach entity for managing marketing and communication campaigns
 */
export const Outreach: CollectionConfig = {
  slug: 'outreaches',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'type', 'status', 'targetDate', 'updatedAt'],
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
              // Generate AID in format: O-XXXXXX (O for Outreach)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'O-'
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
        description: 'Outreach campaign title',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Email Campaign', value: 'email_campaign' },
        { label: 'Social Media', value: 'social_media' },
        { label: 'Direct Mail', value: 'direct_mail' },
        { label: 'Phone Call', value: 'phone_call' },
        { label: 'Event', value: 'event' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Type of outreach campaign',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Campaign description',
      },
    },
    {
      name: 'targetAudience',
      type: 'text',
      admin: {
        description: 'Target audience for the campaign',
      },
    },
    {
      name: 'targetDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Target date for the campaign',
      },
    },
    {
      name: 'budget',
      type: 'number',
      admin: {
        description: 'Campaign budget amount',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'planning',
      admin: {
        description: 'Current status of the campaign',
      },
    },
    {
      name: 'results',
      type: 'textarea',
      admin: {
        description: 'Campaign results and outcomes',
      },
    },
  ],
}
