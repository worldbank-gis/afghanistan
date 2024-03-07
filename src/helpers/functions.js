export const mapCenter=[34, 67]

export const setInitialMapZoom = () => { 
    var viewportWidth = window.innerWidth;
    var mapZoom;
    if (viewportWidth <= [767]) {
      mapZoom = [5];
    } if (viewportWidth >= [768]) {
      mapZoom = [6];
    } if (viewportWidth >= [1600]) {
      mapZoom = [6];
    }
    return mapZoom;
  }

 export const setDragging = () => {
    var viewportWidth = window.innerWidth;
    var dragging;
    if (viewportWidth <= [767]) {
      dragging = false;
    } if (viewportWidth >= [768]) {
      dragging = true;
    }
    return dragging;
  }


  export const renderTimeOptions = (intervalType) => {
    if (intervalType === 'Monthly') {
      return (
        <>
          <option value="">Select Time</option>
          {Array.from({ length: 72 }, (_, index) => {
            const year = 2018 + Math.floor(index / 12);
            const month = index % 12 + 1;
            return (
              <option key={index} value={`${year}-${month}`}>
                {`${year}-${month.toString().padStart(2, '0')}`}
              </option>
            );
          })}
        </>
      );
    } else if (intervalType === 'Yearly') {
      return (
        <>
          <option value="">Select Time</option>
          {Array.from({ length: 6 }, (_, index) => {
            const year = 2018 + index;
            return (
              <option key={index} value={`${year}`}>
                {`${year}`}
              </option>
            );
          })}
        </>
      );
    }
  };




  export const fillDensityColor = (ColorLegendsDataItem, density) => {
    if (!ColorLegendsDataItem) return null;

    const valueColorsMap = ColorLegendsDataItem.Value.map((value, index) => ({ value, color: ColorLegendsDataItem.Colors[index] }));

    for (let i = 0; i < valueColorsMap.length; i++) {
        if (density > valueColorsMap[i].value) {
            return valueColorsMap[i].color;
        }
    }
    // return valueColorsMap[valueColorsMap.length - 1].color; // Default to the last color
    return ColorLegendsDataItem.Colors[ColorLegendsDataItem.Colors.length - 1]; // Default to the last color
};




