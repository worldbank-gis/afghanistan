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
              <option key={index} value={index}>
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
              <option key={index} value={index}>
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

export const YearsArray=["2018","2019","2020","2021","2022","2023"]
export const MonthsArray=["2018-1","2018-2","2018-3","2018-4","2018-5","2018-6","2018-7","2018-8","2018-9","2018-10","2018-11","2018-12","2019-1","2019-2","2019-3","2019-4","2019-5","2019-6","2019-7","2019-8","2019-9","2019-10","2019-11","2019-12","2020-1","2020-2","2020-3","2020-4","2020-5","2020-6","2020-7","2020-8","2020-9","2020-10","2020-11","2020-12","2021-1","2021-2","2021-3","2021-4","2021-5","2021-6","2021-7","2021-8","2021-9","2021-10","2021-11","2021-12","2022-1","2022-2","2022-3","2022-4","2022-5","2022-6","2022-7","2022-8","2022-9","2022-10","2022-11","2022-12","2023-1","2023-2","2023-3","2023-4","2023-5","2023-6","2023-7","2023-8","2023-9","2023-10","2023-11","2023-12"]

export const getAnnualDataFromMonthly=(monthlyData)=> {
  const annualData = {};
  monthlyData.forEach((value, index) => {
      const year = Math.floor(index / 12) + 2018;
      if (!annualData[year]) {
          annualData[year] = 0;
      }
      annualData[year] += value;
  });
  return Object.values(annualData).map(value => Math.round(value * 100) / 100);
}

export const calculateAverageOfArray=(arr)=> {
  if (arr.length === 0) {
      return 0;
  }

  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}


export const calculateSumOfArray=(arr)=> {
  return arr.reduce((acc, curr) => acc + curr, 0);
}






export const  SelectedFeaturesAverageStats=(data)=> {
  let sumObject = {
      "AREA": 0,
      "DISTRICT": [],
      "PCP": [],
      "AETI": [],
      "NPP": [],
      "RET": [],
      "AridityIndex": [],
      "ETG": [],
      "ETB": [],
      "Trees": 0,
      "Shrubland": 0,
      "Grassland": 0,
      "Cropland": 0,
      "Builtup": 0,
      "Bare_Sparse_vegetation": 0,
      "Snow_and_ice": 0,
      "Permanent_water_bodies": 0,
      "Herbaceous_wetland": 0,
      "Moss_and_lichen": 0,
      "Ocean_and_water_bodies": 0,
      "Non_cropland": 0,
      "Irrigated_cropland": 0,
      "Rainfed_cropland": 0
  };


  data.forEach(obj => {
    sumObject["AREA"] += obj["AREA"];
    sumObject["PCP"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["PCP"]]));
    sumObject["AETI"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["AETI"]]));
    sumObject["NPP"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["NPP"]]));
    sumObject["RET"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["RET"]]));
    sumObject["AridityIndex"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["AridityIndex"]]));
    sumObject["ETG"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["ETG"]]));
    sumObject["ETB"] = weightedAverageArray(data.map(obj => [obj["AREA"], ...obj["ETB"]]));
    sumObject["Trees"] += obj["Trees"] || 0;
    sumObject["Shrubland"] += obj["Shrubland"] || 0;
    sumObject["Grassland"] += obj["Grassland"] || 0;
    sumObject["Cropland"] += obj["Cropland"] || 0;
    sumObject["Builtup"] += obj["Builtup"] || 0;
    sumObject["Bare_Sparse_vegetation"] += obj["Bare_Sparse_vegetation"] || 0;
    sumObject["Snow_and_ice"] += obj["Snow_and_ice"] || 0;
    sumObject["Permanent_water_bodies"] += obj["Permanent_water_bodies"] || 0;
    sumObject["Herbaceous_wetland"] += obj["Herbaceous_wetland"] || 0;
    sumObject["Moss_and_lichen"] += obj["Moss_and_lichen"] || 0;
    sumObject["Ocean_and_water_bodies"] += obj["Ocean_and_water_bodies"] || 0;
    sumObject["Non_cropland"] += obj["Non_cropland"] || 0;
    sumObject["Irrigated_cropland"] += obj["Irrigated_cropland"] || 0;
    sumObject["Rainfed_cropland"] += obj["Rainfed_cropland"] || 0;
    sumObject["DISTRICT"].push(obj["DISTRICT"]);
    
});


return sumObject;
}


function weightedAverageArray(inputArray) {
  // console.log(inputArray)
  if (inputArray.length === 0) {
      return [];
  }

  const numWeights = inputArray.length;
  const numValues = inputArray[0].length - 1; // Adjust for excluding the weight column
  const weights = inputArray.map(item => item[0]); // Extract weights from inputArray
  const values = inputArray.map(item => item.slice(1)); // Extract values from inputArray

  // Initialize arrays for weighted sum and total weight
  let weightedSums = new Array(numValues).fill(0);
  let totalWeight = 0;

  // Calculate weighted sum and total weight
  for (let i = 0; i < numWeights; i++) {
      for (let j = 0; j < numValues; j++) {
          weightedSums[j] += values[i][j] * weights[i];
      }
      totalWeight += weights[i];
  }

  // Calculate weighted averages rounded to two decimal places
  let weightedAverages = weightedSums.map(sum => Math.round((sum / totalWeight) * 100) / 100);
  return weightedAverages;
}

