let cachedScale;

export async function createScaleFunction (...args)
{
  if (!cachedScale)
  {
    const mod = await import('quick-scale');
    cachedScale = mod.default || mod;
  }

  return cachedScale(...args);
}