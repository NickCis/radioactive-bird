import routes from './routes';
import { getRouteId } from './components/connectWithSSR';

const checkRoutes = routes => {
  routes.forEach(route => {
    getRouteId(route);

    if (route.routes)
      checkRoutes(route.routes);
  });
};

describe('routes', () => {
  it('should have valid `getRouteId`', () => {
    checkRoutes(routes);
  });
});
