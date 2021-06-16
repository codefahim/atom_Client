import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
export const userContext = createContext({});
function App() {
  const [store, setStore] = useState({
    userName: '',
    userImage: '',
    update: false,
  });
  
  return (
    <userContext.Provider value={[store, setStore]}>
      <Router>
        <section className='App bg-yellow-200 fixed-height overflow-auto text-center'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Home' component={Home} />
            <Route path='/Dashboard' component={Dashboard} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </section>
      </Router>
    </userContext.Provider>
  );
}

export default App;
function NoMatch() {
  const history = useHistory();
  history.push('/Home');
  return (
    <div>
      <h2 className='h3'>Sorry, Page Not Found. Please Goto Home.</h2>
    </div>
  );
}
