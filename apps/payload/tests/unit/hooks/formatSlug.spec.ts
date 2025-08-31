import formatSlug from '@/hooks/formatSlug'
import type { FieldHook } from 'payload'

describe('formatSlug hook', () => {
  const run = (
    value: unknown,
    data?: Record<string, unknown>,
    operation: 'create' | 'update' = 'create',
  ) => {
    const hook = formatSlug('title') as FieldHook
    return hook({
      data,
      operation,
      originalDoc: undefined,
      value,
      req: {} as any,
    } as any)
  }

  it('normalizes string value', () => {
    expect(run('Hello World!')).toBe('hello-world')
  })

  it('uses fallback on create if value is not a string', () => {
    expect(run(undefined, { title: 'My Title 123' }, 'create')).toBe('my-title-123')
  })

  it('returns original value on update if value is not a string', () => {
    expect(run(undefined, { title: 'Ignored' }, 'update')).toBeUndefined()
  })
})


