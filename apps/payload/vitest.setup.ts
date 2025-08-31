/// <reference types="vitest/globals" />

// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'
import { vi } from 'vitest'

// Mock Next.js revalidation APIs in tests to avoid runtime invariants
vi.mock('next/cache', () => ({
  revalidatePath: () => {},
  revalidateTag: () => {},
}))
