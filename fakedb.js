const debug = require('debug')('FakeDb');
const fs = require('fs');
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// gather the data for the database
// let c = fs.readFileSync('./criteria.json');
// let e = fs.readFileSync('./evaluations.json');
// let ev = fs.readFileSync('./evaluators.json');
// let m = fs.readFileSync('./methods.json');
// let r = fs.readFileSync('./reports.json');
// let ru = fs.readFileSync('./rubrics.json');
// let s = fs.readFileSync('./sources.json');

let criteria = JSON.parse(fs.readFileSync('./data/criteria.json'));
let evaluations = JSON.parse(fs.readFileSync('./data/evaluations.json'));
let evaluators = JSON.parse(fs.readFileSync('./data/evaluators.json'));
let methods = JSON.parse(fs.readFileSync('./data/methods.json'));
let reports = JSON.parse(fs.readFileSync('./data/reports.json'));
let rubrics = JSON.parse(fs.readFileSync('./data/rubrics.json'));
let sources = JSON.parse(fs.readFileSync('./data/sources.json'));

// const citations = require('./citations.json');
// citations are embedded where they are cited


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// getElement looks up an element in a document set using an id
function getFirstElement(doc, id) {
  //console.log('getFirstElement',doc,id);
  if (doc in FakeDb) {
    let candidate = FakeDb[doc].filter(elem => elem.id === id);
    if (candidate.length > 0) {
      return candidate[0];
    } else {
      debug(`ID ${id} not found in document ${doc}`);
      return null;
    }
  } else {
    debug(`Document ${doc} not found in database.`);
    return null;
  }
}

function updateElement(path, value) {

}


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// FakeDb aggregates properties for export
const FakeDb = {
  criteria,
  evaluations,
  evaluators,
  methods,
  reports,
  rubrics,
  sources,
  getFirstElement
}

module.exports = FakeDb;
