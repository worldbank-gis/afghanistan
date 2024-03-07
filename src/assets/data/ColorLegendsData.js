export const ColorLegendsData = {
    Yearly_PCP:{
        Title: "Precipitation",
        Unit: "(mm/year)",
        Value: [300, 100, 80, 10],
        Colors: ["#011f4b", "#03396c", "#005b96", "#6497b1","#b3cde0"],
        MaxValue: "300",
        MinValue: "10",
    },
    Monthly_PCP:{
        Title: "Precipitation",
        Unit: "(mm/month)",
        Value: [10, 6, 2, 0],
        Colors: ["#011f4b", "#03396c", "#005b96", "#6497b1","#b3cde0"],
        MaxValue: "10",
        MinValue: "0",
    },

    Yearly_AETI:{
        Title: "Evapotranspiration (ET)",
        Unit: "(mm/year)",
        Value: [400, 100, 80, 10],
        Colors: ["#D04848", "#F3B95F", "#FDE767", "#6895D2"],
        MaxValue: "400",
        MinValue: "10",
    },
    Monthly_AETI:{
        Title: "Evapotranspiration (ET)",
        Unit: "(mm/month)",
        Value: [20, 6, 4, 2],
        Colors: ["#D04848", "#F3B95F", "#FDE767", "#6895D2"],
        MaxValue: "20",
        MinValue: "2",
    },

    Yearly_RET:{
        Title: "Potential ET",
        Unit: "(mm/year)",
        Value: [300, 100, 80, 10],
        Colors: ["#D04848", "#F3B95F", "#FDE767", "#6895D2"],
        MaxValue: "300",
        MinValue: "10",
    },
    Monthly_RET:{
        Title: "Potential ET",
        Unit: "(mm/month)",
        Value: [300, 100, 80, 10],
        Colors: ["#D04848", "#F3B95F", "#FDE767", "#6895D2"],
        MaxValue: "300",
        MinValue: "10",
    },
    Yearly_AridityIndex:{
        Title: "Aridity Index",
        Unit: "",
        Value: [0.9, 0.6, 0.3, 0.1],
        Colors: ["#F8DE22", "#F94C10", "#C70039", "#900C3F"],
        MaxValue: "0.9",
        MinValue: "0.1",
    },
    Monthly_AridityIndex:{
        Title: "Aridity Index",
        Unit: "",
        Value: [0.9, 0.6, 0.3, 0.1],
        Colors: ["#F8DE22", "#F94C10", "#C70039", "#900C3F"],
        MaxValue: "0.9",
        MinValue: "0.1",
    },
    Yearly_NPP:{
        Title: "Average Biomass Production",
        Unit: "(kg/ha/year)",
        Value: [300, 50, 10, 5],
        Colors: ["#40513B", "#609966", "#9DC08B", "#EDF1D6"],
        MaxValue: "300",
        MinValue: "5",
    },
    Monthly_NPP:{
        Title: "Average Biomass Production",
        Unit: "(kg/ha/month)",
        Value: [80, 20, 10, 5],
        Colors: ["#40513B", "#609966", "#9DC08B", "#EDF1D6"],
        MaxValue: "300",
        MinValue: "5",
    },
    Yearly_WaterProductivity:{
        Title: "Biomass Water Productivity",
        Unit: "",
        Value: [1, 0.7, 0.3, 0.01],
        Colors: ["#40513B", "#609966", "#9DC08B", "#EDF1D6"],
        MaxValue: "1",
        MinValue: "0.01",
    },
    Monthly_WaterProductivity:{
        Title: "Biomass Water Productivity",
        Unit: "",
        Value: [1, 0.7, 0.3, 0.01],
        Colors: ["#40513B", "#609966", "#9DC08B", "#EDF1D6"],
        MaxValue: "1",
        MinValue: "0.01",
    },


    Yearly_ET_Blue:{
        Title: "ET Blue",
        Unit: "(mm/year)",
        Value: [550, 100, 50, 20,6],
        Colors: ["#011f4b", "#03396c", "#005b96", "#6497b1","#b3cde0"],
        MaxValue: "550",
        MinValue: "6",
    },
    Monthly_ET_Blue:{
        Title: "ET Blue",
        Unit: "(mm/month)",
        Value: [577, 100, 50, 20,6],
        Colors: ["#011f4b", "#03396c", "#005b96", "#6497b1","#b3cde0"],
        MaxValue: "577",
        MinValue: "6",
    },
    Yearly_ET_Green:{
        Title: "ET Green",
        Unit: "(mm/year)",
        Value: [180, 120, 50, 20],
        Colors: ["#50623A", "#4F6F52", "#739072", "#86A789","#D2E3C8"],
        MaxValue: "180",
        MinValue: "20",
    },
    Monthly_ET_Green:{
        Title: "ET Green",
        Unit: "(mm/month)",
        Value: [180, 120, 50, 20],
        Colors: ["#50623A", "#4F6F52", "#739072", "#86A789","#D2E3C8"],
        MaxValue: "180",
        MinValue: "20",
    },


}
    

// const ET_Green_Density = (density => {
//     return density > 180
//       ? '#50623A'
//       : density > 120
//         ? '#4F6F52'
//         : density > 50
//           ? '#739072'
//           : density > 20
//             ? '#86A789'
//             : '#D2E3C8';
//   })








// const Annual_RET_Density = (density) => {
//     return density > 300
//       ? "#D04848"
//       : density > 200
//         ? "#F3B95F"
//         : density > 80
//           ? "#FDE767"
//           : density > 11
//             ? "#6895D2"
//             : "#6895D2";
//   };
  
//   const Monthly_RET_Density = (density) => {
//     return density > 18
//       ? "#D04848"
//       : density > 10
//         ? "#F3B95F"
//         : density > 5
//           ? "#FDE767"
//           : density > 0
//             ? "#6895D2"
//             : "#6895D2";
//   };
  
//   const Annual_AETI_Density = (density) => {
//     return density > 300
//       ? "#D04848"
//       : density > 200
//         ? "#F3B95F"
//         : density > 80
//           ? "#FDE767"
//           : density > 11
//             ? "#6895D2"
//             : "#6895D2";
//   };
  
//   const Monthly_AETI_Density = (density) => {
//     return density > 18
//       ? "#D04848"
//       : density > 10
//         ? "#F3B95F"
//         : density > 5
//           ? "#FDE767"
//           : density > 0
//             ? "#6895D2"
//             : "#6895D2";
//   };