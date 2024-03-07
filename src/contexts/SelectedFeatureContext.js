import React, { createContext, useContext, useState } from 'react';

const SelectedFeatureContext = createContext();

export const useSelectedFeatureContext = () => useContext(SelectedFeatureContext);


export const SelectedFeatureProvider = ({ children }) => {
  const [selectedFeatureGeojson, setSelectedFeatureGeojson] = useState(null);
  const [selectedView, setSelectedView] = useState('COUNTRY');
  const [selectedFeatureName, setSelectedFeatureName] = useState('Afghanistan');



  return (
    <SelectedFeatureContext.Provider value={{ selectedFeatureGeojson, setSelectedFeatureGeojson,selectedView, setSelectedView ,selectedFeatureName, setSelectedFeatureName}}>
      {children}
    </SelectedFeatureContext.Provider>
  );
};
