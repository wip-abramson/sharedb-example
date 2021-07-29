import {DbConnectionContext} from "../App";
const Debug = require('debug');
const debug = Debug('ReportSource');
const React = require('react');

const ReportSource = ({ sourceId }) => {

  const dbConnection = React.useContext(DbConnectionContext);

  let [sourceDoc, setSourceDoc] = React.useState();
  let [sourceData, setSourceData]= React.useState();

  React.useEffect(() => {
    let doc = dbConnection.get('sources', sourceId)
    setSourceDoc(doc)
  }, [sourceId])

  React.useEffect(() => {
    if (sourceDoc) {
      sourceDoc.subscribe(updateSourceData)
    }
  }, [sourceDoc])

  function updateSourceData() {
    debug("Source Data", sourceDoc.data)
    setSourceData(sourceDoc.data)
  }


  return sourceData ? (
    <tr key={sourceData.id}>
      <th>{sourceData.title}</th>
      <td colSpan="3"><a href={sourceData.url}>{sourceData.url}</a></td>
    </tr>
  ) : <tr/>;
};

export default ReportSource;
