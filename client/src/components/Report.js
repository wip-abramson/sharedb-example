import React from 'react'
import ReportMasthead from './ReportMasthead'
//var ReportMasthead = require('./reportMasthead');
import ReportCategories from './ReportCategories';
import ReconnectingWebSocket from "reconnecting-websocket";
import {DbConnectionContext} from "../App";
//var Criteria = require("criteria.js");
import {useParams} from 'react-router-dom'

const Debug = require('debug');
const debug = Debug('report');


const Report = () => {
  let {id} = useParams();
  let [reportDocument, setReportDocument] = React.useState(null)
  let [reportData, setReportData] = React.useState(null)

  const dbConnection = React.useContext(DbConnectionContext);

  React.useEffect(() => {

    let reportId = decodeURIComponent(id);
    // Create local Doc instance mapped to 'examples' collection document with id 'counter'
    let reportDoc = dbConnection.get('reports', reportId);

    setReportDocument(reportDoc)
  }, [id])

  React.useEffect(() => {
    if (reportDocument) {
      debug("Report document set", reportDocument)
      // Get initial value of document and subscribe to changes
      reportDocument.subscribe(updateReportData);
    }

  }, [reportDocument])

  function updateReportData() {
    debug("set report data", reportDocument.data)
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
