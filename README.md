# Leaflet Bundle

[`Leaflet`](https://leafletjs.com/) 

[`Leaflet on Github`](https://github.com/Leaflet/Leaflet) 

This is no way intended to take away from or replace Leaflet and will always be synced with Leaflet's LTS version.

## Why
Got tired of manually patching paths and dealing with dead plugin projects and wanted a consolidated repo.
- Moved images to /content/img

---

## Usage
```
<link rel="stylesheet" href="/content/css/leaflet-bundle.css">
<script src="/content/js/leaflet_bundle.iife.js"></script>

  

<script>
    (() =>
    {
        //var map = L.map('map').setView([34.99784454433927, -91.98272109031679], 13);

        var map = L.map('map', {
        center: [34.99784454433927, -91.98272109031679],
        zoom: 13,
        contextmenu: true,
        contextmenuItems: [
            {
            text: 'Show Coordinates',
            callback: function (e) {
                alert('Latitude: ' + e.latlng.lat + '\nLongitude: ' + e.latlng.lng);
            }
            },
            '-',
            {
            text: 'Zoom in',
            callback: function () {
                map.zoomIn();
            }
            }
        ]
        });

        map.pm.addControls({
            position: 'topleft',
            drawCircle: true,
            drawMarker: true,
            drawPolygon: true,
            editMode: true,
            dragMode: true,
            cutPolygon: true,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        //console.log('L.tileLayer:', Object.keys(L.tileLayer));

        // Tile Caching
        const tileLayer = L.tileLayer.pouchDBCached(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                pouchDbName: 'osm-cache',
                useOnlyCache: false,
                saveToCache: true,
                useCache: true,
                crossOrigin: true
            }
        );
        tileLayer.addTo(map);

        tileLayer.on('tilecachehit', function (e)
        {
        console.log('[cache hit]', e.tile.src);
        });

        tileLayer.on('tilecachemiss', function (e)
        {
        console.log('[cache miss]', e.tile.src);
        });

        tileLayer.on('tilecacheready', function ()
        {
        console.log('[cache ready] All tile caching systems are go!');
        });

        var marker = L.marker([34.99722053861641, -91.97359085083009]).addTo(map);

        var m_icon = L.icon({
            iconUrl: '/content/img/marker-icon.png',
            shadowUrl: '/content/img/marker-shadow.png'
        });

        L.marker([34.99784454433927, -91.98272109031679], {icon: m_icon}).addTo(map);   

        map.on('click', (e) =>
        {
            console.log(e.latlng);
        });

    })();
    
</script>
```

## Features

Bundled with:

- **Offline tile caching** using [PouchDB](https://pouchdb.com/)
- **Elevation profile charts** with support for 13+ handlers
- Support for GPX, GeoTIFF, and omnivore formats
- Plugin-rich with drawing, context menu, and raster support

### Leaflet Core & Plugins
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