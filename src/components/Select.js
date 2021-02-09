import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, handleSelect }) => {

  return (
    <section>
      <label>{allTitle}</label>
      <select name={allTitle} value={value} onChange={(e) => handleSelect(e.target.value)}>
        <option value="all">All</option>
        {options.map(port => {
          return (
              <option key={port[valueKey]} value={port[valueKey]}>{port[titleKey]}</option>
            )
          })
        }
      </select>
    </section>
  )
}

export default Select;