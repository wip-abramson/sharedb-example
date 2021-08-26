import React from 'react';
import Debug from "debug"
import { Link } from "react-router-dom";
import {DbConnectionContext} from "../App";
let debug = Debug("Reports")

const Reports = () => {

  let dbConnection = React.useContext(DbConnectionContext);
  let [reportDocs, setReportDocs] = React.useState()

  React.useEffect(() => {
    dbConnection.createFetchQuery('reports', {}, {}, (error, results) => {
      if (error) {
        debug("Error fetching reports", error)
        // TODO: Let user know
      } else {
        Debug("All result documents", results)
        setReportDocs(results)
      }
    })

  }, [])


  return (
    <div>
      <h2>Reports</h2>
      {reportDocs &&
        <ul>
          {reportDocs.map(reportDoc => {
            let reportId = reportDoc.data.id.replace('https://w.rubric.cc/reports/', '');
            return (
              <li key={reportDoc.data.id}>
                <Link to={`/report/${reportId}`}>{reportDoc.data.id}</Link>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default Reports
