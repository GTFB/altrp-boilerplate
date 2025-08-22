import type { CollectionConfig } from 'payload'

/**
 * @description Wallet entity for managing financial accounts and wallets
 */
export const Wallet: CollectionConfig = {
  slug: 'wallets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['aid', 'name', 'type', 'balance', 'currency', 'status', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
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
              // Generate AID in format: W-XXXXXX (W for Wallet)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'W-'
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
        description: 'Wallet name',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Bank Account', value: 'bank_account' },
        { label: 'Credit Card', value: 'credit_card' },
        { label: 'Digital Wallet', value: 'digital_wallet' },
        { label: 'Investment Account', value: 'investment_account' },
        { label: 'Savings Account', value: 'savings_account' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Type of wallet or account',
      },
    },
    {
      name: 'balance',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Current account balance',
      },
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
        { label: 'RUB', value: 'rub' },
        { label: 'GBP', value: 'gbp' },
        { label: 'JPY', value: 'jpy' },
      ],
      defaultValue: 'usd',
      admin: {
        description: 'Currency for the wallet',
      },
    },
    {
      name: 'accountNumber',
      type: 'text',
      admin: {
        description: 'Account number',
      },
    },
    {
      name: 'bankName',
      type: 'text',
      admin: {
        description: 'Bank name',
      },
    },
    {
      name: 'routingNumber',
      type: 'text',
      admin: {
        description: 'Bank routing number',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Wallet description',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Frozen', value: 'frozen' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Current status of the wallet',
      },
    },
    {
      name: 'lastTransaction',
      type: 'date',
      admin: {
        description: 'Date of last transaction',
      },
    },
  ],
}
