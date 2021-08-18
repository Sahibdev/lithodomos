import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";
import { getApolloClient } from "./graphql/ApolloClient";
import { AppRoutes } from "./routes/AppRoutes";
import { createStore } from "./store";
import { AppGlobalStyle } from "./styles/AppGlobalStyle";

const history = createBrowserHistory();
const { store, persistor } = createStore(history);

const App: React.FC = () => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(
    null
  );

  useEffect(() => {
    async function loadInitialLibraries() {
      const _apolloClient = await getApolloClient();

      setApolloClient(_apolloClient);
    }

    loadInitialLibraries();
  }, []);

  if (!apolloClient) {
    return <p>Loading</p>;
  }

  return (
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <AppGlobalStyle />
            <AppRoutes />
            <ToastContainer />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
