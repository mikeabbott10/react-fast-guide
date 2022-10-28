import './style.css'
import { useContext } from "react"
import Lessons from "./components/Lessons"
import DataContext from './context/DataContext'
import NavigationArea from './components/NavigationArea'
import React from 'react'

function App() {
  const appCtx = useContext(DataContext);

  return (
    <>
      <div 
          className={appCtx.width !== null && appCtx.width > 960 ? "fg-main-container" : "fg-main-container-mobile"} 
          style={appCtx.width !== null && appCtx.width > 960 ? {display: "flex"} : {}}>
        <NavigationArea/>
        <Lessons/>
      </div>
    </>
  )
}

export default App
