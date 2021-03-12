import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Drive from './Drive/Drive';
import Authentication from './Authentication/Authentication';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import { AuthProvider } from '../Contexts/Auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Drive} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
