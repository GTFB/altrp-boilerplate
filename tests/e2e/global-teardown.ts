import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Here you can add global cleanup
  // For example, remove test data, close connections, etc.
  console.log('🧹 Global teardown started');
  
  // Here you can perform final actions
  // For example, clean test files, close DB connections
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;
