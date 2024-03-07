import React from 'react'
import Plot from 'react-plotly.js'
import cropSpecificWaterFootprints from "../../assets/data/cropSpecificWaterFootprints.json"

const PlotlyWaterFootprintChart = () => {
    // Get the first three entries
    const topCropEntries = cropSpecificWaterFootprints.slice(0, 10);

    // Get the sum of the remaining entries
    const restCropEntriesSum = cropSpecificWaterFootprints.slice(10).reduce((acc, curr) => acc + curr.WFP, 0);

    // Combine the first three entries and the sum into a new array
    const newCropData = [
        ...topCropEntries,
        {
            "CropName": "Other Crops",
            "WFP": restCropEntriesSum
        }
    ];
    return (
        <Plot
            data={[
                {
                    y: newCropData.map((entry) => entry.CropName),
                    x: newCropData.map((entry) => (entry.WFP) / 1000000000),
                    type: "bar",
                    orientation: 'h',
                },
            ]}
            layout={{
                yaxis: {
                    title: "Crop Type",
                    autorange: "reversed",
                },
                xaxis: {
                    title: `Crop Specific water footprint (BCM/year)`
                },
                margin: {
                    l: 220,
                },
            }}
            style={{ width: "100%", height: "100%" }}
        />
    )
}

export default PlotlyWaterFootprintChart