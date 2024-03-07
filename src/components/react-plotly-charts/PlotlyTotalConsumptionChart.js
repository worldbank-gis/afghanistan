import React from 'react'
import { calculateSumOfArray, getAnnualDataFromMonthly } from '../../helpers/functions';
import Plot from 'react-plotly.js';

const PlotlyTotalConsumptionChart = ({ filteredFeaturesItems }) => {
    const districtNames = filteredFeaturesItems.map((entry) => entry.DISTRICT);
    const totalConsumptions = filteredFeaturesItems.map((entry) => (calculateSumOfArray(getAnnualDataFromMonthly(entry.AETI)) * 0.001 * entry.AREA) / 1000000000);

        // Calculate the minimum height based on the number of districts
        const minHeightPerDistrict = 20; // Adjust this value as needed
        const minHeight = Math.max(minHeightPerDistrict * districtNames.length, 300); // Minimum height of 300px


    return (
        <Plot
              data={[
                {
                  y: filteredFeaturesItems.map((entry) => entry.DISTRICT),
                  x: filteredFeaturesItems.map((entry) => (calculateSumOfArray(getAnnualDataFromMonthly(entry.AETI)) * 0.001 * entry.AREA) / 1000000000),
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
                  title: `Total Consumption (BCM)`
                },
                margin: {
                  l: 150,
                },
              }}
              style={{ width: "100%", height: "100%", maxHeight: "1800" }}
            />
    );
};


export default PlotlyTotalConsumptionChart