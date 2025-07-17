import PouchDB from 'pouchdb-browser';
window.PouchDB = PouchDB;
import pouchPlugin from 'leaflet.tilelayer.pouchdbcached';

export function registerPouchDBPlugin(Leaflet)
{
  if (!Leaflet) throw new Error('Leaflet instance is required');

  const patched = {
    ...Leaflet
  };

  if (typeof pouchPlugin === 'function')
  {
    patched.TileLayer.pouchDBCached = pouchPlugin;
    patched.tileLayer.pouchDBCached = (...args) =>
      new patched.TileLayer.pouchDBCached(...args);
  }
  else
  {
    console.warn('leaflet.tilelayer.pouchdbcached did not return a valid function.');
  }

  return patched;
}