import logo from './logo.svg';
import './App.css';
import ReconnectingWebSocket from 'reconnecting-websocket'
import ShareDb from 'sharedb-client'
import React from 'react'
function App() {

    let [dbConnection, setDbConnection] = React.useState(null)

    let [document, setDocument] = React.useState(null)
    let [numClicks, setNumClicks] = React.useState(null)

    React.useEffect(() => {
        console.log("Load webhook")
        // Open WebSocket connection to ShareDB server
        let socket = new ReconnectingWebSocket('ws://' + "localhost:8080");
        let connection = new ShareDb.Connection(socket);
        setDbConnection(connection)
        // Create local Doc instance mapped to 'examples' collection document with id 'counter'
        let doc = connection.get('examples', 'counter');

        console.log(doc)
        setDocument(doc)


    }, [])

    React.useEffect(() => {

        if (document) {
            console.log("Document set")
            // Get initial value of document and subscribe to changes
            document.subscribe(updateNumClicks);
            // When document changes (by this client or any other, or the server),
            // update the number on the page
            document.on('op', updateNumClicks);
        }

    }, [document])

    function updateNumClicks() {

        setNumClicks(document.data.numClicks)
    }

    // When clicking on the '+1' button, change the number in the local
    // document and sync the change to the server and other connected
    // clients
    function increment() {
        // Increment `doc.data.numClicks`. See
        // https://github.com/ottypes/json0 for list of valid operations.
        document.submitOp([{p: ['numClicks'], na: 1}]);
    }

  return (
    <div className="App">
      <header className="App-header">
          {document ?
              <div style={{"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", "font-size": "36px"}}>
              You clicked {numClicks ? <span id="num-clicks">{numClicks}</span> : "loading"} times.
              <button style={{"font-size": "36px"}} onClick={increment}>+1</button>
          </div> :
              <div>...Loading</div>
          }

      </header>
    </div>
  );
}

export default App;
