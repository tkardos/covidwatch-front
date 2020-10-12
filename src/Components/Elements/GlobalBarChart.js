import React from "react";
import BarChart from "./BarChart";

function GlobalBarChart({recovered, confirmed, deaths, scope, country, date, deathshow}) {

  return (

    <div className="p-3">
      <BarChart
        keys={[scope + ' recovered', scope + ' confirmed', scope + ' deaths']}
        values={[recovered, confirmed, deaths]} 
        name={scope +' Covid Data'+ (country ? ': ' + country : '')}>
        </BarChart>
        <div className="mt-3" style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
      <p className="legendSize">
        {date ? date.replace("T", " ").replace("Z", " ") : ''} </p>
      <p className="legendSize" style={deathshow ? {marginLeft: "auto", color: "brown"} : {}}><strong> {deathshow ? 'New deaths: ' + deaths : ''} </strong></p>
      </div>
    </div>
  )
}

export default GlobalBarChart;