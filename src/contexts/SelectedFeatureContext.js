import React, { createContext, useContext, useState } from 'react';
import District_Stats from "../assets/data/District_Stats.json"

const SelectedFeatureContext = createContext();

export const useSelectedFeatureContext = () => useContext(SelectedFeatureContext);


export const SelectedFeatureProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState('COUNTRY');
  const [selectedFeatureName, setSelectedFeatureName] = useState('Afghanistan');

  const filteredFeaturesItems =  District_Stats.filter(item => item[selectedView] === selectedFeatureName);

  return (
    <SelectedFeatureContext.Provider value={{ filteredFeaturesItems,selectedView, setSelectedView ,selectedFeatureName, setSelectedFeatureName}}>
      {children}
    </SelectedFeatureContext.Provider>
  );
};
