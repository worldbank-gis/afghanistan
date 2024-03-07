import React, { useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import * as L from 'leaflet';

const FiltererdJsonData = ({
    selectedFeature,
    selectedView,
    filteredData,
    DistrictOnEachfeature,
    intialZoom,
    intialMapCenter
}) => {
    const map = useMap();
    // console.log(intialZoom)

    useEffect(() => {
        if (filteredData) {
            const bounds = L.geoJSON(filteredData.geometry).getBounds();
            map.flyToBounds(bounds);
        }
        else{
            map.flyTo(intialMapCenter,intialZoom);
        }
    }, [filteredData, map,intialZoom,intialMapCenter]);


    return (
        <GeoJSON
            key={`${selectedFeature+selectedView}`}
            style={{ fillColor: 'yellow', weight: 2, color: 'yellow', fillOpacity: "0.4" }}
            data={filteredData}
            onEachFeature={DistrictOnEachfeature}
        />
    );
};

export default FiltererdJsonData;
