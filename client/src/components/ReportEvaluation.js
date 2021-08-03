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
      console.log(evaluationDoc)

    })


  }

  function handleKeyPress(columnRef, event) {
    // debug("Value Update", columnRef, value)
    // let path = `responses.${columnRef}`

    // TODO: Lots
    // Need to handle selction of multiple chars. I.e. overwrite/delete
    if (event.target.selectionStart - event.target.selectionEnd === 0) {

      // TODO need to determine which chars/keyCodes are ignored
      let char = String.fromCharCode(event.keyCode)
      debug("Insert", char, "index", event.target.selectionStart)

      var op = {p: ['responses', columnRef, event.target.selectionStart], si: char};

      evaluationDoc.submitOp(op, {}, (err) => {
        if (err) console.log(err)
        debug("Op Submitted",  op)
        // debug(evaluationDoc.data)
        // setEvaluationData(evaluationDoc.data)

        setEvaluationData({...evaluationData, "responses": evaluationDoc.data.responses})

      });
    }

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
            <input value={evaluationData.responses[column.propertyRef]} onKeyDown={(e) => {
              if (event.keyCode === 46 || event.keyCode === 8) {
                console.log("Delete")
              }
            }} onKeyPress={(e) => {
              handleKeyPress(column.propertyRef, e)

            }}/></td>);
        }
      })}
    </tr>
  );

    };
export default ReportEvaluation;
