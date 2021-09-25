import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Auth, Bookings, Events } from './pages';
import { Navbar } from './components';

import { ApolloProvider } from '@apollo/client'
import { client } from './service'

import AuthContext from './context/authContext'
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = (token, userId) => {
    setToken(token)
    setUserId(userId)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
  }

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <Navbar />
          <main className="main-content">
            <Switch>
              {!token ? (
                <>
                  <Redirect from="/" to="/auth" exact />
                  <Route path="/auth" component={Auth} />
                </>
              ) : (
                <>
                  <Redirect from="/" to="/events" exact />
                  <Route path="/bookings" component={Bookings} />
                </>
              )
              }
              <Route path="/events" component={Events} />
            </Switch>
          </main>
        </AuthContext.Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
