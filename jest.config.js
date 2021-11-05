module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  haste: {
    throwOnModuleCollision: false
  },
  coveragePathIgnorePatterns: [
    '/.webpack/',
    '/node_modules/',
    'types\\.ts',
    'index\\.ts',
    '.+\\.d\\.ts',
    '/build/'
  ],
  clearMocks: true,
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
}