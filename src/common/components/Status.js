import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children || null;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Status;
