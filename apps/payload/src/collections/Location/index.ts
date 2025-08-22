import type { CollectionConfig } from 'payload'

/**
 * @description Location entity for managing physical locations and addresses
 */
export const Location: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'type', 'city', 'country', 'updatedAt'],
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
              // Generate AID in format: L-XXXXXX (L for Location)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'L-'
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
        description: 'Location name',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Office', value: 'office' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Store', value: 'store' },
        { label: 'Factory', value: 'factory' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Type of location',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full address of the location',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City name',
      },
    },
    {
      name: 'state',
      type: 'text',
      admin: {
        description: 'State or province',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country name',
      },
    },
    {
      name: 'postalCode',
      type: 'text',
      admin: {
        description: 'Postal or ZIP code',
      },
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        description: 'Geographic latitude coordinate',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        description: 'Geographic longitude coordinate',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Location description',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Under Construction', value: 'under_construction' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the location',
      },
    },
  ],
}
