var React = require('react');
var ReportMasthead = require('./reportMasthead');
var ReportCategories = require('./reportCategories');
//var Criteria = require("criteria.js");
const Report = ({ report }) => {
  //console.log('report.js report.methods', report.methods);
  return (
    <html>
      <head>
        <link href="rendered.css" rel="stylesheet"></link>
      </head>
      <body>
        <section key="masthead" className="ReportMasthead">
          < ReportMasthead report={report} ></ReportMasthead>
          < ReportCategories report={report}></ReportCategories>
        </section>
      </body>
    </html>
  );
}

module.exports = Report;
