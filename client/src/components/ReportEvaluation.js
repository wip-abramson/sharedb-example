import StringBinding from 'sharedb-string-binding'
import {DbConnectionContext} from "../App";
import EvaluationMethod from "./EvaluationMethod";

const React = require('react');
// const FakeDb = require('../fakedb');
const Debug = require('debug');
const debug = require('debug')('ReportEvaluation');
const ReportEvaluation = ({evaluationId, template}) => {
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
      evaluationDoc.on('op', (op, source) => {
        setEvaluationData(evaluationDoc.data)
      })
    }
  }, [evaluationDoc])

  function updateEvaluationData() {
    debug("Evaluations Data", evaluationDoc.data)
    setEvaluationData(evaluationDoc.data)
  }

  function handleDelete(columnRef, event) {
    event.preventDefault()
    let charCode = event.which || event.charCode || event.keyCode || 0;

    let selectionStart = event.target.selectionStart
    let selectionEnd = event.target.selectionEnd
    let currentValue = evaluationData["responses"][columnRef];
    let delString = ""
    let offset;
    if (selectionStart - selectionEnd === 0) {
      if (charCode === 46) {
        offset = selectionEnd
        delString = currentValue.substring(selectionEnd, selectionEnd+1)
      } else if (charCode === 8) {
        offset = selectionStart - 1
        delString = currentValue.substring(selectionStart-1, selectionStart)
      }
    } else {
      offset = selectionStart
      delString = currentValue.substring(selectionStart,selectionEnd)

    }

    let path = ['responses', columnRef, offset]
    deleteOperation(path, delString)

  }

  function deleteOperation(path, text) {
    let deleteStrOp = {p: path, sd: text};

    evaluationDoc.submitOp(deleteStrOp, {}, (err) => {
      if (err) console.log(err)
      debug("Op Submitted", deleteStrOp)
      // debug(evaluationDoc.data)
      // setEvaluationData(evaluationDoc.data)

      // setEvaluationData({...evaluationData, "responses": evaluationDoc.data.responses})

    });
  }

  function insertOperation(path, text) {
    let insertStrOp = {p: path, si: text};
    evaluationDoc.submitOp(insertStrOp, {}, (err) => {
      if (err) console.log(err)
      debug("Op Submitted", insertStrOp)
      // debug(evaluationDoc.data)
      // setEvaluationData(evaluationDoc.data)

      setEvaluationData({...evaluationData, "responses": evaluationDoc.data.responses})

    });
  }

  function handleKeyPress(columnRef, event) {
    // debug("Value Update", columnRef, value)
    // let path = `responses.${columnRef}`
    let selectionStart = event.target.selectionStart
    let selectionEnd = event.target.selectionEnd
    let charCode = event.which || event.charCode || event.keyCode || 0;
    // TODO: Lots
    let char = String.fromCharCode(charCode)
    // TODO: Need to handle selction of multiple chars. I.e. overwrite/delete
    if (selectionStart - selectionEnd === 0) {

      // TODO need to determine which chars/keyCodes are ignored

      debug("Insert : " + char + " index " + event.target.selectionStart)

      // cos


      let path = ['responses', columnRef, event.target.selectionStart]
      insertOperation(path, char)

    } else {
      let currentValue = evaluationData['responses'][columnRef];
      let delString = currentValue.substring(selectionStart,selectionEnd)
      let path = ['responses', columnRef, selectionStart]
      deleteOperation(path, delString)

      insertOperation(path, char)



    }

  }

  if (!evaluationId) {
    debug('Input evaluation is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation: NULL'}></td>
    );
  }
  if (!template) {
    debug('Input template is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation: ' + evaluationId}></td>
    );
  }

  return evaluationData && (
    <tr key={'eval:' + evaluationId}>
      {template && template.map((column, columnIndex) => {
        if (column.propertyRef === 'method') {
          return (
            <EvaluationMethod key={'evalMethod:' + evaluationData.id + evaluationData.methodId}
                              methodId={evaluationData.methodId}/>
          );
        } else {
          return (<td key={'evalEntry:' + evaluationData.methodId + evaluationData.id + String(columnIndex)}>
            <input value={evaluationData.responses[column.propertyRef]} onKeyDown={(event) => {
              let charCode = event.which || event.charCode || event.keyCode || 0;
              if (charCode === 46 || charCode === 8) {
                handleDelete(column.propertyRef, event)
              }
            }} onKeyPress={(event) => {
              handleKeyPress(column.propertyRef, event)

            }}/></td>);
        }
      })}
    </tr>
  );

};
export default ReportEvaluation;
