import type { CollectionConfig } from 'payload'

/**
 * @description Orders entity linking customers and products with totals and status
 */
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'aid',
    defaultColumns: ['aid', 'customer', 'total', 'status', 'updatedAt'],
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
      admin: { description: 'Unique Alternative Identifier (AID)' },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data && !data.aid) {
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
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'nameSnapshot',
          type: 'text',
          admin: { description: 'Product name snapshot at order time' },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'currency',
          type: 'select',
          options: [
            { label: 'USD', value: 'usd' },
            { label: 'EUR', value: 'eur' },
            { label: 'RUB', value: 'rub' },
          ],
          defaultValue: 'usd',
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'subtotal',
          type: 'number',
          admin: { description: 'price * quantity' },
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      admin: { description: 'Sum of item subtotals' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}


