import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy';
import clean from 'rollup-plugin-clean';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    chunkFileNames: "chunks/[name]-[hash].js",
    dir: "public",
    format: "es"
  },
  plugins: [
    clean(),
    del({ targets: ["public/chunks", "public/assets"], runOnce: true, verbose: true }),
    copy({
      // Copy the ArcGIS API for JavaScript assets
      targets: [
        { src: './node_modules/@arcgis/core/assets/*', dest: './public/assets'},
      ],
      copyOnce: true
    }),    
    resolve(),
    commonjs(),
    production && terser()
  ],
  preserveEntrySignatures: false
};
