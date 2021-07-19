import './App.css';
import ReconnectingWebSocket from 'reconnecting-websocket'
import ShareDb from 'sharedb-client'
import React from 'react'
import { Report } from './components/report'
//var Report = require('../src/components/report');


const EXPRESS_PORT = process.env.REACT_APP_EXPRESS_PORT || 8000;

const EXPRESS_HOST = process.env.REACT_APP_EXPRESS_HOST || "localhost"

function App() {

    let [dbConnection, setDbConnection] = React.useState(null)
    let [reportDocument, setReportDocument] = React.useState(null)
    // let [count, setCount] = React.useState(null)

    // let [latestVersion,setLatestVersion] = React.useState(null)

    // let [previousVersion, setPreviousVersion] = React.useState("")

    // let [previousSnapshot, setPreviousSnapshot] = React.useState(null)

    React.useEffect(() => {
        console.log("Load webhook")
        // Open WebSocket connection to ShareDB server
        let socket = new ReconnectingWebSocket(`ws://${EXPRESS_HOST}:${EXPRESS_PORT}`);
        let connection = new ShareDb.Connection(socket);
        setDbConnection(connection)
        // Create local Doc instance mapped to 'examples' collection document with id 'counter'
        let reportDoc = connection.get('report', 'https://w.rubric.cc/reports/1');

        console.log(reportDoc)
        setReportDocument(reportDoc)
        console.log("LATEST VERSION ", reportDoc.version)

        //setLatestVersion(reportDoc.version)


    }, [])

    React.useEffect(() => {
        console.log("ATTEMPTING TO SET COUNTER DOC", reportDocument)
        if (reportDocument) {
            console.log("Document set")
            // Get initial value of document and subscribe to changes
            reportDocument.subscribe(updateNumClicks);
            // // When document changes (by this client or any other, or the server),
            // // update the number on the page
            // counterDocument.on('op', updateNumClicks);
          console.log("subscribed", reportDocument)


        }

    }, [reportDocument])

    function updateNumClicks() {

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
        <Report report={reportDocument} db={dbConnection}></Report>
                  {/*<button style={{"font-size": "36px"}} onClick={decrement}>-1</button>*/}
                  {/*<button style={{"font-size": "36px"}} onClick={increment}>+1</button>*/}
              <div>...Loading</div>
      </header>
    </div>
  );
}

export default App;
