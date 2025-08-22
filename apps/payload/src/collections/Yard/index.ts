import type { CollectionConfig } from 'payload'

/**
 * @description Yard entity for managing physical yards and storage areas
 */
export const Yard: CollectionConfig = {
  slug: 'yards',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'type', 'status', 'updatedAt'],
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
              // Generate AID in format: Y-XXXXXX (Y for Yard)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'Y-'
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
        description: 'Yard name',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Storage Yard', value: 'storage_yard' },
        { label: 'Construction Yard', value: 'construction_yard' },
        { label: 'Equipment Yard', value: 'equipment_yard' },
        { label: 'Parking Yard', value: 'parking_yard' },
        { label: 'Garden Yard', value: 'garden_yard' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Type of yard',
      },
    },
    {
      name: 'size',
      type: 'group',
      admin: {
        description: 'Yard dimensions',
      },
      fields: [
        {
          name: 'length',
          type: 'number',
          label: 'Length (meters)',
          admin: {
            description: 'Yard length in meters',
          },
        },
        {
          name: 'width',
          type: 'number',
          label: 'Width (meters)',
          admin: {
            description: 'Yard width in meters',
          },
        },
        {
          name: 'area',
          type: 'number',
          label: 'Area (sq meters)',
          admin: {
            description: 'Yard area in square meters',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Yard address',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City where yard is located',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country where yard is located',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Yard description',
      },
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Yard features and amenities',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          admin: {
            description: 'Individual feature',
          },
        },
      ],
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity (items/vehicles)',
      admin: {
        description: 'Yard capacity in items or vehicles',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Under Maintenance', value: 'under_maintenance' },
        { label: 'Full', value: 'full' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the yard',
      },
    },
  ],
}
