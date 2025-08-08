// Minimal payload/shared implementation
export const formatAdminURL = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/admin/${cleanPath}`
}
