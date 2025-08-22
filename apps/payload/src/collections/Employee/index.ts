import type { CollectionConfig } from 'payload'

/**
 * @description Employee entity for managing company employees and staff information
 */
export const Employee: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['aid', 'fullName', 'position', 'department', 'status', 'updatedAt'],
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
              // Generate AID in format: E-XXXXXX (E for Employee)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'E-'
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
        description: 'Employee full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        description: 'Employee email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Employee phone number',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: {
        description: 'Employee job position or title',
      },
    },
    {
      name: 'department',
      type: 'text',
      admin: {
        description: 'Employee department',
      },
    },
    {
      name: 'hireDate',
      type: 'date',
      admin: {
        description: 'Date when employee was hired',
      },
    },
    {
      name: 'salary',
      type: 'number',
      admin: {
        description: 'Employee salary amount',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'On Leave', value: 'on_leave' },
        { label: 'Terminated', value: 'terminated' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current employment status',
      },
    },
  ],
}
