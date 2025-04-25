import { useState, useEffect } from "react";
import {ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo"; 
import { feature } from "topojson-client";

import '../ComponentStyles/worldmap.css';
import { area } from "@turf/turf";

function WorldMap({ selectedCountries, isFullSize }) {
  const [countryDataJson, setCountryDataJson] = useState(null);
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    async function fetchCountryData() {
      const res = await fetch("/CountriesView.json");
      const json = await res.json();
      setCountryDataJson(json);
    }
    fetchCountryData();
  }, []);

  useEffect(() => {
    const countries = countryDataJson && feature(countryDataJson, countryDataJson.objects.countries).features;
    
    if(countries && selectedCountries && selectedCountries.length === 1 && !selectedCountries[0].multi_search) {
      const match = countries.find(x => x.properties.name.toLowerCase() === selectedCountries[0].name.trim().toLowerCase()); 
      
      
      if(match) {
        const countryArea = area(match);
        const scale = countryArea / 1_000_000;
        
        const zoom = Math.max(2.5, Math.min(7.5, 9.5 - Math.log10(scale) * 0.85));
        

        setCenter(geoCentroid(match));
        setZoom(isFullSize ? 1 : zoom);
      }
      else {
        setZoom(1);
        setCenter([0, 0]);
      }
    }
  }, [countryDataJson, selectedCountries, isFullSize])

  return (
    countryDataJson && selectedCountries && (
      <ComposableMap
        projection="geoMercator"
        className="map-container"
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={1}
          maxZoom={8}
          translateExtent={[[-1000, -500], [1000, 500]]}
        >
          <Geographies geography={countryDataJson}>
            {({ geographies }) =>
              geographies.map((geo) => { 

                const isSearched = selectedCountries.some(country => {
                     return geo.properties.name.toLowerCase() === country.name.toLowerCase();
                })

                return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => e.stopPropagation()}
                      fill={isSearched ? "#6d635d" : "#e0e0e0"}
                      stroke="#ffffff"
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#7A6E67", outline: "none" },
                        pressed: { fill: "#6A5F58", outline: "none" },
                      }}
                    />
                )})
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    )
  );
}

export default WorldMap;
