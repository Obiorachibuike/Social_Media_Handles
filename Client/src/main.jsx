import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Updated imports

// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql', // Adjust with your backend URL
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Pass the client as a prop to ApolloProvider */}
    {/* <ApolloProvider client={client}> */}
      <App />
    {/* </ApolloProvider> */}
  </React.StrictMode>,
);
