import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Auth, Bookings, Events } from './pages';
import { Navbar } from './components';

import { ApolloProvider } from '@apollo/client'
import { client } from './service'

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Navbar />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={Auth} />
            <Route path="/events" component={Events} />
            <Route path="/bookings" component={Bookings} />
          </Switch>
        </main>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
