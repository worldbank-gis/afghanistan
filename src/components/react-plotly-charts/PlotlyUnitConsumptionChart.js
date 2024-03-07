import React from 'react'
import { calculateAverageOfArray, calculateSumOfArray, getAnnualDataFromMonthly } from '../../helpers/functions';
import Plot from 'react-plotly.js';

const PlotlyUnitConsumptionChart = ({ filteredFeaturesItems }) => {
    const districtNames = filteredFeaturesItems.map((entry) => entry.DISTRICT);
    const totalConsumptions= filteredFeaturesItems.map((entry) => (calculateAverageOfArray(getAnnualDataFromMonthly(entry.AETI)) * 0.001 * entry.AREA) * 10000);


        // Calculate the minimum height based on the number of districts
        const minHeightPerDistrict = 20; // Adjust this value as needed
        const minHeight = Math.max(minHeightPerDistrict * districtNames.length, 300); // Minimum height of 300px


    return (
        <Plot
              data={[
                {
                  y: filteredFeaturesItems.map((entry) => entry.DISTRICT),
                  x: filteredFeaturesItems.map((entry) => (calculateAverageOfArray(getAnnualDataFromMonthly(entry.AETI)) * 0.001 * entry.AREA) * 10000),
                  type: "bar",
                  orientation: 'h',
                },
              ]}
              layout={{
                yaxis: {
                  title: "District Name",
                  autorange: "reversed",
                },
                xaxis: {
                  title: `Unit Consumption (m3/ha)`
                },
                margin: {
                  l: 150, // Adjust the top margin as needed
                },
              }}
              style={{ width: "100%", height: "100%" }}
            />
    );
};


export default PlotlyUnitConsumptionChart