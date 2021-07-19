var React = require('react');
var ReportMasthead = require('./reportMasthead');
var ReportCategories = require('./reportCategories');
//var Criteria = require("criteria.js");

const Debug = require('debug');
const debug = Debug('report');
const Report = ({ report, db }) => {
  debug('report.js', report, db);
  return (
    <html>
      <head>
        <link href="rendered.css" rel="stylesheet"></link>
      </head>
      <body>
        <section key="masthead" className="ReportMasthead">
          < ReportMasthead report={report} db={db} ></ReportMasthead>
{/*          < ReportCategories report={report}></ReportCategories>*/}
        </section>
      </body>
    </html>
  );
}

export { Report };
