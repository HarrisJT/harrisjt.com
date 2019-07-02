import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  cursor: pointer;
`;

const buildWindow = service => {
  const serviceParams = service.params;
  const keys = Object.keys(serviceParams);
  // eslint-disable-next-line prefer-destructuring
  serviceParams[Object.keys(serviceParams)[0]] = document.title.split(`–`)[0];
  let str = keys.length > 0 ? `?` : ``;
  // eslint-disable-next-line no-restricted-syntax
  for (const element of keys) {
    if (str !== `?`) {
      str += `&`;
    }

    if (serviceParams[element]) {
      str += `${element}=${encodeURIComponent(serviceParams[element])}`;
    }
  }

  const url = service.shareUrl + str;

  // Fixes dual-screen position
  const {screenX, open, screenLeft, screenTop, innerHeight, innerWidth, screenY} = window;
  const dualScreenLeft = screenLeft !== undefined ? screenLeft : screenX;
  const dualScreenTop = screenTop !== undefined ? screenTop : screenY;

  // Find a width that works
  let width;

  if (innerWidth) {
    width = innerWidth;
  } else {
    width = document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width; // eslint-disable-line no-restricted-globals
  }

  let height;
  if (innerHeight) {
    height = innerHeight;
  } else {
    height = document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height; // eslint-disable-line no-restricted-globals
  }

  // Center positions
  const left = width / 2 - 550 / 2 + dualScreenLeft;
  const top = height / 2 - 400 / 2 + dualScreenTop;

  const config = {
    width: 550,
    height: 400,
    left,
    top,
    location: `no`,
    toolbar: `no`,
    status: `no`,
    directories: `no`,
    menubar: `no`,
    scrollbars: `no`,
    resizable: `yes`,
    centerscreen: `yes`,
    chrome: `yes`,
  };

  return open(
    url,
    ``,
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(`, `)
  );
};

class ShareButton extends PureComponent {
  onClick = service => {
    const windowObjectReference = () => buildWindow(service);
    windowObjectReference();
  };

  onKeyPress = e => {
    if (e.key === `Enter` || e.key === 13) {
      this.onClick(this.props.service);
    }
  };

  render() {
    return (
      <Button
        role="button"
        title={`Share on ${this.props.service.name}`}
        onClick={() => this.onClick(this.props.service)}
        onKeyPress={() => this.onKeyPress}>
        {this.props.service.name}
      </Button>
    );
  }
}

ShareButton.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    shareUrl: PropTypes.string.isRequired,
    params: PropTypes.object,
  }).isRequired,
};

export default ShareButton;
