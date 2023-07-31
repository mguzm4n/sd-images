import { earth } from './schemes';

import { Colors } from './schemes';

export function createStyles(className: string, colors: Partial<Colors>) {
  const {
    countryColor = earth.countryColor,
    countryHoverColor = earth.countryHoverColor,
    oceanColor = earth.oceanColor,
  } = colors;

  return `
    .${className} .country {
      fill: ${countryColor};
      stroke: #FF9E2C;
    }
    .${className} .country:hover {
      fill: ${countryHoverColor};
      stroke: ${countryHoverColor};
    }
    .${className} .ocean {
      fill: ${oceanColor};
    }
  `;
}