import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Title = ({ title, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.title = title;
      else document.title = title;
      return children || null;
    }}
  />
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Title;
