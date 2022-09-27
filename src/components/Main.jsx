import React from 'react'
import {People} from './People.jsx'
import {Planets} from './Planets.jsx'
import {Starships} from './Starships.jsx'


const Main = () => {
  return (
    <div className = "p-4">
      <People />
      <Planets />
      <Starships />   
  </div>
  )
}

export default Main


