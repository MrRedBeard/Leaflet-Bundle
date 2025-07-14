window.global = window;

import * as L from 'leaflet';
window.L = L;
import 'leaflet/dist/leaflet.css';

import chroma from 'chroma-js';
window.chroma = chroma;

import 'leaflet-rastercoords';
import 'leaflet-gpx';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet-contextmenu';
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css';
import omnivore from '@mapbox/leaflet-omnivore';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import parseGeoraster from 'georaster';
import './plugins/canvaslayerfield/leaflet.canvaslayer.field.js';

/***************************************************************************************/
/*** pouchdbcached start ***/
import PouchDB from 'pouchdb-browser';
window.PouchDB = PouchDB;
import 'leaflet.tilelayer.pouchdbcached';
if (typeof L.tileLayer.pouchDBCached !== 'function')
{
  console.error('pouchDBCached factory was not registered properly!');
  console.dir(L.tileLayer);
}
else
{
  console.log('pouchDBCached is loaded!');
}
/*** pouchdbcached end ***/
/***************************************************************************************/
/*** leaflet-elevation start ***/
import * as ElevationHandlers from './ElevationHandlers.js';
L.Control.Elevation.Handlers ||= {};
for (const [key, handlerFn] of Object.entries(ElevationHandlers))
{
	const inst = handlerFn.call(L.Control.Elevation.prototype);
	if (inst?.name)
	{
		L.Control.Elevation.Handlers[inst.name] = handlerFn;
	}
}
import './plugins/leaflet-elevation/src/leaflet-elevation.js';
import './plugins/leaflet-elevation/src/leaflet-elevation.css';
L.Control.Elevation.prototype._loadModules = async function ()
{
	const handlerMap = {
		distance: ElevationHandlers.Distance,
		altitude: ElevationHandlers.Altitude,
		acceleration: ElevationHandlers.Acceleration,
		time: ElevationHandlers.Time,
		speed: ElevationHandlers.Speed,
		slope: ElevationHandlers.Slope,
		labels: ElevationHandlers.Labels,
		heart: ElevationHandlers.Heart,
		temperature: ElevationHandlers.Temperature,
		pace: ElevationHandlers.Pace,
		cadence: ElevationHandlers.Cadence,
		runner: ElevationHandlers.Runner,
		lineargradient: ElevationHandlers.LinearGradient
	};
	this.options.handlers = this.options.handlers.map(name =>
	{
		const fn = typeof name === 'string' ? handlerMap[name.toLowerCase()] : name;

		if (!fn || typeof fn !== 'function')
		{
			console.warn(`Unknown or missing elevation handler: "${name}"`);
			return null;
		}

		return fn;
	}).filter(Boolean);
};
/*** leaflet-elevation end ***/
/***************************************************************************************/
/*** Initialize leaflet start ***/
/** @type {L.Map} */
const map = L.map('map',
{
  center: [40.0, -90.0],
  zoom: 5,

  contextmenu: true,
  contextmenuWidth: 180,
  contextmenuItems: [
    {
      text: 'Center map here',
      callback: (e) => map.panTo(e.latlng)
    },
    {
      separator: true
    },
    {
      text: 'Zoom in',
      callback: () => map.zoomIn()
    },
    {
      text: 'Zoom out',
      callback: () => map.zoomOut()
    }
  ]
});
/*** Initialize leaflet end ***/
/***************************************************************************************/
/*** leaflet base map start ***/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
/*** leaflet base map end ***/
/*** leaflet local caching start ***/
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
/*** leaflet local caching end ***/
/*** leaflet controls start ***/
map.pm.addControls({
  position: 'topleft',
  drawCircle: true,
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  dragMode: true,
  cutPolygon: true,
});
/*** leaflet controls end ***/
/*** leaflet GPX start ***/
new L.GPX('/content/data/test.gpx', {
  async: true,
  marker_options: { startIconUrl: 'start.png' }
}).on('loaded', function(e)
{
  map.fitBounds(e.target.getBounds());
}).addTo(map);
/*** leaflet GPX end ***/
/*** omnivore start ***/
// omnivore.gpx('/content/data/test.gpx')
// .on('ready', function ()
// {
//   controlElevation.addData(this.toGeoJSON());
// });

// omnivore.gpx('/content/data/test.gpx')
// .on('ready', function ()
// {
//   const geo = this.toGeoJSON();

//   const filtered = {
//     type: "FeatureCollection",
//     features: geo.features.filter(f => f.geometry.type === "LineString")
//   };

//   controlElevation.addData(filtered);
// });
/*** omnivore end ***/



// const controlElevation = L.control.elevation({
//   position: "topright",
//   theme: "steelblue-theme", // optional
//   collapsed: false
// }).addTo(map);
// Provide polyline or GeoJSON with elevation data:
// controlElevation.addData('/content/data/test.gpx');
//controlElevation.addData('/content/data/jack-creek-HITGM-trail-2010-11-06-trax.gpx');

// fetch('/content/data/track.geojson')
//   .then(res => 
//   {
//     if (!res.ok)
//     {
//       throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//     }

//     return res.json();
//   })
//   .then(geo => controlElevation.addData(geo))
//   .catch(err => console.error('Failed to load GeoJSON:', err));

//or
// const track = L.polyline([
//   [40.0, -90.0, 180],
//   [40.1, -90.1, 220],
//   [40.2, -90.2, 170]
// ]);
// map.addLayer(track);
// controlElevation.addData(track.toGeoJSON());






// tileLayer.on('tilecachehit', e => console.log('CACHE HIT:', e.url));
// tileLayer.on('tilecachemiss', e => console.log('CACHE MISS:', e.url));

// const width = 3;
// const height = 3;
// const rc = new L.RasterCoords(map, [width, height]);
// map.setMaxZoom(rc.zoomLevel());
// map.setView(rc.unproject([width, height]), rc.zoomLevel()-1);






/***************************************************************************************/
/*** Overrides start ***/
import './styles.css'; // Your global CSS
// Override the icon paths to match your new location
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/content/img/marker-icon-2x.png',
  iconUrl: '/content/img/marker-icon.png',
  shadowUrl: '/content/img/marker-shadow.png'
});
/*** Overrides end ***/
/***************************************************************************************/