import './App.css';
import './assets/sass/main.scss';
import OrderComponent from './layouts/Admin/Order/OrderComponent';
import DashboardComponent from './layouts/Admin/Dashboard/DashboardComponent';
import LoginAdminComponent from './layouts/Admin/Login/LoginAdminComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin" component={LoginAdminComponent} />
        <Route path="/admin/dashboard" component={DashboardComponent} />
        <Route path="/admin/order" component={OrderComponent} />
      </Switch>
    </Router>
  );
}

export default App;
