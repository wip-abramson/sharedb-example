import React from 'react'
import Debug from 'debug'
let debug = Debug("ReportUseCases");

const ReportUseCases = ({ report }) => {
  debug('ReportUseCases report', report);

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
