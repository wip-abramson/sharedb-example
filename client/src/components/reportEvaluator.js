import ShareDb from 'sharedb-client'
const React = require('react');
// const FakeDb = require('../fakedb');
const ReportEvaluator = ({ evaluator }) => {
  if (typeof evaluator === 'string') {
    // evaluator = FakeDb.getFirstElement('evaluators', evaluator);
  }

  let name,email;
  if (evaluator.email) {
    email = "mailto:" + evaluator.email;
    name = <span className="evaluator" key={evaluator.name}>{evaluator.name} &lt;<a href={email}>{evaluator.email}</a>&gt;</span>;
  } else {
    name = <span className="evaluator" key={evaluator.name}>{evaluator.name}</span>
  }
  return name;
}

export default ReportEvaluator;
