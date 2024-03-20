"use strict";(self.webpackChunkmyapp=self.webpackChunkmyapp||[]).push([[218],{6638:(A,e,a)=>{a.d(e,{k:()=>t});const t={Yearly_PCP:{Title:"Precipitation",Unit:"(mm/year)",Value:[350,230,150,80],Colors:["#011f4b","#03396c","#005b96","#6497b1","#b3cde0"],MaxValue:"350",MinValue:"80"},Monthly_PCP:{Title:"Precipitation",Unit:"(mm/month)",Value:[15,10,5,1],Colors:["#011f4b","#03396c","#005b96","#6497b1","#b3cde0"],MaxValue:"15",MinValue:"1"},pcp_ssp585:{Title:"Precipitation",Unit:"(mm)",Value:[200,100,50,0],Colors:["#011f4b","#03396c","#005b96","#6497b1","#b3cde0"],MaxValue:"200",MinValue:"0"},pcp_ssp245:{Title:"Precipitation",Unit:"(mm)",Value:[100,80,40,0],Colors:["#011f4b","#03396c","#005b96","#6497b1","#b3cde0"],MaxValue:"100",MinValue:"0"},tdeg_ssp245:{Title:"Temperature",Unit:"(\xb0C)",Value:[3,2,1,0],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"3",MinValue:"0"},tdeg_ssp585:{Title:"Temperature",Unit:"(\xb0C)",Value:[3,2,1,0],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"3",MinValue:"0"},Yearly_AETI:{Title:"Evapotranspiration (ET)",Unit:"(mm/year)",Value:[400,100,80,20],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"400",MinValue:"20"},Monthly_AETI:{Title:"Evapotranspiration (ET)",Unit:"(mm/month)",Value:[20,6,4,2],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"20",MinValue:"2"},Yearly_RET:{Title:"Potential ET",Unit:"(mm/year)",Value:[1800,1500,1200,800],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"1800",MinValue:"800"},Monthly_RET:{Title:"Potential ET",Unit:"(mm/month)",Value:[280,200,150,50],Colors:["#A94438","#D04848","#F3B95F","#FDE767","#6895D2"],MaxValue:"280",MinValue:"50"},Yearly_AridityIndex:{Title:"Aridity Index",Unit:"",Value:[80,50,20,10],Colors:["#eff24b","#fcd432","#fca132","#f24207","#802101"],MaxValue:"80",MinValue:"10"},Monthly_AridityIndex:{Title:"Aridity Index",Unit:"",Value:[15,10,5,.2],Colors:["#eff24b","#fcd432","#fca132","#f24207","#802101"],MaxValue:"15",MinValue:"0.2"},Yearly_NPP:{Title:"Average Biomass Production",Unit:"(kg/ha/year)",Value:[360,300,200,13],Colors:["#416D19","#9BCF53","#BFEA7C","#b6ff7e","#FFF67E"],MaxValue:"8000",MinValue:"300"},Monthly_NPP:{Title:"Average Biomass Production",Unit:"(kg/ha/month)",Value:[9,6,2,.4],Colors:["#416D19","#9BCF53","#BFEA7C","#b6ff7e","#FFF67E"],MaxValue:"200",MinValue:"10"},Yearly_WaterProductivity:{Title:"Biomass Water Productivity",Unit:"(kg/m3)",Value:[1,.7,.3,.01],Colors:["#017d09","#02c70f","#fc8003","#fc3503","#ab3600"],MaxValue:"1",MinValue:"0.01"},Yearly_ETB:{Title:"ET Blue",Unit:"(mm/year)",Value:[400,300,100,20],Colors:["#011f4b","#165794","#0a97f2","#6497b1","#dcebf5"],MaxValue:"400",MinValue:"20"},Monthly_ETB:{Title:"ET Blue",Unit:"(mm/month)",Value:[400,300,100,20],Colors:["#011f4b","#165794","#0a97f2","#6497b1","#dcebf5"],MaxValue:"400",MinValue:"20"},Yearly_ETG:{Title:"ET Green",Unit:"(mm/year)",Value:[180,120,50,20],Colors:["#50623A","#518556","#739072","#86A789","#D2E3C8"],MaxValue:"180",MinValue:"20"},Monthly_ETG:{Title:"ET Green",Unit:"(mm/month)",Value:[180,120,50,20],Colors:["#50623A","#518556","#739072","#86A789","#D2E3C8"],MaxValue:"180",MinValue:"20"}}},186:(A,e,a)=>{a.d(e,{A:()=>l});a(5043);var t=a(579);const l=A=>{let{ColorLegendsDataItem:e}=A;const{Title:a,Unit:l,Colors:n,MaxValue:s,MinValue:r}=e,o=n.join(", "),i=n[0],d=n[n.length-1];return(0,t.jsxs)("div",{className:"legend_container",children:[(0,t.jsx)("div",{className:"legend_heading",children:(0,t.jsxs)("p",{children:[a," ",l]})}),(0,t.jsxs)("div",{className:"legend-color-container",children:[(0,t.jsx)("div",{className:"legend_left_arrow",style:{borderRight:"25px solid ".concat(d)}}),(0,t.jsx)("div",{className:"legend-color",style:{backgroundImage:"linear-gradient(to left, ".concat(o,")")}}),(0,t.jsx)("div",{className:"legend_right_arrow",style:{borderLeft:"25px solid ".concat(i)}})]}),(0,t.jsxs)("div",{className:"legend-item",children:[(0,t.jsx)("p",{className:"legend-num-value",children:r}),(0,t.jsxs)("p",{className:"legend-num-value",children:[" ",s]})]})]})}},1554:(A,e,a)=>{a.d(e,{A:()=>l});a(5043);var t=a(579);const l=A=>{let{legendURL:e,Title:a,Unit:l}=A;return(0,t.jsxs)("div",{className:"legend_container",children:[(0,t.jsx)("div",{className:"legend_heading",children:(0,t.jsxs)("p",{children:[a," ",l]})}),(0,t.jsx)("img",{src:e,alt:"Legend_Img"})]})}},654:(A,e,a)=>{a.r(e),a.d(e,{default:()=>N});var t=a(5043),l=(a(4877),a(9419)),n=a(9349),s=a(1429),r=a(4867),o=(a(228),a(6433),a(20),a(9552),a(1544)),i=a(1460),d=a(8343),c=a(1992),u=a(8825),p=a(186),m=a(6638),f=a(1097),h=a(4698),y=a(2019),g=a(579);const b=A=>{let{filteredFeaturesItems:e}=A;const a=e.map((A=>{const e=(.001*(0,d.ay)((0,d.Ht)(A.AETI))*A.AREA/1e9).toFixed(2);return{district:A.DISTRICT,totalConsumption:e}}));a.sort(((A,e)=>e.totalConsumption-A.totalConsumption));const t=a.map((A=>A.district)),l=a.map((A=>A.totalConsumption)),n=Math.max(20*t.length,300);return(0,g.jsx)(y.A,{options:{chart:{type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!1}},plotOptions:{bar:{horizontal:!0}},dataLabels:{enabled:!1},xaxis:{categories:t,title:{text:"Total Consumption (BCM)",offsetX:10}},yaxis:{title:{text:"District Name",offsetY:10}},tooltip:{y:{formatter:function(A){return"".concat(A," BCM")}}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}]},series:[{data:l}],type:"bar",width:"100%",height:n+"px"})},v=A=>{let{filteredFeaturesItems:e}=A;const a=e.map((A=>({name:A.DISTRICT,UnitConsumptions:(0,d.UV)(A.AETI.map((A=>10*A))).toFixed(2)})));a.sort(((A,e)=>e.UnitConsumptions-A.UnitConsumptions));const t=a.map((A=>A.name)),l=a.map((A=>A.UnitConsumptions)),n=Math.max(20*t.length,300);return(0,g.jsx)(y.A,{options:{chart:{type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!1}},plotOptions:{bar:{horizontal:!0}},dataLabels:{enabled:!1},xaxis:{categories:t,title:{text:"Unit Consumption (m3/ha)",offsetX:10}},yaxis:{title:{text:"District Name",offsetY:10}},tooltip:{y:{formatter:function(A){return"".concat(A," (m3/ha)")}}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}]},series:[{data:l}],type:"bar",width:"100%",height:n+"px"})};var C=a(2228),x=a(537);const T=a.p+"static/media/Avg_AETI.076bb0d17b40a3279be5.png";var j=a(2837),P=a(409),V=a(1554);const N=()=>{const[A,e]=(0,t.useState)("AETI"),[a,y]=(0,t.useState)("Yearly"),[N,I]=(0,t.useState)(5),{selectedView:X,selectedFeatureName:E}=(0,f.q)(),[M,q]=(0,t.useState)(c.L9[0]),B=A=>{const e=c.L9.find((e=>e.name===A.target.value));q(e)},R=X&&""!==E?C.filter((A=>A[X]===E)):C,w=(0,d.TD)(R),O=m.k["".concat(a,"_").concat(A)];const G=A=>{const a=A.target.value;e((A=>A===a?"":a))};let z;return w&&(z={Year:d.Kz,Yearly_AETI:(0,d.Ht)(w.AETI),Yearly_PCP:(0,d.Ht)(w.PCP),Yearly_RET:(0,d.Ht)(w.RET),Yearly_ETB:w.ETB,Yearly_ETG:w.ETG}),(0,g.jsx)("div",{className:"dasboard_page_container",children:(0,g.jsx)("div",{className:"main_dashboard",children:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{className:"left_panel_equal",children:[(0,g.jsxs)("div",{className:"card_container",children:[(0,g.jsx)("div",{className:"defination_container",children:(0,g.jsx)("h4",{children:"Evapotranspiration and Potential ET"})}),(0,g.jsx)(x.A,{data:[{x:d.p3,y:w.AETI,fill:"tozeroy",type:"scatter",name:"Evapotranspiration (mm/month)",yaxis:"y1"},{x:d.p3,y:w.RET.map((A=>A/10)),type:"scatter",mode:"lines+markers",name:"Potential ET (mm/month)",marker:{color:"red"},yaxis:"y2"}],layout:{xaxis:{title:"Year"},yaxis:{title:"Evapotranspiration (mm/month)",side:"left",showgrid:!1},yaxis2:{title:"Potential ET (mm/month)",side:"right",overlaying:"y",showgrid:!1},legend:{orientation:"h",x:0,y:1.2}},style:{width:"100%",height:"100%)"}})]}),(0,g.jsx)("div",{className:"card_container",children:(0,g.jsx)("div",{className:"item_table_container",children:(0,g.jsxs)("table",{className:"item_table",children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{children:"Year"}),(0,g.jsx)("th",{children:"Total Evapotranspiration (BCM/year)"}),(0,g.jsx)("th",{children:"ET Blue (BCM/year)"}),(0,g.jsx)("th",{children:"ET Green (BCM/year)"}),(0,g.jsx)("th",{children:"Precipitation (PCP) (BCM/year)"}),(0,g.jsx)("th",{children:"PCP - ET (BCM/year)"}),(0,g.jsx)("th",{children:"Portion of PCP locally consumed (%)"})]})}),(0,g.jsx)("tbody",{children:z.Year.map(((A,e)=>(0,g.jsxs)("tr",{children:[(0,g.jsx)("td",{children:A}),(0,g.jsx)("td",{children:(.001*z.Yearly_AETI[e]*w.AREA/1e9).toFixed(1)}),(0,g.jsx)("td",{children:(.001*z.Yearly_ETB[e]*w.AREA/1e9).toFixed(1)}),(0,g.jsx)("td",{children:(.001*z.Yearly_ETG[e]*w.AREA/1e9).toFixed(1)}),(0,g.jsx)("td",{children:(.001*z.Yearly_PCP[e]*w.AREA/1e9).toFixed(1)}),(0,g.jsx)("td",{className:z.Yearly_PCP[e]-z.Yearly_AETI[e]<0?"red-text":"",children:(.001*(z.Yearly_PCP[e]-z.Yearly_AETI[e])*w.AREA/1e9).toFixed(2)}),(0,g.jsx)("td",{children:(100*z.Yearly_AETI[e]/z.Yearly_PCP[e]).toFixed(1)})]},e)))})]})})}),(0,g.jsxs)("div",{className:"card_container",style:{maxHeight:"600px",overflow:"scroll"},children:[(0,g.jsx)("div",{className:"defination_container",children:(0,g.jsx)("h4",{children:"Total Consumption (BCM)"})}),(0,g.jsx)(b,{filteredFeaturesItems:R})]}),(0,g.jsxs)("div",{className:"card_container",style:{maxHeight:"600px",overflow:"scroll"},children:[(0,g.jsx)("div",{className:"defination_container",children:(0,g.jsxs)("h4",{children:["Unit Consumption (m",(0,g.jsx)("sup",{children:"3"}),"/ha)"]})}),(0,g.jsx)(v,{filteredFeaturesItems:R})]})]}),(0,g.jsx)("div",{className:"right_panel_equal",children:(0,g.jsx)("div",{className:"card_container",style:{height:"100%"},children:(0,g.jsxs)(l.W,{fullscreenControl:!0,center:c.MV,style:{width:"100%",height:"100%",backgroundColor:"white",border:"none",margin:"auto"},zoom:(0,c.I6)(),maxBounds:[[23,49],[41,82]],minZoom:(0,c.I6)(),keyboard:!1,dragging:(0,c.Q4)(),doubleClickZoom:!1,children:[(0,g.jsx)("div",{className:"map_layer_manager",children:(0,g.jsxs)("div",{className:"accordion",id:"accordionPanelsStayOpenExample",children:[(0,g.jsxs)("div",{className:"accordion-item",children:[(0,g.jsx)("h2",{className:"accordion-header",id:"panelsStayOpen-headingOne",children:(0,g.jsx)("button",{className:"accordion-button map_layer_collapse collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#panelsStayOpen-collapseOne","aria-expanded":"false","aria-controls":"panelsStayOpen-collapseOne",children:"Base Map"})}),(0,g.jsx)("div",{id:"panelsStayOpen-collapseOne",className:"accordion-collapse collapse","aria-labelledby":"panelsStayOpen-headingOne",children:(0,g.jsx)("div",{className:"accordion-body map_layer_collapse_body",children:c.L9.map((A=>(0,g.jsxs)("div",{className:"collapse_layers_item",children:[(0,g.jsx)("input",{type:"radio",id:A.name,name:"data_type",value:A.name,checked:(null===M||void 0===M?void 0:M.name)===A.name,onChange:B}),(0,g.jsx)("label",{htmlFor:A.name,children:A.name})]},A.value)))})})]}),(0,g.jsxs)("div",{className:"accordion-item",children:[(0,g.jsx)("h2",{className:"accordion-header",id:"panelsStayOpen-headingTwo",children:(0,g.jsx)("button",{className:"accordion-button map_layer_collapse collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#panelsStayOpen-collapseTwo","aria-expanded":"false","aria-controls":"panelsStayOpen-collapseTwo",children:"Raster Layers"})}),(0,g.jsx)("div",{id:"panelsStayOpen-collapseTwo",className:"accordion-collapse collapse","aria-labelledby":"panelsStayOpen-headingTwo",children:(0,g.jsxs)("div",{className:"accordion-body map_layer_collapse_body",children:[(0,g.jsxs)("div",{className:"collapse_layers_item",children:[(0,g.jsx)("input",{type:"checkbox",id:"avg_aeti_raster",value:"avg_aeti_raster",checked:"avg_aeti_raster"===A,onChange:G}),(0,g.jsx)("label",{htmlFor:"avg_aeti_raster",children:"Avg. Annual Evapotranspiration"})]}),(0,g.jsxs)("div",{className:"collapse_layers_item",children:[(0,g.jsx)("input",{type:"checkbox",id:"avg_ret_raster",value:"avg_ret_raster",checked:"avg_ret_raster"===A,onChange:G}),(0,g.jsx)("label",{htmlFor:"avg_ret_raster",children:"Avg. Annual Potential ET"})]})]})})]}),(0,g.jsxs)("div",{className:"accordion-item",children:[(0,g.jsx)("h2",{className:"accordion-header",id:"panelsStayOpen-headingThree",children:(0,g.jsx)("button",{className:"accordion-button map_layer_collapse collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#panelsStayOpen-collapseThree","aria-expanded":"false","aria-controls":"panelsStayOpen-collapseThree",children:"Vector Data Layers"})}),(0,g.jsx)("div",{id:"panelsStayOpen-collapseThree",className:"accordion-collapse collapse","aria-labelledby":"panelsStayOpen-headingThree",children:(0,g.jsxs)("div",{className:"accordion-body map_layer_collapse_body",children:[(0,g.jsxs)("div",{className:"collapse_layers_item",children:[(0,g.jsx)("input",{type:"checkbox",id:"AETI",value:"AETI",checked:"AETI"===A,onChange:G}),(0,g.jsx)("label",{htmlFor:"AETI",children:"Evapotranspiration"})]}),(0,g.jsxs)("div",{className:"collapse_layers_item",children:[(0,g.jsx)("input",{type:"checkbox",id:"RET",value:"RET",checked:"RET"===A,onChange:G}),(0,g.jsx)("label",{htmlFor:"RET",children:"Potential ET"})]}),(0,g.jsxs)("select",{value:a,onChange:A=>{y(A.target.value),I("")},children:[(0,g.jsx)("option",{value:"Monthly",children:"Monthly"}),(0,g.jsx)("option",{value:"Yearly",children:"Yearly"})]}),(0,g.jsx)("select",{value:N,onChange:A=>I(A.target.value),children:(0,d.Mq)(a)})]})})]})]})}),(0,g.jsx)(n.e,{attribution:M.attribution,url:M.url,subdomains:M.subdomains},M.url),"avg_aeti_raster"===A?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s.a,{opacity:1,attribution:"",url:T,fitBounds:!0,bounds:c.WI},"avg_aeti_raster"),(0,g.jsx)(V.A,{legendURL:"data:image/png;base64,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q6traqekpGj06NGe5wMAAADXopdeeslojx07VpmZmS3OGTt2rNFes2ZNTHfDWrZsWYvrtbW9e/e6njvStWtXo+0KIJI0btw4o52fn6/6+npPRV999VWjPWrUKKWlpXmaCwAAAFyLNm/erLfeesvo+/73vx913gMPPKCEhP/8bLuqqkpLlizxVHPjxo2uK5lC9/lt7fe//73RTkpK0vDhw42+sAFk+vTpSkxMbGqXlZUZD1uJZMmSJa7r2p5++mmv5wsAAABccz766CM9/vjjRt+UKVM0bNiwqHMzMzNdd5Z69tlno94Nq66uTk899ZTRl52dHfUH7KHfXsRi+/btWrhwodE3atQotW/f3ugLG0B69eqlvLw8o+/555/XX/7ylxYLfuc73zH6cnNzPX2wAAAAwNVixYoVunDhgqexRUVFGjFihD766KOmvhtvvFG/+MUvPNebNWuWkpKSmtqffvqpHn744YiXYtXX12vq1Knau3ev0T9nzpyotXJycjRnzpyYb/e7atUq5eTkGD/FiI+P19y5c11jfY7jOOEWKS8v1x133GE88CQhIUHf/e53NW3aNPXu3Vs+n09HjhxRfn6+5s+fr+rq6qaxaWlp2rlzJ7fgBQAAwGW3c+dO7dy5M+yx9957T6+99prRF/p7jOYeffRR19/aN5eenq6kpCSNGzdOubm56t+/v/FAwtOnT6ugoEBLly7V0qVL1Xy7nZKSonfeeafFu1+F88ILL+jHP/6x0de3b1/NmjVLubm5SktL0/nz5/Xuu+9q9uzZrh+fT5kyRfn5+VHr3HnnndqzZ4+SkpKUk5OjL3/5y+rXr59uu+02445c9fX1OnDggAoLC/Xaa69p69atrrWee+45vfDCC67+iAFE+uxf1qhRo4xgcVFycrLi4uJcj3aXPks7b731lsaPHx/1TQIAAACX6vnnn9dPfvKTNlmrrKxMPXv2jHg8PT1dVVVVRl9CQoL8fr8CgUDEb0f8fr9WrVrluuusF42NjXrooYe0fPnysMc7dOigs2fPKtzWftiwYVq/fr3atWsXtc7FABJOYmKi/H6/amtrVV1dHbbWRTNnzoz4LU/YS7Auuuuuu7Rx48awj4evra0NGz4yMjK0evVqwgcAAAD+Z9TX1+v06dMRw8eQIUO0a9euVoUPSYqLi9Obb76padOmhT1eVVUVNhBMmDBBa9eu9RQ+oqmrq9OpU6cUCAQiho9u3bpp9erVLV5i1mIAkaSBAwdq//79evbZZ1338G3O7/frySef1IEDB3T//fd7eAsAAADA1WfevHkaPXp01Du9xsfHKzs7W6tWrVJhYaF69+59SXUTExP1m9/8Rps2bdK9994rn88XcezAgQO1cuVKLV++3PUww5asWbNGr7zyih588EF16dLF05yUlBSNGjVKixcv1r///W+NGTOmxfEtXoIVqqGhQbt27VJxcbEqKirkOI46duyorKwsDR482PhxDAAAAHAta2ho0P79+1VSUqKPP/5YgUBAPp9PGRkZuvnmmzVgwADXU8Hb0okTJ1RUVKTS0lJVV1erXbt26t69uwYNGqTu3bu3SY1PPvlEJSUlOnz4sCorK1VdXa2kpCT5/X5lZGTo1ltvVVZWlnGr4GhiCiAAAAAAcCmiXoIFAAAAAG2FAAIAAADAGgIIAAAAAGsIIAAAAACsIYAAAAAAsIYAAgAAAMAaAggAAAAAa/4P4q72sCj9IeAAAAAASUVORK5CYII=",Title:"Avg. Annual Evapotranspiration",Unit:"(mm/year)"})]}):"avg_ret_raster"===A?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s.a,{opacity:1,attribution:"",url:j,fitBounds:!0,bounds:c.WI},"avg_ret_raster"),(0,g.jsx)(V.A,{legendURL:P,Title:"Avg. Potential ET",Unit:"(mm/year)"})]}):(0,g.jsx)(g.Fragment,{children:""!==A&&""!==N&&""!==a?(0,g.jsxs)(g.Fragment,{children:[O&&(0,g.jsx)(p.A,{ColorLegendsDataItem:O}),(0,g.jsx)(r.k,{style:e=>{if(N&&A){const t=(e=>{const t=C.find((A=>A.DISTRICT===e));return t&&"Monthly"===a?t[A][N]:(0,d.Ht)(t[A])[N]})(e.properties.NAME);return{fillColor:O?(0,d.Rl)(O,t):"none",weight:1,opacity:1,color:"black",dashArray:"2",fillOpacity:1}}},data:u.features,onEachFeature:function(e,t){t.on("mouseover",(function(l){const n=C.find((A=>A.DISTRICT===e.properties.NAME)),s="\n            <div>\n              District: ".concat(e.properties.NAME,"<br/>\n              ").concat("PCP"===A?"Precipitation":"AETI"===A?"Evapotranspiration":"RET"===A?"Potential ET":"AridityIndex"===A?"Aridity Index":null,"  ").concat("AridityIndex"===A?"":"(".concat("Yearly"===a?"mm/year":"mm/month",")"),": ").concat("Monthly"===a?n[A][N]:(0,d.Ht)(n[A])[N],"\n            </div>\n          ");t.bindTooltip(s,{sticky:!0}),t.openTooltip()})),t.on("mouseout",(function(){t.closeTooltip()}))}},A+N+a)]}):(0,g.jsx)(r.k,{style:{fillColor:"black",weight:2,color:"black",fillOpacity:"0.001",interactive:!1},data:i.features})}),(0,g.jsx)(h.A,{}),(0,g.jsx)(o.A,{})]})})})]})})})}},409:A=>{A.exports="data:image/png;base64,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"},2837:(A,e,a)=>{A.exports=a.p+"static/media/Avg_RET.dbfddf6109e12e444b87.png"}}]);
//# sourceMappingURL=218.6d410da7.chunk.js.map