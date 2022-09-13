import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import App from "./App";
import Dashborad from'./Dashboard'
import Dashborad2 from'./Dashboard2'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
/*import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map3";

let mapData = {
    city: "北京",
    mapCenter:[116.418261, 39.921984],  //城市定位，经纬度定位只能选择1个
    mapZoom: 10, //地图缩放
    mapKey: '12345678d98aff1166e51962f108bb24',   //你的高德key
    status: { //是否支持放大拖拽
        zoomEnable: true,
        dragEnable: true,
    },
    mapMaker :[  //marker标记点(list)
        {lnglat:[116.401728,39.911984],text:'要显示的内容1'},
    ],
    plugins:['ToolBar']
};

ReactDOM.render(
    <div style ={{width:"100%",height:"100%"}}>
        <Map title="map" mapData={mapData}/>
    </div>,

    document.getElementById("root")
);*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

