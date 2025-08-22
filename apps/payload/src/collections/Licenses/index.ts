import type { CollectionConfig } from 'payload'

/**
 * @description Licenses linking instances and modules with validity
 */
export const Licenses: CollectionConfig = {
  slug: 'licenses',
  admin: {
    useAsTitle: 'licenseKey',
    defaultColumns: ['licenseKey', 'project', 'module', 'status', 'expiresAt', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'instances',
      required: true,
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'licenseKey',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Expired', value: 'expired' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
  ],
}


