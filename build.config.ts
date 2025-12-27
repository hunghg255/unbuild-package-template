import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: ['src/index'],
    clean: true,
    declaration: true,
    rollup: {
      emitCJS: false,
      esbuild: {
        minify: false,
      }
    },
    failOnWarn: false,
  },
  {
    entries: ['src/index'],
    clean: true,
    declaration: true,
    rollup: {
      emitCJS: false,
      esbuild: {
        minify: false,
      },
      output: {
        format: "iife",
        name: "MyLibrary"
      }
    },
    failOnWarn: false,
  }
]);
