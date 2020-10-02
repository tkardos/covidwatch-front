import React from "react";
import PieChart from "./PieChart";

function GlobalPieChart({recovered, confirmed, deaths, scope, country, date}) {

  return (

    <div className="m-3">
      <PieChart
        keys={[scope + ' recovered', scope + ' confirmed', scope + ' deaths']}
        values={[recovered, confirmed, deaths]} 
        name={scope +' Covid Data'+ (country ? ': ' + country : '')}>
        </PieChart>
      <p className="mt-3">
        {date ? date.replace("T", " ").replace("Z", " ") : ''}
      </p>
    </div>
  )
}

export default GlobalPieChart;