import React from 'react';
import { Route } from 'react-router-dom';

export default ({title, children}) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.title = title;
    if (document)
      document.title = title;
    return children || null;
  }} />
);
