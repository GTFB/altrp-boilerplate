import type { CollectionConfig } from 'payload'

/**
 * @description Vote entity for managing voting processes and elections
 */
export const Vote: CollectionConfig = {
  slug: 'votes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['aid', 'title', 'type', 'status', 'startDate', 'endDate', 'updatedAt'],
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
              // Generate AID in format: V-XXXXXX (V for Vote)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'V-'
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
        description: 'Vote title or question',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Vote description',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Election', value: 'election' },
        { label: 'Referendum', value: 'referendum' },
        { label: 'Survey', value: 'survey' },
        { label: 'Poll', value: 'poll' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Type of vote',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Vote start date',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Vote end date',
      },
    },
    {
      name: 'options',
      type: 'array',
      admin: {
        description: 'Voting options',
      },
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
          admin: {
            description: 'Voting option',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Option description',
          },
        },
      ],
      required: true,
      minRows: 2,
    },
    {
      name: 'eligibleVoters',
      type: 'array',
      admin: {
        description: 'List of eligible voters',
      },
      fields: [
        {
          name: 'voter',
          type: 'text',
          admin: {
            description: 'Eligible voter',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Closed', value: 'closed' },
        { label: 'Results Published', value: 'results_published' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of the vote',
      },
    },
    {
      name: 'results',
      type: 'array',
      admin: {
        description: 'Vote results',
      },
      fields: [
        {
          name: 'option',
          type: 'text',
          admin: {
            description: 'Voting option',
          },
        },
        {
          name: 'votes',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of votes for this option',
          },
        },
      ],
    },
  ],
}
