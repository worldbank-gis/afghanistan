import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import { fillDensityColor, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import MapLegend from '../components/MapLegend';
import RasterMap from '../components/RasterMap';
import tiff_raster from "../assets/raster_data/SPEI_24_month_clipped.tif"

const DroughtConditions = () => {
  const [selectedDataType, setSelectedDataType] = useState('AETI');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedTime, setSelectedTime] = useState('2023-12');
  const YearOfSelectedTime = selectedTime && selectedTime.split('-')[0];



  const handleSelectedDataChange = (e) => {
    setSelectedDataType(e.target.value);
  };

  const handleIntervalTypeChange = (e) => {
    setIntervalType(e.target.value);
    setSelectedTime('')
  };
  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>
          <div className='card_container'>

            {/* <select
              className="m-1"
              value={intervalType}
              onChange={handleIntervalTypeChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select> */}


            <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
              <option value="SPEI">SPEI</option>
              {/* <option value="RET">Potential ET</option> */}
            </select>



            <select
              className="m-1"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {renderTimeOptions(intervalType)}
            </select>

            <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
              <option value="">Select TimeScale</option>
              <option value="24">24 Months</option>
              {/* <option value="SPEI">SPEI</option> */}
              {/* <option value="RET">Potential ET</option> */}
            </select>




          </div>

        </div>
        <div className='right_panel_equal' >
          <div className='card_container' style={{ height: "100%" }}>
            <MapContainer
              fullscreenControl={true}
              center={[34, 67]}
              style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
              zoom={setInitialMapZoom()}
              maxBounds={[[23, 49], [41, 82]]}
              // maxZoom={8}
              minZoom={setInitialMapZoom()}
              keyboard={false}
              dragging={setDragging()}
              // attributionControl={false}
              // scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <SearchBar />


              <RasterMap
                colorPalatte="viridis"
                maxValue={3}
                minValue={-3}
                url={tiff_raster}
                popopContent="SPEI Value"
              />



              {selectedDataType && selectedTime !== '' && intervalType ? (
                <>



                </>

              ) : (
                <GeoJSON
                  style={{
                    fillColor: 'black',
                    weight: 2,
                    color: 'black',
                    fillOpacity: "0.001",
                    interactive: false
                  }}
                  data={AfghanistanCountry.features}
                // onEachFeature={DistrictOnEachfeature}
                />
              )}






              <BaseMap />

            </MapContainer>
          </div>
        </div>


      </div>
    </div>

  )
}

export default DroughtConditions