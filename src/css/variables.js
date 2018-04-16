const colors = {
  background: `#f9f9ff`,
  border: `#c7c7cd`,
  headingText: `#100F15`,
  bodyText: `#313132`,
  textLight: `#717172`,
  accent: `#6A7CD8`,
  accentDark: `#555abf`,
  accentLight: `#7795f8`,
};

function convertHexToRgba(hex, alpha) {
  if (hex[0] === `#`) {
    hex = hex.slice(1);
  }

  // expand shorthand
  if (hex.length === 3) {
    hex = hex.split(``);
    hex.splice(2, 0, hex[2]);
    hex.splice(1, 0, hex[1]);
    hex.splice(0, 0, hex[0]);
    hex = hex.join(``);
  }

  const values = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];

  alpha = typeof alpha === `number` ? alpha : parseFloat(alpha);

  if (alpha >= 0 && alpha <= 1) {
    values.push(alpha);
  } else {
    values.push(1);
  }

  return `rgba(${values.join(`,`)})`;
}

const fonts = {
  heading: `
        font-family: 'Asul', serif;
        font-weight: 400;
        color: ${colors.headingText};
    `,
  body: `
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        color: ${colors.bodyText};
    `,
};

const sizes = {
  extraLarge: `13vw`,
  large: `10vw`,
  medium: `6vw`,
  small: `3vw`,
};

const breakpoints = {
  mobile: `only screen and (max-width: 736px)`,
  desktop: `only screen and (min-width: 1051px)`,
  retina: `only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5)`,
  print: `print`,
};

const linkStyle = `
    color: ${colors.accentDark};
    border-bottom: 2px solid ${convertHexToRgba(colors.accent, 0.75)};
    transition: border-color 150ms ease-out, color 100ms ease;
    
    &:hover {
        color: ${colors.accent};
        border-color: ${colors.accentLight};
    }
`;

export { colors, convertHexToRgba, fonts, sizes, breakpoints, linkStyle };
