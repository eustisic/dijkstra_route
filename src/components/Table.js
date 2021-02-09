import React, { useState, useEffect } from 'react';

const Table = ({columns, format, rows}) => {
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [NumRoutes, setNumRoutes] = useState(rows.length);

  useEffect(() => {
    setNumRoutes(rows.length);
    setStart(0);
  }, [rows])

  const nextRoutes = () => {
    (start > NumRoutes - 1) 
      ? setStart(0)
      : setStart(start + perPage)
  }

  const previousRoutes = () => {
    setStart( start > 0 ? start - perPage : 0 )
  }

  const Columns = () => (
    <thead>
      <tr>
        {columns.map(col => <th key={col.name}>{col.name}</th> )}
      </tr>
    </thead>
  )

  const Rows = () => (
    <tbody>
      {rows.slice(start, start + perPage).map((route, index) => {
        return (
          <tr key={index}>
            {columns.map((col, idx) => {
              return <td key={col.property}>{format(col.property, route[col.property])}</td>
              })
            }
          </tr>
        )
      })
    }
    </tbody>
  )


  return (
    <div>
      <table className="routes-table">
        <Columns />
        <Rows />
      </table>
      <div className="pagination">
        <p>Showing {start} to {start + perPage} of {NumRoutes} routes</p>
        <button onClick={() => previousRoutes()}>Previous</button>
        <button onClick={() => nextRoutes()}>Next</button>
      </div>
    </div>
  )
};

export default Table;