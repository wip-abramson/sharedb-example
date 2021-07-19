import ShareDb from 'sharedb-client'
const React = require('react');
// const FakeDb = require('../fakedb');
const Debug = require('debug');
const debug = require('debug')('ReportEvaluation');
const ReportEvaluation = ({ evaluation, template }) => {
  debug(evaluation, template);
  if(!evaluation)
  {
    debug('Input evaluation is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation: NULL'}></td>
    );
  }
  if(!template)
  {
    debug('Input template is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation:' + evaluation}></td>
    );
  }

  let dbEvaluation;
  if (typeof evaluation === 'string') {
    //dbEvaluation = FakeDb.getFirstElement('evaluations', evaluation);
    debug('eval retrieved: ', evaluation);

    if (!dbEvaluation)
    {
      debug('String evaluation lookup failed');
      return (
        <td className="ERROR" key={'ReportEvaluation:' + evaluation}></td>
      );
    }

    evaluation = dbEvaluation;
  }

  let method;
//  let method = FakeDb.getFirstElement('methods', evaluation.method);
  debug('method: ', method);
  if(!method)
  {
    debug('method is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation:' + evaluation}></td>
    );
  }
  return (
    <tr key={'eval:' + evaluation.id} >
      {template && template.map((column, columnI) => {
        if (column.propertyRef === 'method') {
          return (
            <th key={'evalMethod:' + method.id +evaluation.id}>{method.label}</th>
          );
        } else {
          return (<td key={'evalEntry:' + method.id + evaluation.id + String(columnI)}>
            {evaluation.responses[column.propertyRef]}</td>);
        }
      })}
    </tr>
  );

    };
export { ReportEvaluation };
