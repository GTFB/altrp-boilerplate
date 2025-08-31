import { authenticated } from '@/access/authenticated'

describe('authenticated access', () => {
  const call = (user: unknown) => authenticated({ req: { user } as any } as any)

  it('true if user exists', () => {
    expect(call({ id: 'u1' })).toBe(true)
  })

  it('false if user is missing', () => {
    expect(call(null)).toBe(false)
  })
})


