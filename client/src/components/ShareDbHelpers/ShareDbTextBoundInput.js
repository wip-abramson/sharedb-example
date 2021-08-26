import React from 'react'
const Debug = require('debug');
const debug = require('debug')('ShareDbTextBoundInput');
const ShareDbTextBoundInput = ({inputValue, shareDbDocument, documentPath}) => {


  function deleteOperation(offset, text) {
    let opPath = documentPath.concat(offset)
    let deleteStrOp = {p: opPath, sd: text};

    submitOp(deleteStrOp)
  }

  function insertOperation(offset, text) {
    let opPath = documentPath.concat(offset)
    let insertStrOp = {p: opPath, si: text};

    submitOp(insertStrOp)
  }

  function submitOp(op) {
    shareDbDocument.submitOp(op, {}, (err) => {
      if (err) console.log(err)
      debug("Op Submitted", op)

    });
  }

  function handleDelete(event) {
    event.preventDefault()
    let charCode = event.which || event.charCode || event.keyCode || 0;

    let selectionStart = event.target.selectionStart
    let selectionEnd = event.target.selectionEnd

    let delString = ""
    let offset;
    if (selectionStart - selectionEnd === 0) {
      if (charCode === 46) {
        offset = selectionEnd
        delString = inputValue.substring(selectionEnd, selectionEnd + 1)
      } else if (charCode === 8) {
        offset = selectionStart - 1
        delString = inputValue.substring(selectionStart - 1, selectionStart)
      }
    } else {
      offset = selectionStart;
      delString = inputValue.substring(selectionStart, selectionEnd)
    }
    deleteOperation(offset, delString)

  }

  function handleKeyPress(event) {

    let selectionStart = event.target.selectionStart
    let selectionEnd = event.target.selectionEnd
    let charCode = event.which || event.charCode || event.keyCode || 0;

    let char = String.fromCharCode(charCode)
    if (selectionStart - selectionEnd === 0) {

      // TODO do we need to determine which chars/keyCodes are ignored

      debug("Insert : " + char + " index " + event.target.selectionStart)

      insertOperation(event.target.selectionStart, char)

    } else {

      let delString = inputValue.substring(selectionStart, selectionEnd)
      // let documentPath = ['responses', columnRef, selectionStart]
      deleteOperation(selectionStart, delString)

      insertOperation(selectionStart, char)

    }

  }


  return (
    <input value={inputValue}
           onChange={(event) => {}}
           onKeyDown={(event) => {
             let charCode = event.which || event.charCode || event.keyCode || 0;
             if (charCode === 46 || charCode === 8) {
               handleDelete(event)
             }
           }} onKeyPress={(event) => {
      handleKeyPress(event)

    }}/>
  )

}

export default ShareDbTextBoundInput
