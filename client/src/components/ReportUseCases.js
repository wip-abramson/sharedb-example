import React from 'react'
import Debug from 'debug'
let debug = Debug("ReportUseCases");

const ReportUseCases = ({ report }) => {
  debug('ReportUseCases report', report);
  var s = "";
  if (report.useCases.length > 1)
    s = "s";
  let evaluatorLabel = <th><a>Evaluator</a>{s}</th>;

  return (
    <tr><th>Use Cases</th>
      <td className="value" colSpan="3">
        {report.useCases && report.useCases.map(({ name, desc }, i) => {
          return (
            <p key={i}>
              <strong>{name}</strong>
              {desc}
            </p>
          );
        })}
      </td>
    </tr>
  )
}

export default ReportUseCases;
