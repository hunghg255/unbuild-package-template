import { basic, react } from '@hunghg255/eslint-config';

export default [
  ...basic(),
  {
    rules: {
      'semi-style': ["error", "last"]
    }
  },
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      'scripts/genColorCss.ts',
      'tailwind.config.ts',
    ],
  },
];
