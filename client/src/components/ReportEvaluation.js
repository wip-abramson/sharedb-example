import StringBinding from 'sharedb-string-binding'
import {DbConnectionContext} from "../App";
import EvaluationMethod from "./EvaluationMethod";
const React = require('react');
// const FakeDb = require('../fakedb');
const Debug = require('debug');
const debug = require('debug')('ReportEvaluation');
const ReportEvaluation = ({ evaluationId, template }) => {
  debug(evaluationId, template);

  const [evaluationDoc, setEvaluationDoc] = React.useState(null);
  const [evaluationData, setEvaluationData] = React.useState(null);

  const dbConnection = React.useContext(DbConnectionContext);

 React.useEffect(() => {
    debug("Fetch evaluation", evaluationId)
    let doc = dbConnection.get('evaluations', evaluationId);
    setEvaluationDoc(doc)
  }, [evaluationId])

  React.useEffect(() => {
    if (evaluationDoc) {
      // Get initial value of document and subscribe to changes
      evaluationDoc.subscribe(updateEvaluationData);

    }
  }, [evaluationDoc])

  function updateEvaluationData() {
    debug("Evaluations Data", evaluationDoc.data)
    setEvaluationData(evaluationDoc.data)

    evaluationDoc.on('op', (op, source) => {
      debug("Evaluation operation", op, source)
    })

  }

  function handleChange(columnRef, value) {
    debug("Value Update", columnRef, value)
    // let path = `responses.${columnRef}`
    var op = {p: [`responses.${columnRef}`, 0], si: value};
    evaluationDoc.submitOp(op, {}, (err) => {
      if (err) throw err
      debug("Op Submitted",  value)
    });
  }

  if(!evaluationId)
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
      <td className="ERROR" key={'ReportEvaluation: ' + evaluationId}></td>
    );
  }

  return evaluationData && (
    <tr key={'eval:' + evaluationId} >
      {template && template.map((column, columnIndex) => {
        if (column.propertyRef === 'method') {
          return (
            <EvaluationMethod key={'evalMethod:' + evaluationData.id + evaluationData.methodId} methodId={evaluationData.methodId}/>
          );
        } else {
          return (<td key={'evalEntry:' + evaluationData.methodId + evaluationData.id + String(columnIndex)}>
            <input value={evaluationData.responses[column.propertyRef]} onChange={(e) => handleChange(column.propertyRef, e.target.value)}/></td>);
        }
      })}
    </tr>
  );

    };
export default ReportEvaluation;
