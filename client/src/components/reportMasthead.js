var React = require('react');
const ReportEvaluators = require('./reportEvaluators.js');
const ReportUseCases = require('./reportUseCases.js');
//const FakeDb = require('fakedb.js');
const ReportMethod = require('./reportMethod');
const ReportSource = require('./reportSource');

const Debug = require('debug');
const debug = Debug('reportMasthead');
const ReportMasthead = ({ report, db }) => {
  debug(report, db);
//  console.log('reprotMasthead report: ', report);
 // console.log('reportMasthead report.methods', report.methods);
  let methods = (
    report.methods && report.methods.map((method, index) => {
      return <ReportMethod method={method} index={index} key={method + index}></ReportMethod>;
     })
  )

  let sources = (
    report.sources && report.sources.map((sourceId) => {
      return <ReportSource key={sourceId} source={sourceId}></ReportSource>;
    })
  )

  return (
    <section key={report.id}>
      <h3>Report : {report.title}</h3>
      <p>{report.subtitle}</p>
      <table key={report.id+'table'} className="simple">
        <tr><td className='heading' colSpan="4">Rubric Evaluation</td></tr>
        <ReportEvaluators report={report}></ReportEvaluators>
        <tr><th>Evaluation Date</th><td colSpan="3">{report.evaluationDate}</td></tr>
        <tr><th>Funding</th><td colSpan="3">{report.funding}</td></tr>
        <ReportUseCases report={report}></ReportUseCases>
        <tr><th>Report URL</th><td colSpan="3"><a href={report.url}>{report.url}</a></td></tr>
        
        <tr><td className="heading" colSpan="4">Methods Evaluated</td></tr>
        <tr><td></td><th>Specification</th><th>Network</th><th>Registry</th></tr>
        {methods}
        <tr><td className="heading" colSpan="4">Criteria Sources</td></tr>
        {sources}
      </table>

    </section>
  );
}

export { ReportMasthead };
