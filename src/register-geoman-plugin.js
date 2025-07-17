/**
 * Registers Geoman with the Leaflet instance and exposes PM globally
 * @param {typeof import('leaflet')} Leaflet
 */
export function registerGeomanPlugin(Leaflet)
{
  // Check if Geoman attached itself already
  if (!Leaflet.PM && typeof window !== 'undefined' && window.L?.PM)
  {
    Leaflet.PM = window.L.PM;
  }

  if (!Leaflet.PM)
  {
    console.warn('Geoman did not attach PM to Leaflet');
    return;
  }

  // Globally expose
  if (typeof window !== 'undefined')
  {
    window.PM = Leaflet.PM;
    window.L.PM = Leaflet.PM;
  }

  return Leaflet.PM;
}