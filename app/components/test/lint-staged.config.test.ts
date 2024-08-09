import lintStagedConfig from '../../../lint-staged.config.js';

describe('lint-staged configuration', () => {
  it('should have correct configuration for TypeScript files', () => {
    expect(lintStagedConfig['**/*.{ts,tsx}']).toEqual(['eslint --fix', 'prettier --write']);
  });
});
