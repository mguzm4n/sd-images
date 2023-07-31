import * as React from 'react';

import pkg from '../../package.json';
import { createStyles } from './styles/create-styles';
import { CountryFeature } from './types';
import { useCountries } from './use-countries/use-countries';
import { useProjection } from './use-projection/use-projection';
import $ from "jquery"
let index = 0;

interface MapProps {
    count: (arg: string, arg2: [], arg3: {}) => void
}

function Globe({count}:MapProps) {
  index++;
  const size = 400;
  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const r = size / 2;

  const svgRef = React.useRef<SVGSVGElement>(null);
  const { countries } = useCountries();
  const { rotateTo } = useProjection({
    cx,
    cy,
    scale: size / 2,
    svgRef,
    countries,
  });

  const className = `${pkg.name}-${index}`;
  
  const styles = createStyles(className, {
    countryColor: "#228B22",
    countryHoverColor: "#20B2AA",
    oceanColor: "#6495ED",
  });

  const handleCountryClick = (country: CountryFeature) => {
    rotateTo(country.properties.position);
    count(country.properties.name, country.properties.position, country.geometry)
  };

  $("#g").find("title").css("color","red")

  return (
    <svg ref={svgRef} width={width} height={height} className={className}>
      <style>{styles}</style>
      <circle cx={cx} cy={cy} r={r} className="ocean"/>
      {countries.map(country => (
        <g id="g" key={country.id}>
          <title>{country.properties.name}</title>
          <path
            className="country"
            onClick={() => handleCountryClick(country)}
          />
        </g>
      ))}
    </svg>
  );
}

export { Globe };
