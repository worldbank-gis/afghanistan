import React, { useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import * as L from 'leaflet';

const FiltererdJsonData = ({
    selectedFeature,
    selectedView,
    filteredData,
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
            style={{ fillColor: 'none', weight: 4, color: 'yellow', fillOpacity: "0.4" }}
            data={filteredData}
        />
    );
};

export default FiltererdJsonData;
