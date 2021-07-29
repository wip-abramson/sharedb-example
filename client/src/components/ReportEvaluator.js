import {DbConnectionContext} from "../App";
const Debug = require('debug');
const debug = Debug('ReportEvaluator');
const React = require('react');

const ReportEvaluator = ({ evaluatorId }) => {

  const dbConnection = React.useContext(DbConnectionContext);

  let [evaluatorDoc, setEvaluatorDoc] = React.useState();
  let [evaluatorData, setEvaluatorData] = React.useState();

  React.useEffect(() => {
    let doc = dbConnection.get('evaluators', evaluatorId);
    setEvaluatorDoc(doc)
  }, [evaluatorId]);

  React.useEffect(() => {
    if (evaluatorDoc) {
      evaluatorDoc.subscribe(updateEvaluatorData)
    }
  }, [evaluatorDoc]);

  function updateEvaluatorData() {
    debug("Evaluator Data", evaluatorDoc.data)
    setEvaluatorData(evaluatorDoc.data)
  }

  if (!evaluatorData) {
    return <span>Loading</span>
  }

  let name,email;
  if (evaluatorData.email) {
    email = "mailto:" + evaluatorData.email;
    name = <span className="evaluator" key={evaluatorData.name}>{evaluatorData.name} &lt;<a href={email}>{evaluatorData.email}</a>&gt;</span>;
  } else {
    name = <span className="evaluator" key={evaluatorData.name}>{evaluatorData.name}</span>
  }
  return name
}

export default ReportEvaluator;


