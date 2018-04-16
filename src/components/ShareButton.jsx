import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  cursor: pointer;
`;

const buildWindow = service => {
  const serviceParams = service.params;
  const keys = Object.keys(serviceParams);
  serviceParams[Object.keys(serviceParams)[0]] = document.title.split(`–`)[0];
  let str = keys.length > 0 ? `?` : ``;
  for (let i = 0; i < keys.length; i++) {
    if (str !== `?`) {
      str += `&`;
    }

    if (serviceParams[keys[i]]) {
      str += `${keys[i]}=${encodeURIComponent(serviceParams[keys[i]])}`;
    }
  }

  const url = service.shareUrl + str;

  // Fixes dual-screen position
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  // Find a width that works
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

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

  return window.open(
    url,
    ``,
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(`, `),
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
