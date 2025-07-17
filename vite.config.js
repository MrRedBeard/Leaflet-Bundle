import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import quickScale from 'quick-scale';
const createScaleFunction = quickScale.createScaleFunction;

const sharedOutputOptions = {
  inlineDynamicImports: true,
  entryFileNames: 'content/js/leaflet_bundle.[format].js',
  assetFileNames: assetInfo =>
  {
    const name = assetInfo.name || '';

    if (name.endsWith('.js'))
    {
      return 'content/js/[name].[ext]';
    }
    
    if (name.endsWith('.css'))
    {
      return 'content/css/[name].[ext]';
    }

    if (/\.(png|jpg|svg|gif|webp|ico)$/.test(name))
    {
      return 'content/img/[name].[ext]';
    }

    return 'content/assets/[name].[ext]';
  },
  chunkFileNames: 'content/js/[name].[format].js',
  dir: 'dist/',
  globals: {
    leaflet: 'L',
    'pouchdb-browser': 'PouchDB'
  }
};

export default defineConfig({
  base: './',
  plugins: [
    nodePolyfills(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true
    })
  ],
  resolve: {
    alias: {
      //leaflet: path.resolve(__dirname, 'node_modules/leaflet'),
      buffer: 'buffer',
      process: 'process/browser',
      stream: 'stream-browserify',
      //events: 'events/',
      events: 'rollup-plugin-node-polyfills/polyfills/events.js',
      global: 'globalthis',
      events: 'rollup-plugin-node-polyfills/polyfills/events.js',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6.js',
      'proj4-fully-loaded': require.resolve('proj4-fully-loaded'),
      'quick-scale': require.resolve('./src/wrappers/quick-scale-wrapper.js', import.meta.url),
      'xdim': require.resolve('./src/wrappers/xdim-wrapper.js', import.meta.url),
      'leaflet-elevation': require.resolve('./src/plugins/leaflet-elevation/src/leaflet-elevation.js'),
      'canvaslayerfield': require.resolve('./src/plugins/canvaslayerfield/leaflet.canvaslayer.field.js')
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process': 'globalThis.process',
    'Buffer': ['buffer', 'Buffer']
  },
  optimizeDeps: {
    include: [
      'leaflet',
      'leaflet-draw',
      'leaflet-contextmenu',
      'leaflet-gpx',
      '@geoman-io/leaflet-geoman-free',
      'leaflet-rastercoords',
      '@mapbox/leaflet-omnivore',
      'georaster-layer-for-leaflet',
      'plugins/canvaslayerfield/leaflet.canvaslayer.field.js',
      'plugins/leaflet-elevation/src/leaflet-elevation.js',
      'proj4-fully-loaded',
      'pouchdb-browser',
      'leaflet.tilelayer.pouchdbcached',
      'xdim',
    ],
    //exclude: ['xdim', 'quick-scale'],
    esbuildOptions: {
        plugins: [
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
        ]
    }
  },
  build:
  {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: 'src/main.js',
      // name: 'leaflet_bundle',
      name: 'L',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `leaflet_bundle.${format}.js`
    },
    rollupOptions:
    {
      //external: ['xdim', 'quick-scale'],
       external: ['xdim'],
       plugins: [
        commonjs({
          include: [
            'leaflet',
            'leaflet-draw',
            'leaflet-contextmenu',
            'leaflet-gpx',
            '@geoman-io/leaflet-geoman-free',
            'leaflet-rastercoords',
            '@mapbox/leaflet-omnivore',
            'georaster-layer-for-leaflet',
            'plugins/canvaslayerfield/leaflet.canvaslayer.field.js',
            'plugins/leaflet-elevation/src/leaflet-elevation.js',
            'proj4-fully-loaded',
            'proj4',
            'pouchdb-browser',
            'leaflet.tilelayer.pouchdbcached',
            'xdim',
            'quickScale'
            // /plugins\/.*\.js/
          ],
          requireReturnsDefault: 'auto',
          namedExports: {
            // 'quick-scale': ['createScaleFunction']
          },
          transformMixedEsModules: true
        })
      ],
      output: [
        {
          ...sharedOutputOptions,
          format: 'es'
        },
        {
          ...sharedOutputOptions,
          format: 'umd',
          name: 'leaflet_bundle',
        },
        {
          ...sharedOutputOptions,
          format: 'iife',
          name: 'leaflet_bundle'
        }
      ]
    }
  }
});