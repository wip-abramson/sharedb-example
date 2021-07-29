import './App.css';
import ReconnectingWebSocket from 'reconnecting-websocket'
import ShareDb from 'sharedb-client'
import React from 'react'
import Report from './components/Report'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
//var Report = require('../src/components/report');

const EXPRESS_PORT = process.env.REACT_APP_EXPRESS_PORT || 8000;

const EXPRESS_HOST = process.env.REACT_APP_EXPRESS_HOST || "localhost"

export const DbConnectionContext = React.createContext();

function App() {

  let reportId = 'https://w.rubric.cc/reports/1';

  let [dbConnection, setDbConnection] = React.useState(null)

  React.useEffect(() => {
    // Open WebSocket connection to ShareDB server
    let socket = new ReconnectingWebSocket(`ws://${EXPRESS_HOST}:${EXPRESS_PORT}`);
    let connection = new ShareDb.Connection(socket);
    setDbConnection(connection)
  }, [])





  // When clicking on the '+1' button, change the number in the local
  // document and sync the change to the server and other connected
  // clients
  // function increment() {
  //     // https://github.com/ottypes/json0 for list of valid operations.
  //     reportDocument.submitOp([{p: ['count'], na: 1}], (error) => {
  //         console.log("Version Updated:", reportDocument.version)
  //
  //         setLatestVersion(reportDocument.version)
  //     });
  // }
  //
  // function decrement() {
  //     // https://github.com/ottypes/json0 for list of valid operations.
  //     reportDocument.submitOp([{p: ['count'], na: -1}], (error) => {
  //         console.log("Version Updated:", reportDocument.version)
  //
  //         setLatestVersion(reportDocument.version)
  //     });
  // }


  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          {dbConnection ?
            <DbConnectionContext.Provider value={dbConnection}>
              <Switch>
                <Route path="/report/:id">
                  <Report />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </DbConnectionContext.Provider>
            :
            <div>...Loading</div>
          }

        </div>
      </Router>

    </div>
  );
}

export default App;
