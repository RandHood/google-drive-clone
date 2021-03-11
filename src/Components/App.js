import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
          <Route exact path="/" component={Drive} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
