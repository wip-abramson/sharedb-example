import React from 'react'
import {DbConnectionContext} from "../App";
const debug = require('debug')('EvaluationMethod');

const EvaluationMethod = ({methodId}) => {

  const [methodDoc, setMethodDoc] = React.useState()
  const [methodData, setMethodData] = React.useState()

  const dbConnection = React.useContext(DbConnectionContext);
  React.useEffect(() => {
    debug("Fetch method", methodId)
    let doc = dbConnection.get('methods', methodId);
    setMethodDoc(doc)
  }, [methodId])

  React.useEffect(() => {
    if (methodDoc) {
      // Get initial value of document and subscribe to changes
      methodDoc.subscribe(updateMethodData);
    }
  }, [methodDoc])

  function updateMethodData() {
    debug("Methods Data", methodDoc.data)
    setMethodData(methodDoc.data)
  }

  if(!methodId)
  {
    debug('Method id is NULL');
    return (
      <td className="ERROR" key={'ReportEvaluation: NULL'}></td>
    );
  }

  // TODO some loading component when methodData not set?
  return (
    methodData ? <th>{methodData.label}</th> : <th/>
  )
}

export default EvaluationMethod
