import React, { useState } from 'react'
import { TileLayer, GeoJSON, LayersControl, FeatureGroup, ScaleControl, useMap, useMapEvents, WMSTileLayer } from 'react-leaflet'
// import indiastates  from '../assets/data/indiaStates.json';
// import indiaRivers  from '../assets/data/indiaRivers.json';



// import L from 'leaflet';
import { FaHome } from "react-icons/fa";




const BaseMapLandCover = () => {
  const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 });

  const map = useMap();

  const HandleMouseHover = () => {


    useMapEvents({
      mousemove: (e) => {
        setMousePosition(e.latlng);
      },
    });
    return null;
  };




  const handleZoomToCenter = () => {
    map.setView([34, 67], 6);

  };




  return (
    <>
      
      


      <HandleMouseHover />

      <div
        className='coordinates_container' >
        Lat: {mousePosition.lat.toFixed(4)}, Long:{" "}
        {mousePosition.lng.toFixed(4)}
      </div>
      <button className='zoom_btn' onClick={handleZoomToCenter}><FaHome /></button>
      <ScaleControl />




    </>
  )
}

export default BaseMapLandCover