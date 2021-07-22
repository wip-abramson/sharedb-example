import React from 'react'
import ReportCriteria from './reportCriteria';

const ReportCategories = ({ report }) => {

  //console.log('ReportCategories', report.categories);
  return (
    <div>
      <h1>The Criteria</h1>
      {report.categories && report.categories.map((category) => {
        return (
          <section key={category.id}>
            <h1 key={category.id}> {category.name}</h1>
            <p>{category.desc}</p>

            {category.criteria && category.criteria.map((criteria) => {
              return (
                <ReportCriteria criteriaId={criteria.id} key={criteria.id} evaluations={criteria.evaluations}/>
              )
            })}

          </section>
        );
      })}
    </div >
  );
}




export default ReportCategories;
