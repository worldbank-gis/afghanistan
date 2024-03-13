"use strict";(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[318],{6493:(e,a,s)=>{s.d(a,{A:()=>c});var i=s(5043),r=s(9896),n=s(7365),l=s(3204),t=s(579);const c=()=>{const[e,a]=(0,i.useState)({lat:0,lng:0}),s=(0,r.ko)(),c=()=>((0,r.Po)({mousemove:e=>{a(e.latlng)}}),null);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c,{}),(0,t.jsxs)("div",{className:"coordinates_container",children:["Lat: ",e.lat.toFixed(4),", Long:"," ",e.lng.toFixed(4)]}),(0,t.jsx)("button",{className:"zoom_btn",onClick:()=>{s.setView([34,67],6)},children:(0,t.jsx)(l.rQ8,{})}),(0,t.jsx)(n.g,{})]})}},4483:(e,a,s)=>{s.r(a),s.d(a,{default:()=>w});var i=s(5043),r=(s(5607),s(9419)),n=s(9349),l=s(793),t=s(576),c=s(3391),d=s(9369),o=s(228);const m=(0,l.Nq)((function(e,a){let{bounds:s,url:i,...r}=e;const n=new o.ImageOverlay(i,s,r);return(0,t.Q)(n,(0,c.W4)(a,{overlayContainer:n}))}),(function(e,a,s){if((0,d.m)(e,a,s),a.bounds!==s.bounds){const s=a.bounds instanceof o.LatLngBounds?a.bounds:new o.LatLngBounds(a.bounds);e.setBounds(s)}a.url!==s.url&&e.setUrl(a.url)}));var g=s(2004),p=s(4867),h=(s(6433),s(20),s(9552),s(8343)),u=s(1460);const v=s.p+"static/media/irrigated_rainfed_cropland_area.44a6d5737b5e3a20ac88.png",x=s.p+"static/media/irrigated_rainfed_cropland_area_legend.9b7d7bb4ff5ceb381865.jpg",j=s.p+"static/media/global_glacier_legend.4e469d33f3ec535d9e12.jpg";var b=s(6493),_=s(579);const w=()=>{const[e,a]=(0,i.useState)("land_classification"),[s,l]=(0,i.useState)("Yearly");return(0,_.jsx)("div",{className:"dasboard_page_container",children:(0,_.jsx)("div",{className:"main_dashboard",children:(0,_.jsx)("div",{className:"right_panel_equal",style:{width:"100vw"},children:(0,_.jsx)("div",{className:"card_container",style:{height:"100%"},children:(0,_.jsxs)(r.W,{fullscreenControl:!0,center:[34,67],style:{width:"100%",height:"100%",backgroundColor:"white",border:"none",margin:"auto"},zoom:(0,h.I6)(),maxBounds:[[23,49],[41,82]],keyboard:!1,dragging:(0,h.Q4)(),doubleClickZoom:!1,children:[(0,_.jsx)(b.A,{}),(0,_.jsx)("div",{className:"map_options_container",style:{top:"20px"},children:(0,_.jsxs)("select",{className:"m-1",value:e,onChange:e=>{a(e.target.value)},children:[(0,_.jsx)("option",{value:"land_classification",children:"Land Classification"}),(0,_.jsx)("option",{value:"populationd_density",children:"Population Density"}),(0,_.jsx)("option",{value:"global_reservoirs",children:"Global Reservoirs"}),(0,_.jsx)("option",{value:"global_dams",children:"Dams"}),(0,_.jsx)("option",{value:"observed_climatec_change",children:"Observed Climate Change"}),(0,_.jsx)("option",{value:"climate_change_vulnerability_scenarios",children:"Climate Change Vulnerability"}),(0,_.jsx)("option",{value:"Crop_Climate_Maize_Rice",children:"Crop Climate: Maize, Rice, and Wheat"}),(0,_.jsx)("option",{value:"global_glacier",children:" Glacier"}),(0,_.jsx)("option",{value:"surface_water",children:" Surface Water"})]})}),"land_classification"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Land Classification"})}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:x,alt:"worldcover_Legend"})}),(0,_.jsx)(n.e,{attribution:"Tiles \xa9 Esri",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"}),(0,_.jsx)(m,{url:v,fitBounds:!0,bounds:[[29.361572266944446,74.89412689305556],[38.49041112305556,60.504867553055554]],opacity:1})]}):"populationd_density"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Population Density"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Population Density",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"gpw-v4:gpw-v4-population-density_2015"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=gpw-v4:gpw-v4-population-density_2015",alt:"worldcover_Legend"})})]}):"global_dams"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Dams Database"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Global Dams Database",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"grand-v1:grand-v1-dams-rev01"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=grand-v1:grand-v1-dams-rev01",alt:"worldcover_Legend"})})]}):"observed_climatec_change"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Observed Climate Change Impacts"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Observed Climate Change Impacts",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"ipcc:ipcc-ar4-observed-climate-impacts"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=ipcc:ipcc-ar4-observed-climate-impacts",alt:"worldcover_Legend"})})]}):"climate_change_vulnerability_scenarios"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Climate Change Vulnerability Scenarios 2005, 2050, 2100"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Climate Change Vulnerability Scenarios 2005, 2050, 2100",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"ipcc:ipcc-synthetic-vulnerability-climate-2005-2050-2100"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=ipcc:ipcc-synthetic-vulnerability-climate-2005-2050-2100",alt:"worldcover_Legend"})})]}):"global_reservoirs"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Reservoirs Database"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Global Reservoirs Database",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"grand-v1:grand-v1-reservoirs-rev01"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"50px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=grand-v1:grand-v1-reservoirs-rev01",alt:"worldcover_Legend"})})]}):"Crop_Climate_Maize_Rice"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Crop Climate: Maize, Rice, and Wheat"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Crop Climate: Maize, Rice, and Wheat",url:"https://sedac.ciesin.columbia.edu/geoserver/wms",params:{LAYERS:"crop-climate:crop-climate-effects-climate-global-food-production"},version:"1.1.1",format:"image/png",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"180px"},children:(0,_.jsx)("img",{src:"https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=crop-climate:crop-climate-effects-climate-global-food-production",alt:"worldcover_Legend"})})]}):"global_glacier"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Glacier Database"})}),(0,_.jsx)(g.h,{zIndex:10,attribution:"Global Glacier Database",url:"https://www.glims.org/geoserver/ows",params:{LAYERS:"GLIMS_GLACIERS"},version:"1.3.0",opacity:1}),(0,_.jsx)("div",{className:"legend-panel",style:{width:"220px"},children:(0,_.jsx)("img",{src:j,alt:"worldcover_Legend"})})]}):"surface_water"===e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"map_heading",children:(0,_.jsx)("h4",{children:"Surface Water"})}),(0,_.jsx)(n.e,{attribution:"2016 EC JRC/Google",url:"https://storage.googleapis.com/global-surface-water/tiles2021/transitions/{z}/{x}/{y}.png"})]}):(0,_.jsx)(_.Fragment,{children:(0,_.jsx)(n.e,{attribution:"Tiles \xa9 Esri",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),(0,_.jsx)(p.k,{style:{fillColor:"black",weight:2,color:"black",fillOpacity:"0.001",interactive:!1},data:u.features})]})})})})})}},2004:(e,a,s)=>{s.d(a,{h:()=>c});var i=s(793),r=s(9996),n=s(576),l=s(230),t=s(228);const c=(0,i.X3)((function(e,a){let{eventHandlers:s,params:i={},url:l,...c}=e;const d=new t.TileLayer.WMS(l,{...i,...(0,r.P)(c,a)});return(0,n.Q)(d,a)}),(function(e,a,s){(0,l.X)(e,a,s),null!=a.params&&a.params!==s.params&&e.setParams(a.params)}))}}]);
//# sourceMappingURL=318.b06b3ab6.chunk.js.map