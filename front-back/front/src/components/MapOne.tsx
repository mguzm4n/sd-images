import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import { useEffect } from 'react';
import '../js/us-aea-en';
import 'jsvectormap/dist/maps/world.js';
import {useState} from "react";
import $ from "jquery"

const MapOne = () => {
  var selected = ''
  useEffect(() => {
    const mapOne = new jsVectorMap({
      selector: '#mapOne',
      map: 'world',
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: '#C8D0D8',
        },
        hover: {
          fillOpacity: 1,
          fill: '#3056D3',
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: 'Satoshi',
          fontWeight: 'semibold',
          fill: '#fff',
        },
        hover: {
          cursor: 'pointer',
        },
      },
      labels: {
        regions: {
          render(code) {
            return code.split('-')[1];
          },
        },
      },
      onRegionClick: function(event, code)
      {
        selected = code
        $('#selected').text(selected)
      }
    });
  });

  return (
    <div className="grid grid-cols-1 grid-rows-1 overflow-hidden col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Seleccione un país: <p id="selected">{selected}</p>
      </h4>
      <div id="mapOne" className="mapOne map-btn h-90"></div>
    </div>
  );
};

export default MapOne;
