import ShareDb from 'sharedb-client'
import ReportEvaluation from './reportEvaluation'
import {DbConnectionContext} from '../App'

const React = require('react');

// const FakeDb = require('../fakedb');
const Debug = require('debug');
const debug = Debug('ReportCriteria');

const ReportCriteria = ({ criteriaId, evaluations }) => {

  const [criteriaDoc, setCriteriaDoc] = React.useState(null);
  const [criteriaData, setCriteriaData] = React.useState(null);

  const dbConnection = React.useContext(DbConnectionContext);

  React.useEffect(() => {
    debug("Fetch criteria", criteriaId)
    let doc = dbConnection.get('criteria', criteriaId);
    setCriteriaDoc(doc)
  }, [criteriaId])

  React.useEffect(() => {
    if (criteriaDoc) {
      // Get initial value of document and subscribe to changes
      criteriaDoc.subscribe(updateCriteriaData);


    }
  }, [criteriaDoc])

  function updateCriteriaData() {
    debug("Criteria Data", criteriaDoc.data)
    setCriteriaData(criteriaDoc.data)
  }

  debug('criteria ', criteriaId);
  debug('evaluations', evaluations);
  if (!criteriaData)
    return (
      <section key={'critieriaSection:'+ criteriaId }>
        <p>id:{criteriaId} not found</p>
      </section>
    )
  //   ;

  return (
      <section key={'criteriaSection'+criteriaData.id}>
      <h4>{criteriaData.name}</h4>
      <section>
        <h5>Question</h5>
        <p>{criteriaData.question}</p>
      </section>
      <section>
        <h5>Responses</h5>
        <ol type="A">
          {criteriaData.response && criteriaData.response.possibleResponses && criteriaData.response.possibleResponses.map((response,i) => {
            return (
              <li key={`response:${criteriaData.id}:${i}`}>{response.meaning}</li>
            )
          })}

        </ol>

      </section>
      <section>
        <h5>Relevance</h5>
        <p>{criteriaData.relevance}</p>
      </section>
      <section>
        <h5>Evaluation</h5>
        <table key={'table.'+criteriaData.id} className="simple">
          <tr>
            {criteriaData.evaluationTemplate &&
            criteriaData.evaluationTemplate.columns &&
            criteriaData.evaluationTemplate.columns.map((column, i) => {
                return (
                  <th key={String(i) + column.heading}>{column.heading}</th>
                );
              })}
          </tr>
          {/*{evaluations &&*/}
            {/*evaluations.map((evaluation) => {*/}
              {/*return (*/}
                {/*<ReportEvaluation key={'reportEvaluation.'+evaluation.id} evaluation={evaluation} template={criteriaData.evaluationTemplate.columns}>*/}
                {/*</ReportEvaluation>*/}
              {/*)*/}
            {/*})}*/}
        </table>
      </section>
    </section>
  )

}

export default ReportCriteria;
