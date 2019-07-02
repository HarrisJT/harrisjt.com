import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = props => (
  <a className={props.className} href={props.to} rel="noopener noreferrer" target="_blank">
    {props.children}
  </a>
);

ExternalLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

ExternalLink.defaultProps = {
  className: null,
  children: null,
};

export default ExternalLink;
