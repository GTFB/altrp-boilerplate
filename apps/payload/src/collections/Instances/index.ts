import type { CollectionConfig } from 'payload'

/**
 * @description Instances (Projects) registry for licensing master
 */
export const Instances: CollectionConfig = {
  slug: 'instances',
  admin: {
    useAsTitle: 'domain',
    defaultColumns: ['instanceId', 'domain', 'ownerEmail', 'status', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'instanceId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
    },
    {
      name: 'ownerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}


