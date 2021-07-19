const React = require('react');
const ReportEvaluator = require('./reportEvaluator');
const ReportEvaluators = ({ report }) => {
  var s = "";
  if (report.evaluators.length > 1) 
    s = "s";
  let evaluatorLabel = <th><a>Evaluator</a>{s}</th>;

  return (
    <tr>
      {evaluatorLabel}
      <td className="value" colSpan="3">
        {report.evaluators && report.evaluators.map((evaluatorId, i) => {
          if (i)
            return (<span key={i}>, <ReportEvaluator evaluator={evaluatorId}></ReportEvaluator></span>)
          else
            return (<span key={i}><ReportEvaluator evaluator={evaluatorId}></ReportEvaluator></span>);
        })}
      </td>
    </tr>
  )  
}

export { ReportEvaluators };
