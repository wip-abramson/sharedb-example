import React from 'react'
import ReportEvaluators from './ReportEvaluators.js';
import ReportUseCases from './ReportUseCases.js';
//const FakeDb = require('fakedb.js');
import ReportMethod from './ReportMethod';
import ReportSource from './ReportSource';

const Debug = require('debug');
const debug = Debug('reportMasthead');
const ReportMasthead = ({ report }) => {
  debug(report);
  let methods = (
    report.methods && report.methods.map((methodId, index) => {
      return <ReportMethod methodId={methodId} index={index} key={methodId + index}/>;
     })
  )

  let sources = (
    report.sources && report.sources.map((sourceId) => {
      return <ReportSource key={sourceId} sourceId={sourceId}/>;
    })
  )

  return (
    <section key={report.id}>
      <h3>Report : {report.title}</h3>
      <p>{report.subtitle}</p>
      <table key={report.id+'table'} className="simple">
        <tr><td className='heading' colSpan="4">Rubric Evaluation</td></tr>
        <ReportEvaluators evaluators={report.evaluators}></ReportEvaluators>
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

export default ReportMasthead ;
