import * as migration_20250808_173610 from './20250808_173610';

export const migrations = [
  {
    up: migration_20250808_173610.up,
    down: migration_20250808_173610.down,
    name: '20250808_173610'
  },
];
