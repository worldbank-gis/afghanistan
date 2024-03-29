import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AFG_boundary from '../assets/data/shapefiles/AFG_boundary.json';
import AFG_districts from '../assets/data/shapefiles/AFG_districts.json';
import AFG_provinces from '../assets/data/shapefiles/AFG_provinces.json';
import AFG_watershed from '../assets/data/shapefiles/AFG_watershed.json';
import AFG_water_basin from '../assets/data/shapefiles/AFG_water_basin.json';
import { mapCenter, setDragging, setInitialMapZoom } from '../helpers/functions';
import FiltererdJsonData from './FiltererdJsonData';
import OverviewSection from '../components/OverviewSection';
import OverviewStat from "../assets/data/OverviewStat.json"
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';


const HomePage = () => {

    const { selectedFeatureGeojson,selectedView,setSelectedView, setSelectedFeatureGeojson,selectedFeatureName, setSelectedFeatureName } = useSelectedFeatureContext();

    const getGeoJsonData = () => {
        switch (selectedView) {
            case 'DISTRICT':
                return AFG_districts;
            case 'PROVINCE':
                return AFG_provinces;
            case 'WATERSHED':
                return AFG_watershed;
            case 'BASIN':
                return AFG_water_basin;
            case 'COUNTRY':
                return AFG_boundary;
            default:
                return null;
        }
    };

    const selectedFeatureData = () => {
        switch (selectedView) {
            case 'BASIN':
                return AFG_water_basin.features.find(feature => feature.properties.NAME === selectedFeatureName);
            case 'WATERSHED':
                return AFG_watershed.features.find(feature => feature.properties.NAME === selectedFeatureName);
            case 'PROVINCE':
                return AFG_provinces.features.find(feature => feature.properties.NAME === selectedFeatureName);
            case 'DISTRICT':
                return AFG_districts.features.find(feature => feature.properties.NAME === selectedFeatureName);
            case 'COUNTRY':
                return AFG_boundary.features.find(feature => feature.properties.NAME === selectedFeatureName);
            default:
                return null;
        }
    };





    const handleDataViewChange = (e) => {
        setSelectedView(e.target.value)
        setSelectedFeatureName('');
    }

    const handleFeatureChange = (e) => {
        setSelectedFeatureName(e.target.value);
        
    }


    function DistrictOnEachfeature(feature, layer) {
        layer.on('click', function (e) {
            setSelectedFeatureName(feature.properties.NAME);
            
        });

        layer.on('mouseover', function (e) {

            if (feature.properties && feature.properties.NAME) {
                const popupContent = `
              <div>
              NAME: ${feature.properties.NAME}<br/>
              AREA: ${(feature.properties.AREA * 0.0001).toFixed(3)} ha<br/>
              </div>
            `;
                layer.bindTooltip(popupContent, { sticky: true });
            }
            layer.openTooltip();
        });

        layer.on('mouseout', function () {
            layer.closeTooltip();
        });
    }


    const getUniqueValues = (view) => {
        const uniqueValues = new Set();
        OverviewStat.forEach((item) => {
            uniqueValues.add(item[view]);
        });
        return Array.from(uniqueValues).sort();
    };



    const filteredItems = OverviewStat.filter(item => item[selectedView] === selectedFeatureName);
    const totalArea = filteredItems.reduce((total, item) => total + item.AREA, 0);

    // Calculate the sum of all cropland areas
    const sumCropland = filteredItems.reduce((sum, item) => sum + item.Cropland, 0);
    const sumLandCover = filteredItems.reduce((sum, item) => sum + item.Trees + item.Shrubland + item.Grassland + item.Cropland + item.Builtup + item.Bare_Sparse_Vegetation + (item['Snow_and _ice'] || 0) + item.Permanent_water_bodies + (item.Herbaceous_wetland || 0) + (item['Moss_and_lichen'] || 0), 0);
    // Calculate the percentage of cropland in total land cover
    const croplandPercentage = (sumCropland / sumLandCover) * 100;

    const totalIrrigatedLand = filteredItems.reduce((total, item) => total + item.IrrigatedCropland, 0);


    const sumAetiArea = filteredItems.reduce((sum, item) => sum + (item.AETI_2023 * item.AREA), 0);
    const weightedAvgAeti = ((sumAetiArea / totalArea) * 0.001 * totalArea) / 1000000000;

    const sumPCPArea = filteredItems.reduce((sum, item) => sum + (item.PCP_2023 * item.AREA), 0);
    const weightedAvgPCP = ((sumPCPArea / totalArea) * 0.001 * totalArea) / 1000000000;


    // const UnitWaterConsumption = ((sumAetiArea / totalArea) * 0.001 * totalArea) / 10000;
    const UnitWaterConsumption = (weightedAvgAeti*1000000000) / (totalArea*0.0001);

    const sumETG_2023Area = filteredItems.reduce((sum, item) => sum + (item.ETG_2023 * item.AREA), 0);
    const weightedAvgETG = ((sumETG_2023Area / totalArea) * 0.001 * totalArea) / 1000000000;

    const sumETB_2023Area = filteredItems.reduce((sum, item) => sum + (item.ETB_2023 * item.AREA), 0);
    const weightedAvgETB = ((sumETB_2023Area / totalArea) * 0.001 * totalArea) / 1000000000;

    

    const PCP_AETI_Difference = weightedAvgPCP - weightedAvgAeti;
    const PCP_ETValue = PCP_AETI_Difference < 0 ? "0" : PCP_AETI_Difference.toFixed(2);


    const sumNPPArea = filteredItems.reduce((sum, item) => sum + (item.NPP_2023 * item.AREA), 0);
    const AvgBiomassProdction = ((sumNPPArea / totalArea) * 22.222 * totalArea * 0.0001) * 0.00110231 / 1000000;

    


    return (
        <div className='dasboard_page_container'>
            <div className='main_dashboard'>
                <div className='left_panel_equal'>
                    <div className='card_container'>
                        <select className='m-1' value={selectedView} onChange={handleDataViewChange}>
                            <option value="COUNTRY">Country View</option>
                            <option value="BASIN">Basin View</option>
                            <option value="WATERSHED">Watershed View</option>
                            <option value="PROVINCE">Province View</option>
                            <option value="DISTRICT">District View</option>
                        </select>

                        <select className='m-1' value={selectedFeatureName} onChange={handleFeatureChange}>
                            <option value="">Select Feature</option>
                            {selectedView && getUniqueValues(selectedView).map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>

                        {selectedFeatureName===''&& <p className='m-1' style={{color:"red"}}>Please select a feature.</p>}


                    </div>
                    <div className='card_container'>
                        <OverviewSection
                            // cropLandValue={(totalCropLand * 100 / totalArea).toFixed(4)}
                            cropLandValue={(croplandPercentage).toFixed(2)}
                            EvapotranspirationValue={(weightedAvgAeti).toFixed(2)}
                            AreaValue={(totalArea * 0.0000001).toFixed(1)}
                            IrrigatedLandValue={(totalIrrigatedLand * 0.001).toFixed(2)}
                            PrecipitationValue={(weightedAvgPCP).toFixed(2)}
                            WaterConsumption={(UnitWaterConsumption).toFixed(2)}
                            PCP_ETValue={PCP_ETValue}
                            BiomassProductionValue={(AvgBiomassProdction).toFixed(2)}
                            BlueWaterFootprintValue={(weightedAvgETB).toFixed(2)}
                            GreenWaterFootprintValue={(weightedAvgETG).toFixed(2)}
                        />
                    </div>






                </div>

                <div className='right_panel_equal' >
                    <div className='card_container' style={{ height: "100%" }}>


                        <MapContainer
                            fullscreenControl={true}
                            center={mapCenter}
                            style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
                            zoom={setInitialMapZoom()}
                            // maxBounds={[[23, 49], [41, 82]]}
                            // maxZoom={8}
                            // minZoom={setInitialMapZoom()}
                            keyboard={false}
                            dragging={setDragging()}
                            // attributionControl={false}
                            // scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <SearchBar />


                            {selectedView && (
                                <GeoJSON
                                    key={selectedView}
                                    style={{ fillColor: '#265073', weight: 2, color: 'black', fillOpacity: "0.3" }}
                                    data={getGeoJsonData().features}
                                    onEachFeature={DistrictOnEachfeature}
                                />
                            )}

                            <FiltererdJsonData intialMapCenter={mapCenter} intialZoom={selectedFeatureData()} selectedFeature={selectedFeatureName} filteredData={selectedFeatureData()} selectedView={selectedView} DistrictOnEachfeature={DistrictOnEachfeature} />


                            <BaseMap />

                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage