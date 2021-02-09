import React from 'react'
import { getAirportByCode } from '../data.js'

const RouteMap = ({ selected, handleClick }) => {
  const MappedRoutes = () => (
    selected.map((route, index) => {
      const src = getAirportByCode(route.src)
      const dest = getAirportByCode(route.dest)

      return (
        <g key={index}>
          <circle 
            className="source" 
            cx={src.long} 
            cy={src.lat}
            onClick={handleClick}
          >
            <title>{route.src}</title>
          </circle> 
          <circle 
            className="destination" 
            cx={dest.long} 
            cy={dest.lat}
            onClick={handleClick}
          >
            <title>{route.dest}</title>
          </circle>
          <path d={`M${src.long} ${src.lat} L ${dest.long} ${dest.lat}`} />
        </g>
      )
    })
  )

  // write some code to return only the shortest path highlighted

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
      <MappedRoutes />    
      </g>
    </svg>
  )
}

export default RouteMap 

// for title on hover display title else display none