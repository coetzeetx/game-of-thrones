import React, { FC, useEffect, useRef } from 'react';
import { MapWrapper } from './Map.styled';
import L from 'leaflet';


interface SetViewOnClickProps {
   coords: [number, number];
 }


interface MapProps { }


const Map: FC<MapProps> = () => {

   const mapRef = useRef<L.Map | null>(null);

   useEffect(() => {
    const map = L.map('map', {
      center: [0, 0],
      zoom: 0,
    });
  
    const imageUrl = '/assets/known_world.png';
    const imageBounds: L.LatLngBoundsExpression = [
      [0, 0],
      [1067, 1600]
    ];
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
  
    // Save the map to the ref
    mapRef.current = map;
  
    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);
   
   return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;

};

export default Map;
