import React from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON, TileLayer, WMSTileLayer } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { setDragging, setInitialMapZoom } from '../helpers/functions';
import worldcover_Legend from "../assets/images/worldcover_Legend.png"
import BaseMapLandCover from '../components/BaseMapLandCover';
import AFG_districts from '../assets/data/shapefiles/AFG_districts.json';
import Plot from 'react-plotly.js';
import { cropland_area_statistics } from '../assets/data/cropland_area_district_statistics';
import Zonal_Stat_Land_cover from "../assets/data/Zonal_Stat_Land_cover.json"



const LandClassificationPage = () => {

  function DistrictOnEachfeature(feature, layer) {

    layer.on('mouseover', function (e) {
      const DataItem = Zonal_Stat_Land_cover.find(item => item.NAME === feature.properties.NAME);


      const popupContent = `
            <div>
              District: ${feature.properties.NAME}<br/>
              Trees: ${DataItem.Trees} ha<br/>
              Shrubland: ${DataItem.Shrubland} ha<br/>
              Grassland: ${DataItem.Grassland} ha<br/>
              Cropland: ${DataItem.Cropland} ha<br/>
              Builtup: ${DataItem.Builtup} ha<br/>
              Bare, Sparse vegetation: ${DataItem.BareSparseVegetation} ha<br/>
              Snow and Ice: ${DataItem.SnowAndIce} ha<br/>
              Permanent water bodies: ${DataItem.PermanentWaterBodies} ha<br/>
              Herbaceous wetland: ${DataItem.HerbaceousWetland} ha<br/>
              Moss and lichen: ${DataItem.MossAndLichen} ha<br/>
            </div>
          `;
      layer.bindTooltip(popupContent, { sticky: true });
      layer.openTooltip();
    });

    layer.on('mouseout', function () {
      layer.closeTooltip();
    });
  }

  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>
          <div className="card_container">
            <div className='defination_container'>
              <h4>Land Cover class</h4>
            </div>

            <Plot
              data={[
                {
                  labels: ['Tree cover', 'Shrubland', 'Grassland', 'Cropland', 'Built-up', 'Bare/sparse vegetation', 'Snow and ice', 'Permanent water bodies', 'Herbaceous wetland', 'Mangroves', 'Moss and lichen'],
                  values: [9811161, 19790781, 198662489, 57930287, 2592244, 560276306, 6827166, 1788571, 208065, 0, 6107208],

                  type: 'pie',
                  marker: {
                    colors: ['#006400', '#FFBB23', '#FFFF4C', '#F096FF', '#FA0100', '#B4B4B4', '#F0F0F0', '#0064C8', '#0096A0', '#04CF75', '#FAE69F',],
                  },
                  hoverinfo: 'label+percent+text',
                  textinfo: 'label+text',
                  text: ['9811161 ha', '19790781 ha', '198662489 ha', '57930287 ha', '2592244 ha', '560276306 ha', '6827166 ha', '1788571 ha', '208065 ha', '0 ha', '6107208 ha'],
                },
              ]}

              style={{ width: "100%", height: "100%)" }}
            />
          </div>
          <div className='card_container'>
            <div className='defination_container'>
              <h4>Land Cover class area by district (ha)</h4>
            </div>
            <div className='item_table_container'>
              <table className='item_table'>
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Irrigated cropland</th>
                    <th>Rainfed cropland</th>
                    <th>Ocean and water bodies</th>
                    <th>Non-cropland(other land covers)</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {cropland_area_statistics.map((item, index) => (
                    <tr key={index}>
                      <td>{item.NAME}</td>
                      <td>{item["Irrigated cropland"]}</td>
                      <td>{item["Rainfed cropland"]}</td>
                      <td>{item["Ocean and water bodies"]}</td>
                      <td>{item["Non-cropland(other land covers)"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

              <GeoJSON
                style={{
                  fillColor: 'black',
                  weight: 2,
                  color: 'black',
                  fillOpacity: "0.001",
                  // interactive: false
                }}
                data={AFG_districts.features}
                onEachFeature={DistrictOnEachfeature}
              />
              {/* <TileLayer url='https://services.terrascope.be/wms/v2?'/> */}

              <div className='legend-panel'>
                <img src={worldcover_Legend} alt='worldcover_Legend' />
              </div>

              <WMSTileLayer
                zIndex={10}

                url={`https://services.terrascope.be/wms/v2?`}
                params={{ 'LAYERS': 'WORLDCOVER_2020_MAP', "TILED": "true", "VERSION": "1.1.1" }}
                // maxZoom={6}
                version='1.1.1'
                // transparent={true}
                format='image/png'
                opacity={1}
              />

              <BaseMapLandCover />



            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandClassificationPage