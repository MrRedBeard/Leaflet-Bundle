# Leaflet Bundle

[`Leaflet`](https://leafletjs.com/) 

[`Leaflet on Github`](https://github.com/Leaflet/Leaflet) 

This is no way intended to take away from or replace Leaflet and will always be synced with Leaflet's LTS version.

## Why
Got tired of manually patching paths and dealing with dead plugin projects and wanted a consolidated repo.
- Moved images to /content/img

---

## 🚀 Features

Bundled with:

- **Offline tile caching** using [PouchDB](https://pouchdb.com/)
- **Elevation profile charts** with support for 13+ handlers
- Support for GPX, GeoTIFF, and omnivore formats
- Plugin-rich with drawing, context menu, and raster support

### 🧱 Leaflet Core & Plugins
- `leaflet` (1.9.4)
- `leaflet-contextmenu`
- `leaflet-draw`
- `leaflet-gpx`
- `@geoman-io/leaflet-geoman-free`
- `@mapbox/leaflet-omnivore`
- `leaflet-rastercoords`
- `georaster-layer-for-leaflet`
- `github:VictorVelarde/Leaflet.CanvasLayer.Field`

### 💾 Offline Tile Caching
- Powered by [`leaflet.tilelayer.pouchdbcached`](https://github.com/MrRedBeard/Leaflet.TileLayer.PouchDBCached)
- Transparent integration with OpenStreetMap or any XYZ tile provider
- Tiles are saved to IndexedDB via PouchDB
- pouchdb is bundled in

### 📈 Elevation Control
- Uses a customized fork of [`leaflet-elevation`](https://github.com/Raruto/leaflet-elevation.git)
- Handlers include:
  - `Altitude`, `Distance`, `Time`, `Heart`, `Cadence`, `Runner`, `Slope`, `Speed`, `Temperature`, `Acceleration`, `Pace`, `LinearGradient`, `Labels`
- Handlers are **registered automatically** at runtime via `ElevationHandlers.js`

---

## Build & Run

### Run
npm run dev

### Dev
npm run build

---

## Dependencies

### canvaslayer
`chmod +x install-leaflet-canvaslayer.sh
./install-leaflet-canvaslayer.sh`

### leaflet-elevation https://github.com/Raruto/leaflet-elevation
`chmod +x install-leaflet-elevation.sh
./install-leaflet-elevation.sh`