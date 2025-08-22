import type { CollectionConfig } from 'payload'

/**
 * @description Zoo entity for managing zoological parks and animal exhibits
 */
export const Zoo: CollectionConfig = {
  slug: 'zoos',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'country', 'city', 'status', 'updatedAt'],
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
              // Generate AID in format: Z-XXXXXX (Z for Zoo)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'Z-'
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
        description: 'Zoo name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Zoo description',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country where zoo is located',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City where zoo is located',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Zoo address',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Zoo website URL',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Zoo contact email',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Zoo contact phone',
      },
    },
    {
      name: 'founded',
      type: 'number',
      admin: {
        description: 'Year when zoo was founded',
      },
    },
    {
      name: 'size',
      type: 'number',
      label: 'Size (hectares)',
      admin: {
        description: 'Zoo size in hectares',
      },
    },
    {
      name: 'annualVisitors',
      type: 'number',
      label: 'Annual Visitors',
      admin: {
        description: 'Annual number of visitors',
      },
    },
    {
      name: 'animals',
      type: 'array',
      admin: {
        description: 'Animals in the zoo',
      },
      fields: [
        {
          name: 'species',
          type: 'text',
          required: true,
          admin: {
            description: 'Animal species',
          },
        },
        {
          name: 'count',
          type: 'number',
          defaultValue: 1,
          admin: {
            description: 'Number of animals of this species',
          },
        },
        {
          name: 'exhibit',
          type: 'text',
          admin: {
            description: 'Exhibit where animals are located',
          },
        },
      ],
    },
    {
      name: 'exhibits',
      type: 'array',
      admin: {
        description: 'Zoo exhibits',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Exhibit name',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Exhibit description',
          },
        },
        {
          name: 'size',
          type: 'number',
          label: 'Size (sq meters)',
          admin: {
            description: 'Exhibit size in square meters',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Under Renovation', value: 'under_renovation' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
      defaultValue: 'open',
      admin: {
        description: 'Current status of the zoo',
      },
    },
    {
      name: 'openingHours',
      type: 'group',
      admin: {
        description: 'Zoo opening hours',
      },
      fields: [
        {
          name: 'monday',
          type: 'text',
          label: 'Monday',
          admin: {
            description: 'Monday opening hours',
          },
        },
        {
          name: 'tuesday',
          type: 'text',
          label: 'Tuesday',
          admin: {
            description: 'Tuesday opening hours',
          },
        },
        {
          name: 'wednesday',
          type: 'text',
          label: 'Wednesday',
          admin: {
            description: 'Wednesday opening hours',
          },
        },
        {
          name: 'thursday',
          type: 'text',
          label: 'Thursday',
          admin: {
            description: 'Thursday opening hours',
          },
        },
        {
          name: 'friday',
          type: 'text',
          label: 'Friday',
          admin: {
            description: 'Friday opening hours',
          },
        },
        {
          name: 'saturday',
          type: 'text',
          label: 'Saturday',
          admin: {
            description: 'Saturday opening hours',
          },
        },
        {
          name: 'sunday',
          type: 'text',
          label: 'Sunday',
          admin: {
            description: 'Sunday opening hours',
          },
        },
      ],
    },
  ],
}
