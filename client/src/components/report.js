import React from 'react'
import ReportMasthead from './reportMasthead'
//var ReportMasthead = require('./reportMasthead');
import ReportCategories from './reportCategories';
import ReconnectingWebSocket from "reconnecting-websocket";
import {DbConnectionContext} from "../App";
//var Criteria = require("criteria.js");

const Debug = require('debug');
const debug = Debug('report');


const Report = ({ reportId }) => {
  let [reportDocument, setReportDocument] = React.useState(null)
  let [reportData, setReportData] = React.useState(null)

  const dbConnection = React.useContext(DbConnectionContext);

  React.useEffect(() => {
    // Create local Doc instance mapped to 'examples' collection document with id 'counter'
    let reportDoc = dbConnection.get('report', reportId);

    setReportDocument(reportDoc)
  }, [reportId])

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
  }

  return (
      <section key="masthead" className="ReportMasthead">
        {reportData && <>
          < ReportMasthead report={reportData}/>
          <ReportCategories report={reportData}/>
        </>}


      </section>
  );
}

export default Report;
