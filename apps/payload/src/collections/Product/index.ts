import type { CollectionConfig } from 'payload'

/**
 * @description Product entity for managing product catalog and inventory
 */
export const Product: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'price', 'category', 'status', 'updatedAt'],
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
              // Generate AID in format: P-XXXXXX (P for Product)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'P-'
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
        description: 'Product name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Product description',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Product price',
      },
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
      admin: {
        description: 'Currency for the price',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Product category',
      },
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stock Keeping Unit',
      },
    },
    {
      name: 'stock',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Available stock quantity',
      },
    },
    {
      name: 'weight',
      type: 'number',
      admin: {
        description: 'Product weight',
      },
    },
    {
      name: 'dimensions',
      type: 'group',
      admin: {
        description: 'Product dimensions',
      },
      fields: [
        {
          name: 'length',
          type: 'number',
          admin: {
            description: 'Product length',
          },
        },
        {
          name: 'width',
          type: 'number',
          admin: {
            description: 'Product width',
          },
        },
        {
          name: 'height',
          type: 'number',
          admin: {
            description: 'Product height',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Out of Stock', value: 'out_of_stock' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the product',
      },
    },
  ],
}
