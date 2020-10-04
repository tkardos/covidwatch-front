import React from "react";
import PieChart from "./PieChart";

function GlobalPieChart({recovered, active, deaths, scope, country, date, deathRate}) {

  return (

    <div className="m-3">
      <PieChart
        keys={[scope + ' recovered', scope + ' active', scope + ' deaths']}
        values={[recovered, active, deaths]} 
        name={scope +' Covid Data'+ (country ? ': ' + country : '')}>
        </PieChart>
        <div className="mt-3" style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
      <p >
        {date ? date.replace("T", " ").replace("Z", " ") : ''} </p>
      <p style={deathRate ? {marginLeft: "auto", color: "brown"} : {}}><strong> {deathRate ? 'Death rate: ' + deathRate + ' %' : ''} </strong></p>
      </div>
    </div>
  )
}

export default GlobalPieChart;