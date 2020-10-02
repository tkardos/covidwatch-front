import React from "react";
import BarChart from "./BarChart";

function GlobalBarChart({recovered, confirmed, deaths, scope, country, date}) {

  return (

    <div className="m-3">
      <BarChart
        keys={[scope + ' recovered', scope + ' confirmed', scope + ' deaths']}
        values={[recovered, confirmed, deaths]} 
        name={scope +' Covid Data'+ (country ? ': ' + country : '')}>
        </BarChart>
      <p className="mt-3">
        {date ? date.replace("T", " ").replace("Z", " ") : ''}
      </p>
    </div>
  )
}

export default GlobalBarChart;