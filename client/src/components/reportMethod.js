import ShareDb from 'sharedb-client'
import {DbConnectionContext} from "../App";
const React = require('react');
const Debug = require('debug');
const debug = Debug('reportMethod');

// const FakeDb = require('../fakedb');
//var Criteria = require("criteria.js");
const ReportMethod = ({ methodId, index }) => {
  // TODO: Can we remove index and use methodId in keys?
  debug("Report Method", methodId)

  const [methodDoc, setMethodDoc] = React.useState()
  const [methodData, setMethodData] = React.useState()

  const dbConnection = React.useContext(DbConnectionContext);
  React.useEffect(() => {
    debug("Fetch method", methodId)
    // TODO: methods or method?
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

  if (!methodData) {
    return <tr>Loading</tr>
  }

  let l, s, n, r, a;
  l = <th key={methodData.label}>{methodData.label}</th>;
  // first, test to see if short form (alternate)
  if ('alternate' in methodData || 'alternateUrl' in methodData) {
    a = methodData.alternate || methodData.alternateUrl;
    a = 'alternateUrl' in methodData
      ? <td key={a + index} colSpan="3" > <a href={methodData.alternateUrl}>{a}</a></td >
      : <td key={a + index} colSpan="3">{a}</td>;
  } else { // no, let's do long form

    s = methodData.specification || methodData.specificationUrl;
    n = methodData.network || methodData.networkUrl;
    r = methodData.registry || methodData.registryUrl;

    s = 'specificationUrl' in methodData
      ? <td key={s + index}> <a href={methodData.specificationUrl}>{s}</a></td >
      : <td key={s + index}>{s}</td>

    n = 'networkUrl' in methodData
      ? <td key={n + index}> <a href={methodData.networkUrl}>{n}</a></td >
      : <td key={n + index}>{n}</td>

    r = 'registryUrl' in methodData
      ? <td key={r + index} > <a href={methodData.registryUrl}>{r}</a></td >
      : <td key={r + index}>{r}</td>
  }
  var methodDisplay = a
    ? <tr key={methodData.id+index}>{l}{a}</tr>
    : <tr key={methodData.id+index}>{l}{s}{n}{r}</tr>
  //console.log(methodDisplay);
  return methodDisplay;
}

export default ReportMethod;
