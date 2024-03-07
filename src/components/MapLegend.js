import React from 'react';

const MapLegend = ({ ColorLegendsDataItem }) => {
    const { Title, Unit, Value, Colors, MaxValue, MinValue } = ColorLegendsDataItem;
    const gradientColors = Colors.join(', ');
    const firstColor = Colors[0];
    const lastColor = Colors[Colors.length - 1];

    return (
        <div className="legend_container">
            <div className="legend_heading">
                <p>
                    {Title}{" "}
                    {Unit}
                </p>
            </div>
            <div className="legend-color-container">
            <div className='legend_left_arrow' style={{borderRight: `25px solid ${lastColor}`}}></div>
                <div className='legend-color' style={{ backgroundImage: `linear-gradient(to left, ${gradientColors})` }}></div>
                <div className='legend_right_arrow' style={{borderLeft: `25px solid ${firstColor}`}}></div>
            </div>
            <div className="legend-item">
                <p className="legend-num-value">{MinValue}</p>
                <p className="legend-num-value"> {MaxValue}</p>
            </div>
        </div>
    );
};

export default MapLegend;
