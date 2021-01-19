import logo from './logo.svg';
import PrivateRoute from './component/PrivateRoute';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/sign-in" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
