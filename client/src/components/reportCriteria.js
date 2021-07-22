import ShareDb from 'sharedb-client'
import ReportEvaluation from './reportEvaluation'

const React = require('react');

// const FakeDb = require('../fakedb');
const Debug = require('debug');
const debug = Debug('ReportCriteria');

const ReportCriteria = ({ criteria, evaluations }) => {
  let id = criteria.id || criteria;
  if (typeof criteria === 'string') {
//    criteria = FakeDb.getFirstElement('criteria', criteria);
    // debug('retrieved: ', criteria);
  }
  debug('criteria ', criteria);
  debug('evaluations', evaluations);
  if (!criteria)
    return null;
  // return (
  //   <section key={'critieriaSection:'+ id }>
  //     <p>id:{id} not found</p>
  //   </section>
  // )
  //   ;

  return (
      <section key={'criteriaSection'+criteria.id}>
      <h4>{criteria.name}</h4>
      <section>
        <h5>Question</h5>
        <p>{criteria.question}</p>
      </section>
      <section>
        <h5>Responses</h5>
        <ol type="A">
          {criteria.response && criteria.response.possibleResponses && criteria.response.possibleResponses.map((response,i) => {
            return (
              <li key={`response:${criteria.id}:${i}`}>{response.meaning}</li>
            )
          })}

        </ol>

      </section>
      <section>
        <h5>Relevance</h5>
        <p>{criteria.relevance}</p>
      </section>
      <section>
        <h5>Evaluation</h5>
        <table key={'table.'+id} className="simple">
          <tr>
            {criteria.evaluationTemplate &&
              criteria.evaluationTemplate.columns &&
              criteria.evaluationTemplate.columns.map((column, i) => {
                return (
                  <th key={String(i) + column.heading}>{column.heading}</th>
                );
              })}
          </tr>
          {evaluations &&
            evaluations.map((evaluation) => {
              return (
                <ReportEvaluation key={'reportEvaluation.'+evaluation.id} evaluation={evaluation} template={criteria.evaluationTemplate.columns}>
                </ReportEvaluation>
              )
            })}
        </table>
      </section>
    </section>
  )

}

export default ReportCriteria;
