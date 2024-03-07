import React from 'react'
import Chart from "react-apexcharts";
import { calculateSumOfArray, getAnnualDataFromMonthly } from '../../helpers/functions';

const TotalConsumptionChart = ({ filteredFeaturesItems }) => {
    const districtNames = filteredFeaturesItems.map((entry) => entry.DISTRICT);
    const totalConsumptions = filteredFeaturesItems.map((entry) => (calculateSumOfArray(getAnnualDataFromMonthly(entry.AETI)) * 0.001 * entry.AREA) / 1000000000);

        // Calculate the minimum height based on the number of districts
        const minHeightPerDistrict = 20; // Adjust this value as needed
        const minHeight = Math.max(minHeightPerDistrict * districtNames.length, 300); // Minimum height of 300px


    return (
        <Chart
            options={{
                chart: {
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: districtNames,
                    title: {
                        text: 'Total Consumption (BCM)',
                        offsetX: 10
                    },
                },
                yaxis: {
                    title: {
                        text: 'District Name',
                        offsetY: 10
                    },
                    // reversed: true
                },

                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `${val} BCM`;
                        }
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }]
            }}
            series={[{
                data: totalConsumptions
            }]}
            type="bar"
            width="100%"
            // height="4400px"
            height={minHeight + 'px'} // Set the height dynamically
        />
    );
};


export default TotalConsumptionChart