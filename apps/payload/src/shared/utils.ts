// Shared utility functions for Payload CMS

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// Payload CMS specific utilities
export const formatAdminURL = (config?: any): string => {
  if (!config) return '/admin'
  const { routes = {}, serverURL = '' } = config
  const adminRoute = routes.admin || '/admin'
  return `${serverURL}${adminRoute}`
}

// Text/translation utilities  
export const text = (key?: string, fallback?: string): string => {
  if (!key) return fallback || ''
  return fallback || key
}

// Additional Payload utilities that might be expected
export const sanitizePopulate = (populate: any) => populate
export const sanitizeDepth = (depth: any) => depth
export const sanitizeScope = (scope: any) => scope

// Validation utilities for Payload CMS
export const email = (value?: string): boolean | string => {
  if (!value) return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) || 'Please enter a valid email address'
}

export const username = (value?: string): boolean | string => {
  if (!value) return true
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(value) || 'Username must be 3-20 characters with letters, numbers, underscore or dash'
}

// Login and authentication utilities
export const getLoginOptions = (config?: any) => ({
  loginWithUsername: false,
  ...config
})

export const getSafeRedirect = (url?: string): string => {
  if (!url) return '/admin'
  // Simple validation to prevent open redirects
  if (url.startsWith('/')) return url
  return '/admin'
}

// Field type utilities
export const fieldAffectsData = (field?: any): boolean => {
  if (!field) return false
  return field.name && field.type !== 'ui'
}

export const fieldIsArrayType = (field?: any): boolean => {
  if (!field) return false
  return ['array', 'blocks'].includes(field.type)
}

export const fieldIsBlockType = (field?: any): boolean => {
  if (!field) return false
  return field.type === 'blocks'
}

// Localization utilities
export const fieldShouldBeLocalized = (field?: any, locale?: string): boolean => {
  if (!field) return false
  return Boolean(field.localized && locale)
}

// Group utilities
export const groupHasName = (group?: any): boolean => {
  if (!group) return false
  return Boolean(group.name)
}

// Array utilities
export const getUniqueListBy = (arr: any[], key: string): any[] => {
  if (!Array.isArray(arr)) return []
  const seen = new Set()
  return arr.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}