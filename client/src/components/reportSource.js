import ShareDb from 'sharedb-client'
const React = require('react');
// const FakeDb = require('../fakedb');
const ReportSource = ({ source }) => {
  if (typeof source === 'string') {
   // source = FakeDb.getFirstElement('sources', source);
  }
  //console.log('reportSource', source);
  return (
    <tr key={source.id}>
      <th>{source.title}</th>
      <td colSpan="3"><a href={source.url}>{source.url}</a></td>
    </tr>
  );
};

export default ReportSource;
