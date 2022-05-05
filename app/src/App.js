import { useState, useEffect } from 'react';
import './App.css';
import MonthSummary from './screens/MonthSummary';
import Login from './screens/Login';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from './utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let token = localStorage.getItem('token');

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000//graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  useEffect(() => {
    setLoggedIn(AuthService.loggedIn());
  }, [])

  const logout = () => {
    AuthService.logout();
    setLoggedIn(false);
  }

  return (
    <ApolloProvider client={client}>
      <div className='page'>
        <div className='nav'>
          {loggedIn ? <button onClick={logout}>Sign Out</button> : <button disabled style={{ color: 'transparent', cursor: 'default' }}>G</button>}
        </div>
        <div className="App">
          {!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <MonthSummary setLoggedIn={setLoggedIn} />}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
