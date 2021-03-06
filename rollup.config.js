import { defineConfig } from 'rollup';
import pkg from './package.json';
import del from 'rollup-plugin-delete';
import externals from 'rollup-plugin-node-externals';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      foramt: 'cjs',
    },
    {
      file: pkg.module,
      foramt: 'esm',
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    externals({ deps: true }),
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    cjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules',
      extensions: ['.ts', '.tsx'],
    }),
    postcss({
      extract: true,
    }),
    url(),
    svgr(),
  ],
});
