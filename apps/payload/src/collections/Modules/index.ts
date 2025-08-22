import type { CollectionConfig } from 'payload'

/**
 * @description Modules registry for licensing
 */
export const Modules: CollectionConfig = {
  slug: 'modules',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['moduleId', 'name', 'price', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'moduleId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
    },
  ],
}


