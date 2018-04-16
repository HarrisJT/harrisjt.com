import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../../css/variables';

const Root = styled.div`
  h1 {
    text-align: center;
  }
  
  &:after {
    content: '';
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3e%3cpath fill='none' stroke=' %23${colors.accentDark.substr(
      1,
      colors.accentDark.length - 1,
    )}' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3e%3c/svg%3e");
    margin: 1.55rem auto;
    width: 45%;
    display: block;
    height: 7px;
  }
`;

const Stats = styled.div`
  margin-top: 5px;
  color: ${colors.textLight};
  text-align: center;

  .modified {
    display: block;
    margin-top: 3px;
    font-style: italic;
    font-size: 0.875rem;
  }
`;

const PostHeader = props => (
  <Root>
    <h1>{props.title}</h1>
    <Stats>
      <time dateTime={new Date(props.date).toISOString()}>{props.date}</time>
      <span className="dot-separator" />
      {props.type === `article` && (
        <span>{`${props.timeToRead} minute read`}</span>
      )}
      {props.role && <span>{`Role: ${props.role}`}</span>}
      {props.dateModified && (
        <time
          className="modified"
          dateTime={new Date(props.dateModified).toISOString()}>
          Modified: {props.dateModified}
        </time>
      )}
    </Stats>
  </Root>
);

PostHeader.propTypes = {
  dateModified: PropTypes.string,
  date: PropTypes.string.isRequired,
  role: PropTypes.string,
  timeToRead: PropTypes.number,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

PostHeader.defaultProps = {
  dateModified: null,
  role: null,
  timeToRead: 1,
};

export default PostHeader;
