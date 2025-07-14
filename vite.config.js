import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  base: './',
  plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true
    })
  ],
  resolve: {
    alias: {
      global: 'globalthis'
    }
  },
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['pouchdb-browser'],
  },
  build:
  {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    commonjsOptions: {
      include: [/plugins\/PouchDBCached/],
    },
    rollupOptions:
    {
       plugins: [
        commonjs({
          include: [/node_modules/],
          requireReturnsDefault: 'auto' // 👈 this is the magic sauce
        })
      ],
      output:
      {
        // Output to content/js instead of assets
        entryFileNames: 'content/js/leaflet_bundle.min.js',
        chunkFileNames: 'content/js/[name].js',
        assetFileNames: (assetInfo) =>
        {
          const ext = assetInfo.name.split('.').pop();

          if (ext === 'css')
          {
            return 'content/css/leaflet_bundle.[ext]';
          }

          // You might get .woff, .svg, etc. This sends everything else to img.
          return 'content/img/[name].[ext]';
        }
      }
    }
  }
});