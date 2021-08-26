import React from 'react'
import ReportEvaluator from './ReportEvaluator';

const ReportEvaluators = ({ evaluators }) => {
  var s = "";
  if (evaluators.length > 1)
    s = "s";
  let evaluatorLabel = <th><a>Evaluator</a>{s}</th>;

  return (
    <tr>
      {evaluatorLabel}
      <td className="value" colSpan="3">
        {evaluators && evaluators.map((evaluatorId, i) => {
          if (i)
            return (<span key={i}>, <ReportEvaluator evaluatorId={evaluatorId}/></span>)
          else
            return (<span key={i}><ReportEvaluator evaluatorId={evaluatorId}/></span>);
        })}
      </td>
    </tr>
  )
}

export default ReportEvaluators;
