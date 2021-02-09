import React, { useState, useEffect } from 'react';
import './App.css';
import { getAirlineById, getAirportByCode } from './data.js'
import DATA from './data.js';
import Table from './components/Table';
import Select from './components/Select';
import RouteMap from './components/Map';

const formatValue = (property, value) => {
  if (property === "airline") {
    return getAirlineById(value).name;
  } else {
    return getAirportByCode(value).name;
  }
}

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const App = () => {
  const [selected, setSelected] = useState(DATA.routes);
  const [option, setOption] = useState('');
  const [departure, setDeparture] = useState("all");
  const [arrival, setArrival] = useState("all");
  const [srcPorts, setSrcPorts] = useState([]);
  const [destPorts, setDestPorts] = useState([]);

  useEffect(() => {
    setSrcPorts(DATA.airports.filter(port => DATA.routes.some(route => route.src === port.code)))
    setDestPorts(DATA.airports.filter(port => DATA.routes.some(route => route.dest === port.code)))
  }, [])

  const selectDeparture = (value) => {
    // sets starting point
    setDeparture(value)
    console.log("Departure:", value)
  }

  const selectArrival = (value) =>  {
    // sets ending point
    setArrival(value)
    console.log("Arrival:", value)
    
  }

  const handleClear = () => {
    setSelected(DATA.routes);
    setDeparture("all");
    setArrival("all");
    setOption("");
  }

  const mapClick = (e) => {
    let value = e.target.querySelector('title').innerHTML
    if (departure === "all") {
      selectDeparture(value)
    } else {
      selectArrival(value)
    }
  }

  const calculateRoute = () => {

    // get an array of ports for the shortest path
    if (arrival !== "all" && departure !== "all") {
      const path = dijkstraAlgorithm()
      const route = []

      try {
        for (let i = 0; i < path.length - 1; i += 1) {
          route.push(DATA.routes.find(route => {
              return route.src === path[i] && route.dest === path[i+1]
            })
          )
        }

        setSelected(route);
        setOption("found");

      } catch(e) {
        handleClear();
        alert("No path found");
      }

    } else {
      alert("Invalid entry");
    }
  }

  const dijkstraAlgorithm = () => {
    const shortestDistanceTable = {};
    const shortestPrevTable = {};

    let unvisited = [];
    const visited = {};

    shortestDistanceTable[departure] = 0;

    let currentPort = departure;

    while (currentPort) {
      visited[currentPort] = true;
      unvisited = unvisited.filter(port => port !== currentPort);

      // calculate available routes of currentPort
      let avail = DATA.routes.filter(route => route.src === currentPort);
      // iterate through dests if unvisited push to unvisited
      avail.forEach(route => {
        if (!visited[route.dest]) {
          unvisited.push(route.dest);
        }

        // dist from starting to adjacent
        let distThroughCurrent = shortestDistanceTable[currentPort] + distance(currentPort, route.dest);

        if (!shortestDistanceTable[route.dest] || (distThroughCurrent < shortestDistanceTable[route.dest])) {
          shortestDistanceTable[route.dest] = distThroughCurrent;
          shortestPrevTable[route.dest] = currentPort;
        }
      })

      currentPort = nextShortestDistDest(unvisited, shortestDistanceTable);
    }

    let shortestPath = [];

    currentPort = arrival;

    if (!shortestPrevTable[currentPort]) {
      return
    }

    while(currentPort !== departure) {
      shortestPath.push(currentPort)

      currentPort = shortestPrevTable[currentPort]
    }
    
    shortestPath.push(departure);
    return shortestPath.reverse();
  }

  // takes a list of ports finds their stored shortest distance and returns the port with the stored shortest distance
  const nextShortestDistDest = (arr, ref) => {
    let shortest;

    arr.forEach(code => {
      if (!shortest || ref[code] < ref[shortest]) {
        shortest = code;
      }
    });

    return shortest;
  }

  // x is long, y is lat
  const distance = (current, adjacent) => {
    const src = getAirportByCode(current);
    const dest = getAirportByCode(adjacent);

    const φ1 = src.lat * Math.PI/180;
    const φ2 = dest.lat * Math.PI/180;
    const Δφ = (dest.lat-src.lat) * Math.PI/180;
    const Δλ = (dest.long-src.long) * Math.PI/180;

    const x = Δλ * Math.cos((φ1+φ2)/2);
    const y = Δφ;
    const d = Math.sqrt(x*x + y*y) * DATA.R;
    return d;
  }

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Dijkstra's Route</h1>
    </header>
    <section>
      <RouteMap selected={selected} option={option} handleClick={(e) => mapClick(e)}/>
    </section>
    <section>
    <Select 
      options={srcPorts} 
      valueKey="code" 
      titleKey="name"
      value={departure}
      allTitle="Departure" 
      handleSelect={selectDeparture} />
    <Select 
      options={destPorts} 
      valueKey="code" 
      titleKey="name"
      value={arrival}
      allTitle="Arrival" 
      handleSelect={selectArrival} />
    <button className="clear" onClick={() => handleClear()}>Clear</button>
    <button className="calculate" onClick={() => calculateRoute()}>Calculate Route</button>
    </section>
    <section>
      <Table 
        className="routes-table" 
        columns={columns} 
        rows={selected} 
        format={formatValue} 
      />
    </section>
  </div>
  )
}

export default App;