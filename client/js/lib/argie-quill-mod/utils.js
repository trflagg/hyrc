export function rangeFromEvent(e, quill) {
  let native;

  if (document.caretRangeFromPoint) {
    native = document.caretRangeFromPoint(e.clientX, e.clientY);
  } else if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(e.clientX, e.clientY);
    native = document.createRange();
    native.setStart(position.offsetNode, position.offset);
    native.setEnd(position.offsetNode, position.offset);
  } else {
    return;
  }
  const normalized = quill.selection.normalizeNative(native);
  return quill.selection.normalizedToRange(normalized);
}

export function idForClassName(className) {
  return `${className}_${nextHighestId(className)}`;
}

export function nextHighestId(className) {
  const blots = Array.from(document.getElementsByClassName(className));
  if (blots.length === 0) {
    return 1;
  }
  return _.max(_.map(blots, blot => (idNum(className, blot.id)))) + 1;
}

export function idNum(className, id) {
  const numInId = new RegExp(`${className}_(\\d+)`);
  const idNum = id.match(numInId);
  if (idNum && idNum.length && idNum.length > 1) {
    return parseInt(idNum[1]) || 0;
  }
  return 0;
}


