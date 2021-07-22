import './App.css';
import ReconnectingWebSocket from 'reconnecting-websocket'
import ShareDb from 'sharedb-client'
import React from 'react'
import Report from './components/report'
//var Report = require('../src/components/report');


const EXPRESS_PORT = process.env.REACT_APP_EXPRESS_PORT || 8000;

const EXPRESS_HOST = process.env.REACT_APP_EXPRESS_HOST || "localhost"

export const DbConnectionContext = React.createContext();

function App() {

  let [dbConnection, setDbConnection] = React.useState(null)
  let [reportDocument, setReportDocument] = React.useState(null)
  let [reportData, setReportData] = React.useState(null)



  // let [count, setCount] = React.useState(null)

  // let [latestVersion,setLatestVersion] = React.useState(null)

  // let [previousVersion, setPreviousVersion] = React.useState("")

  // let [previousSnapshot, setPreviousSnapshot] = React.useState(null)

  React.useEffect(() => {
    // Open WebSocket connection to ShareDB server
    let socket = new ReconnectingWebSocket(`ws://${EXPRESS_HOST}:${EXPRESS_PORT}`);
    let connection = new ShareDb.Connection(socket);
    setDbConnection(connection)
    // Create local Doc instance mapped to 'examples' collection document with id 'counter'
    let reportDoc = connection.get('report', 'https://w.rubric.cc/reports/1');

    setReportDocument(reportDoc)


  }, [])

  React.useEffect(() => {
    if (reportDocument) {
      console.log("Document set")
      // Get initial value of document and subscribe to changes
      reportDocument.subscribe(updateReportData);
    }

  }, [reportDocument])

  function updateReportData() {
    console.log("set report data")
    setReportData(reportDocument.data)
    // setCount(reportDocument.data.count)
    // setLatestVersion(reportDocument.version)
  }

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
      <header className="App-header">
        {dbConnection ?
            <DbConnectionContext.Provider value={dbConnection}>
              {reportData && <Report report={reportData}></Report>}
            </DbConnectionContext.Provider>
            :
          <div>...Loading</div>
        }

      </header>
    </div>
  );
}

export default App;
