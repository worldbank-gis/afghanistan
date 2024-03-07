import React from 'react'
import Plot from 'react-plotly.js'
import { MonthsArray, calculateAverageOfArray, getAnnualDataFromMonthly } from '../../helpers/functions'

const PlotlyBiomassProductionChart = ({ filteredFeaturesItems }) => {
    return (
        <Plot
            data={[
                {
                    y: filteredFeaturesItems.map((entry) => entry.DISTRICT),
                    // x: filteredFeaturesItems.map((entry) => (calculateAverageOfArray(getAnnualDataFromMonthly(entry.NPP)) * 22.222) ),
                    x: filteredFeaturesItems.map((entry) => {
                        const multipliedNPP = entry.NPP.map((npp) => npp * 22.22);
                        return calculateAverageOfArray(getAnnualDataFromMonthly(multipliedNPP));
                    }),

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
                    title: `Average Biomass Mean Annual (kg/ha/year)`
                },
                margin: {
                    l: 150, // Adjust the top margin as needed
                },
            }}
            style={{ width: "100%", height: "100%" }}
        />
    )
}

export default PlotlyBiomassProductionChart