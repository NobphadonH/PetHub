import { useEffect, useRef } from 'react';


// eslint-disable-next-line react/prop-types
function PointerLocation({ pointerLocation, setPointerLocation}) {
  const mapRef = useRef(null);


  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://api.longdo.com/map/?key=2b0da15d101163c9f1968c6c656c8ca5"; // Replace with your API key
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new window.longdo.Map({
        placeholder: document.getElementById('map'),
        ui: window.longdo.UiComponent.Mobile,
      });

      mapRef.current = map;

      // Adding a marker
      const marker = new window.longdo.Marker(pointerLocation);
      map.Overlays.add(marker);

      // Setting zoom and location
      map.zoomRange({ min: 6, max: 20 });
      map.location(pointerLocation, true);

      // Hiding unnecessary UI elements
      map.Ui.Zoombar.visible(false);
      map.Ui.Geolocation.visible(false);

      // Event listener for map click
      map.Event.bind('click', () => {
        const location = map.location(window.longdo.LocationMode.Pointer);
        setPointerLocation(location);
      });
    };

    if (!window.longdo) {
      loadScript();
    } else {
      initMap();
    }

    return () => {
      // Cleanup: Remove any event listeners if needed
    };
  }, [pointerLocation, setPointerLocation]);

  return <div id="map" className="w-full h-full cursor-pointer"></div>; // Style the map as needed
}

export default PointerLocation;
