import * as migration_20250808_173610 from './20250808_173610';
import * as migration_20250820_162604 from './20250820_162604';

export const migrations = [
  {
    up: migration_20250808_173610.up,
    down: migration_20250808_173610.down,
    name: '20250808_173610',
  },
  {
    up: migration_20250820_162604.up,
    down: migration_20250820_162604.down,
    name: '20250820_162604'
  },
];
