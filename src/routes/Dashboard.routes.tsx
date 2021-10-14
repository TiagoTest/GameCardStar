import { Route } from 'react-router-dom';
import { DashboardPage } from '../pages/Dashboard';

export const DashboardRoute = () => {
  return <Route exact path="/dashboard" component={DashboardPage} />;
};
