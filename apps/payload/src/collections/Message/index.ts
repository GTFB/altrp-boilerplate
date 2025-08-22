import type { CollectionConfig } from 'payload'

/**
 * @description Message entity for managing communication messages and notifications
 */
export const Message: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['aid', 'subject', 'sender', 'recipient', 'status', 'updatedAt'],
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
              // Generate AID in format: M-XXXXXX (M for Message)
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
              let result = 'M-'
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
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        description: 'Message subject line',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Message content or body',
      },
    },
    {
      name: 'sender',
      type: 'text',
      required: true,
      admin: {
        description: 'Message sender',
      },
    },
    {
      name: 'recipient',
      type: 'text',
      required: true,
      admin: {
        description: 'Message recipient',
      },
    },
    {
      name: 'messageType',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'SMS', value: 'sms' },
        { label: 'Internal', value: 'internal' },
        { label: 'Notification', value: 'notification' },
      ],
      defaultValue: 'internal',
      admin: {
        description: 'Type of message',
      },
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
      admin: {
        description: 'Message priority level',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Read', value: 'read' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of the message',
      },
    },
    {
      name: 'sentAt',
      type: 'date',
      admin: {
        description: 'Date when message was sent',
      },
    },
    {
      name: 'readAt',
      type: 'date',
      admin: {
        description: 'Date when message was read',
      },
    },
  ],
}
