"use strict";(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[192],{192:(e,t,a)=>{a.r(t),a.d(t,{default:()=>v});var i=a(5043),n=(a(4877),a(9419)),o=a(4867),s=(a(228),a(6433),a(20),a(9552),a(1544)),r=a(1460),l=a(8343),c=a(537),d=a(8825),h=a(186),m=a(6638),p=a(1097),x=a(4698),y=a(2019),u=a(579);const j=e=>{let{filteredFeaturesItems:t}=e;const a=t.map((e=>{const t=(.001*(0,l.ay)((0,l.Ht)(e.AETI))*e.AREA/1e9).toFixed(2);return{district:e.DISTRICT,totalConsumption:t}}));a.sort(((e,t)=>t.totalConsumption-e.totalConsumption));const i=a.map((e=>e.district)),n=a.map((e=>e.totalConsumption)),o=Math.max(20*i.length,300);return(0,u.jsx)(y.A,{options:{chart:{type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!1}},plotOptions:{bar:{horizontal:!0}},dataLabels:{enabled:!1},xaxis:{categories:i,title:{text:"Total Consumption (BCM)",offsetX:10}},yaxis:{title:{text:"District Name",offsetY:10}},tooltip:{y:{formatter:function(e){return"".concat(e," BCM")}}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}]},series:[{data:n}],type:"bar",width:"100%",height:o+"px"})},f=e=>{let{filteredFeaturesItems:t}=e;const a=t.map((e=>({name:e.DISTRICT,UnitConsumptions:(0,l.UV)(e.AETI.map((e=>10*e))).toFixed(2)})));a.sort(((e,t)=>t.UnitConsumptions-e.UnitConsumptions));const i=a.map((e=>e.name)),n=a.map((e=>e.UnitConsumptions)),o=Math.max(20*i.length,300);return(0,u.jsx)(y.A,{options:{chart:{type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!1}},plotOptions:{bar:{horizontal:!0}},dataLabels:{enabled:!1},xaxis:{categories:i,title:{text:"Unit Consumption (m3/ha)",offsetX:10}},yaxis:{title:{text:"District Name",offsetY:10}},tooltip:{y:{formatter:function(e){return"".concat(e," (m3/ha)")}}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}]},series:[{data:n}],type:"bar",width:"100%",height:o+"px"})};var E=a(2228);const v=()=>{const[e,t]=(0,i.useState)("AETI"),[a,y]=(0,i.useState)("Yearly"),[v,T]=(0,i.useState)(5),{filteredFeaturesItems:C,selectedView:A,selectedFeatureName:g}=(0,p.q)(),_=(0,l.Bg)(C),b=m.k["".concat(a,"_").concat(e)];C.sort(((e,t)=>{const a=.001*(0,l.UV)((0,l.Ht)(e.AETI))*e.AREA/1e9;return.001*(0,l.UV)((0,l.Ht)(t.AETI))*t.AREA/1e9-a}));const I={Year:l.Kz,Yearly_AETI:(0,l.Ht)(_.AETI),Yearly_PCP:(0,l.Ht)(_.PCP),Yearly_RET:(0,l.Ht)(_.RET),Yearly_ETB:_.ETB,Yearly_ETG:_.ETG};return(0,u.jsx)("div",{className:"dasboard_page_container",children:(0,u.jsxs)("div",{className:"main_dashboard",children:[(0,u.jsxs)("div",{className:"left_panel_equal",children:[(0,u.jsx)("div",{className:"card_container",children:(0,u.jsxs)("div",{className:"defination_container",children:[(0,u.jsx)("h4",{children:"Evapotranspiration (ET)"}),(0,u.jsx)("p",{children:"Evapotranspiration is a key component of the hydrological cycle. It refers to the water that is lost to the atmosphere through the vaporization process. Water that becomes evapotranspired is no longer available for further use, hence it is commonly referred to as consumed water in the water accounting terminology."})]})}),(0,u.jsx)("div",{className:"card_container",children:(0,u.jsx)(c.A,{data:[{x:l.p3,y:_.AETI,fill:"tozeroy",type:"scatter",name:"Evapotranspiration (mm/month)",yaxis:"y1"},{x:l.p3,y:_.RET.map((e=>e/10)),type:"scatter",mode:"lines+markers",name:"Potential ET (mm/month)",marker:{color:"red"},yaxis:"y2"}],layout:{xaxis:{title:"Year"},yaxis:{title:"Evapotranspiration (mm/month)",side:"left",showgrid:!1},yaxis2:{title:"Potential ET (mm/month)",side:"right",overlaying:"y",showgrid:!1},legend:{orientation:"h",x:0,y:1.2}},style:{width:"100%",height:"100%)"}})}),(0,u.jsxs)("div",{className:"card_container",children:[(0,u.jsx)("div",{className:"defination_container"}),(0,u.jsx)("div",{className:"item_table_container",children:(0,u.jsxs)("table",{className:"item_table",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{children:"Year"}),(0,u.jsx)("th",{children:"Total Evapotranspiration (BCM/year)"}),(0,u.jsx)("th",{children:"ET Blue (BCM/year)"}),(0,u.jsx)("th",{children:"ET Green (BCM/year)"}),(0,u.jsx)("th",{children:"Precipitation (PCP) (BCM/year)"}),(0,u.jsx)("th",{children:"PCP - ET (BCM/year)"}),(0,u.jsx)("th",{children:"Portion of PCP locally consumed (%)"})]})}),(0,u.jsx)("tbody",{children:I.Year.map(((e,t)=>(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:e}),(0,u.jsx)("td",{children:(.001*I.Yearly_AETI[t]*_.AREA/1e9).toFixed(1)}),(0,u.jsx)("td",{children:(.001*I.Yearly_ETB[t]*_.AREA/1e9).toFixed(1)}),(0,u.jsx)("td",{children:(.001*I.Yearly_ETG[t]*_.AREA/1e9).toFixed(1)}),(0,u.jsx)("td",{children:(.001*I.Yearly_PCP[t]*_.AREA/1e9).toFixed(1)}),(0,u.jsx)("td",{className:I.Yearly_PCP[t]-I.Yearly_AETI[t]<0?"red-text":"",children:(.001*(I.Yearly_PCP[t]-I.Yearly_AETI[t])*_.AREA/1e9).toFixed(2)}),(0,u.jsx)("td",{children:(100*I.Yearly_AETI[t]/I.Yearly_PCP[t]).toFixed(1)})]},t)))})]})})]}),(0,u.jsxs)("div",{className:"card_container",style:{maxHeight:"800px",overflow:"scroll"},children:[(0,u.jsx)("div",{className:"defination_container",children:(0,u.jsx)("h4",{children:"Total Consumption (BCM)"})}),(0,u.jsx)(j,{filteredFeaturesItems:C})]}),(0,u.jsxs)("div",{className:"card_container",style:{maxHeight:"800px",overflow:"scroll"},children:[(0,u.jsx)("div",{className:"defination_container",children:(0,u.jsxs)("h4",{children:["Unit Consumption (m",(0,u.jsx)("sup",{children:"3"}),"/ha)"]})}),(0,u.jsx)(f,{filteredFeaturesItems:C})]})]}),(0,u.jsx)("div",{className:"right_panel_equal",children:(0,u.jsx)("div",{className:"card_container",style:{height:"100%"},children:(0,u.jsxs)(n.W,{fullscreenControl:!0,center:[34,67],style:{width:"100%",height:"100%",backgroundColor:"white",border:"none",margin:"auto"},zoom:(0,l.I6)(),maxBounds:[[23,49],[41,82]],minZoom:(0,l.I6)(),keyboard:!1,dragging:(0,l.Q4)(),doubleClickZoom:!1,children:[(0,u.jsxs)("div",{className:"map_options_container",children:[(0,u.jsx)("div",{children:(0,u.jsxs)("select",{className:"m-1",value:e,onChange:e=>{t(e.target.value)},children:[(0,u.jsx)("option",{value:"AETI",children:"Evapotranspiration"}),(0,u.jsx)("option",{value:"RET",children:"Potential ET"})]})}),(0,u.jsx)("div",{children:(0,u.jsxs)("select",{className:"m-1",value:a,onChange:e=>{y(e.target.value),T("")},children:[(0,u.jsx)("option",{value:"Monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"Yearly",children:"Yearly"})]})}),(0,u.jsx)("div",{children:(0,u.jsx)("select",{className:"m-1",value:v,onChange:e=>T(e.target.value),children:(0,l.Mq)(a)})})]}),e&&""!==v&&a?(0,u.jsxs)(u.Fragment,{children:[b&&(0,u.jsx)(h.A,{ColorLegendsDataItem:b}),(0,u.jsx)(o.k,{style:t=>{if(v&&e){const i=(t=>{const i=E.find((e=>e.DISTRICT===t));return i&&"Monthly"===a?i[e][v]:(0,l.Ht)(i[e])[v]})(t.properties.NAME);return{fillColor:b?(0,l.Rl)(b,i):"none",weight:1,opacity:1,color:"black",dashArray:"2",fillOpacity:1}}},data:d.features,onEachFeature:function(t,i){i.on("mouseover",(function(n){const o=E.find((e=>e.DISTRICT===t.properties.NAME)),s="\n            <div>\n              District: ".concat(t.properties.NAME,"<br/>\n              ").concat("PCP"===e?"Precipitation":"AETI"===e?"Evapotranspiration":"RET"===e?"Potential ET":"AridityIndex"===e?"Aridity Index":null,"  ").concat("AridityIndex"===e?"":"(".concat("Yearly"===a?"mm/year":"mm/month",")"),": ").concat("Monthly"===a?o[e][v]:(0,l.Ht)(o[e])[v],"\n            </div>\n          ");i.bindTooltip(s,{sticky:!0}),i.openTooltip()})),i.on("mouseout",(function(){i.closeTooltip()}))}},e+v+a)]}):(0,u.jsx)(o.k,{style:{fillColor:"black",weight:2,color:"black",fillOpacity:"0.001",interactive:!1},data:r.features}),(0,u.jsx)(x.A,{}),(0,u.jsx)(s.A,{})]})})})]})})}}}]);
//# sourceMappingURL=192.8c2bafd7.chunk.js.map