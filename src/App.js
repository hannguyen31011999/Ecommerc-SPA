import './App.css';
import './assets/sass/main.scss';
import routes from './routes/route';
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
        {
          routes.map((item, index) => {
            if (item.exact) {
              return <Route exact path={item.path} component={item.component} key={index} />
            } else {
              return <Route path={item.path} component={item.component} key={index} />
            }
          })
        }
      </Switch>
    </Router>
  );
}

export default App;
