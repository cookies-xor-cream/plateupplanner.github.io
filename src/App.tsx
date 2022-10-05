import { useState, KeyboardEvent, SetStateAction, useEffect } from "react";
import { InputNumber } from "antd";
import { WarningOutlined } from "@ant-design/icons";

import './App.css';
import Workspace from './Workspace';

import './App.css';
import 'antd/dist/antd.min.css'
import { styledButton } from "./helpers";

function App() {
  const [height, setHeight] = useState<number>(12);
  const [width, setWidth] = useState<number>(16);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [importLayoutString, setImportLayoutString] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      setImportLayoutString(window.location.hash);
      setShowWorkspace(true);
    }
  }, []);

  const handleSubmit = () => {
    if (height !== undefined &&
        width !== undefined &&
        height > 0 &&
        width > 0 &&
        height <= 12 &&
        width <= 16) {
      setImportLayoutString('');
      setShowWorkspace(true);
    }
  }

  const handleReset = () => {
    setHeight(12);
    setWidth(16);
    setShowWorkspace(false);
  }

  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0));
  }

  if (isTouchDevice()) {
    return (
      <div className="app"
           onKeyDown={(event: KeyboardEvent) => { if (event.key === "Enter") {handleSubmit()} }}>
        <div style={{
               font: "3em 'Lilita One', sans-serif",
               padding: "1em"
             }}>
          PlateUp! Planner
        </div>
        <div style={{
              font: "1em 'Source Sans Pro' 300, sans-serif",
              textAlign: "center"
             }}>
          Plan your PlateUp! kitchen before you jump into the game<br/>
        </div>
        <div style={{
              font: "2em 'Source Sans Pro' 300 italic, sans-serif",
              textAlign: "center",
              padding: "4em"
             }}>
            <WarningOutlined /><br/>
          <i>PlateUp! Planner has not been implemented for touchscreen devices yet. Sorry!</i>
        </div>
      </div>
    )
  } else if (showWorkspace) {
    return (
      <div className="app">
        <Workspace
          height={height as number}
          width={width as number}
          setWidth={setWidth}
          setHeight={setHeight}
          handleResetParent={handleReset}
          locationFragment={importLayoutString}
        />
      </div>
    )
  } else {
    return (
      <div className="app"
           onKeyDown={(event: KeyboardEvent) => { if (event.key === "Enter") {handleSubmit()} }}>
        <div style={{
               font: "3em 'Lilita One', sans-serif",
               padding: "1em"
             }}>
          PlateUp! Planner
        </div>
        <div style={{
              font: "1em 'Source Sans Pro' 300, sans-serif",
              textAlign: "center"
             }}>
          Plan your PlateUp! kitchen before you jump into the game<br/>
        </div>
        <div className="dimensions">
          <div className="header">
            Height
          </div>
          <div/>
          <div className="header">
            Width
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <InputNumber 
              min={1} max={12} defaultValue={12} 
              onChange={(value: SetStateAction<number>) => setHeight(value)} 
              style={{
                fontSize: "2em",
                padding: "5%"
              }}/>
          </div>
          <div className="header">
            x
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <InputNumber 
              min={1} max={16} defaultValue={16} 
              onChange={(value: SetStateAction<number>) => setWidth(value)}
              style={{
                fontSize: "2em",
                padding: "5%"
              }}/>
          </div>
        </div>
        {styledButton("Start", handleSubmit)}
        <div style={{
              font: "1em 'Source Sans Pro' 300 italic, sans-serif",
              textAlign: "center",
              padding: "4em"
             }}>
          <i>We are not officially affiliated with PlateUp! or its creators. No copyright infringement intended. We just love the game ♥</i>
        </div>
      </div>
    );
  }
}

export default App;
