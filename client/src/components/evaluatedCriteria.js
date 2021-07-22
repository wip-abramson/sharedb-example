import React from 'react'
const EvaluatedCriteria = ({ criteria }) => {
  return (
    <section>
      <h4>{criteria.name}</h4>
      <section>
        <h5>Question</h5>
        <p>
          {criteria.question}
        </p>
      </section>
      <Response></Response>
    </section>
  )};

export default EvaluatedCriteria
