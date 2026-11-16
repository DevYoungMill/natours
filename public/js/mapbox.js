/* eslint-disable */

export const displayMap = (locations, accessToken) => {
  if (!accessToken || !accessToken.startsWith('pk.')) {
    // console.warn('Set MAPBOX_PUBLIC_TOKEN to your own Mapbox public token to display maps.');
    return;
  }
  const map = new mapboxgl.Map({
    accessToken,
    container: 'map',
    style: 'mapbox://styles/devyoungmill/cmt8sw8fq00fl01qzb1c20mfv',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
