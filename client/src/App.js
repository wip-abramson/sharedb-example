import logo from './logo.svg';
import './App.css';
import ReconnectingWebSocket from 'reconnecting-websocket'
import ShareDb from 'sharedb-client'
import React from 'react'
function App() {

    let [dbConnection, setDbConnection] = React.useState(null)
    let [counterDocument, setCounterDocument] = React.useState(null)
    let [count, setCount] = React.useState(null)


    let [latestVersion,setLatestVersion] = React.useState(null)

    let [previousVersion, setPreviousVersion] = React.useState("")

    let [previousSnapshot, setPreviousSnapshot] = React.useState(null)

    React.useEffect(() => {
        console.log("Load webhook")
        // Open WebSocket connection to ShareDB server
        let socket = new ReconnectingWebSocket('ws://' + "localhost:8080");
        let connection = new ShareDb.Connection(socket);
        setDbConnection(connection)
        // Create local Doc instance mapped to 'examples' collection document with id 'counter'
        let counterDoc = connection.get('examples', 'counting');

        console.log(counterDoc)
        setCounterDocument(counterDoc)
        console.log("LATEST VERSION ", counterDoc.version)

        setLatestVersion(counterDoc.version)


    }, [])

    React.useEffect(() => {
        console.log("ATTEMPTING TO SET COUNTER DOC", counterDocument)
        if (counterDocument) {
            console.log("Document set")
            // Get initial value of document and subscribe to changes
            counterDocument.subscribe(updateNumClicks);
            // When document changes (by this client or any other, or the server),
            // update the number on the page
            counterDocument.on('op', updateNumClicks);


        }

    }, [counterDocument])

    function updateNumClicks() {

        setCount(counterDocument.data.count)
        setLatestVersion(counterDocument.version)
    }

    // When clicking on the '+1' button, change the number in the local
    // document and sync the change to the server and other connected
    // clients
    function increment() {
        // https://github.com/ottypes/json0 for list of valid operations.
        counterDocument.submitOp([{p: ['count'], na: 1}], (error) => {
            console.log("Version Updated:", counterDocument.version)

            setLatestVersion(counterDocument.version)
        });
    }

    function decrement() {
        // https://github.com/ottypes/json0 for list of valid operations.
        counterDocument.submitOp([{p: ['count'], na: -1}], (error) => {
            console.log("Version Updated:", counterDocument.version)

            setLatestVersion(counterDocument.version)
        });
    }

    function fetchPreviousVersion(e) {
        e.preventDefault()

        if (!isNaN(previousVersion)) {
            console.log(previousVersion)
            let versionToFetch = parseInt(previousVersion)

            if (versionToFetch < latestVersion) {
                dbConnection.fetchSnapshot("examples", "counting", versionToFetch, (error, snapshot) =>  {
                    console.log(snapshot)
                    console.log("Version", snapshot.v)

                    setPreviousSnapshot(snapshot)
                })
            }
            else {
                alert("You must only search earlier versions")
            }


        }
        else {
            alert("Version Must Be a Number")
        }
    }

  return (
    <div className="App">
      <header className="App-header">
          {counterDocument ?
              <div style={{"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", "font-size": "36px"}}>
                  <h2>Current Count</h2>
                  <div>Version {latestVersion}</div>
              Count {count ? <span id="num-clicks">{count}</span> : "loading"} times.

                  <button style={{"font-size": "36px"}} onClick={decrement}>-1</button>
                  <button style={{"font-size": "36px"}} onClick={increment}>+1</button>

                  <div>
                      <h3>Fetch Previous Count</h3>
                      <form onSubmit={fetchPreviousVersion}>
                          <div><span>Version:</span><input value={previousVersion} onChange={(e) => setPreviousVersion(e.target.value)}/></div>
                          <button type="submit">Fetch</button>
                      </form>

                  </div>

                  {previousSnapshot &&
                    <div>
                        <h3>Previous Version</h3>
                        <div>Version: {previousSnapshot.v}</div>
                        <div>Count: {previousSnapshot.data.count}</div>
                    </div>
                  }

          </div> :
              <div>...Loading</div>
          }

      </header>
    </div>
  );
}

export default App;
