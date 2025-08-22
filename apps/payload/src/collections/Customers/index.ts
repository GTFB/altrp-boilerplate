import type { CollectionConfig } from 'payload'

/**
 * @description Customers entity for managing clients (individuals or companies)
 */
export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'email', 'phone', 'type', 'status', 'updatedAt'],
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
          ({ data }) => {
            if (data && !data.aid) {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'CU-'
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
        description: 'Customer full name or company name',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Primary email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Primary phone number',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Individual', value: 'individual' },
        { label: 'Company', value: 'company' },
      ],
      defaultValue: 'individual',
    },
    {
      name: 'linkedContractor',
      type: 'relationship',
      relationTo: 'contractors',
      admin: {
        description: 'Link to Contractor if customer is represented in CRM',
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'region', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}


