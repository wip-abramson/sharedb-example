import ShareDb from 'sharedb-client'
const React = require('react');
const Debug = require('debug');
const debug = Debug('reportMethod');

// const FakeDb = require('../fakedb');
//var Criteria = require("criteria.js");
const ReportMethod = ({ method, index }) => {
  debug(method);
  if (typeof method === 'string') {
//    method = FakeDb.getFirstElement('methods', method);
  }
  let l, s, n, r, a;
  l = <th key={method.label}>{method.label}</th>;
  // first, test to see if short form (alternate)
  if ('alternate' in method || 'alternateUrl' in method) {
    a = method.alternate || method.alternateUrl;
    a = 'alternateUrl' in method
      ? <td key={a + index} colSpan="3" > <a href={method.alternateUrl}>{a}</a></td >
      : <td key={a + index} colSpan="3">{a}</td>;
  } else { // no, let's do long form

    s = method.specification || method.specificationUrl;
    n = method.network || method.networkUrl;
    r = method.registry || method.registryUrl;

    s = 'specificationUrl' in method
      ? <td key={s + index}> <a href={method.specificationUrl}>{s}</a></td >
      : <td key={s + index}>{s}</td>

    n = 'networkUrl' in method
      ? <td key={n + index}> <a href={method.networkUrl}>{n}</a></td >
      : <td key={n + index}>{n}</td>

    r = 'registryUrl' in method
      ? <td key={r + index} > <a href={method.registryUrl}>{r}</a></td >
      : <td key={r + index}>{r}</td>
  }
  var methodDisplay = a
    ? <tr key={method.id+index}>{l}{a}</tr>
    : <tr key={method.id+index}>{l}{s}{n}{r}</tr>
  //console.log(methodDisplay);
  return methodDisplay;
}

export { ReportMethod };
