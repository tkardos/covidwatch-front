import React from "react";
import PieChart from "./PieChart";

function GlobalPieChart({recovered, active, deaths, scope, country, date}) {

  return (

    <div className="m-3">
      <PieChart
        keys={[scope + ' recovered', scope + ' active', scope + ' deaths']}
        values={[recovered, active, deaths]} 
        name={scope +' Covid Data'+ (country ? ': ' + country : '')}>
        </PieChart>
      <p className="mt-3">
        {date ? date.replace("T", " ").replace("Z", " ") : ''}
      </p>
    </div>
  )
}

export default GlobalPieChart;