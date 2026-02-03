function seedLookupObj(arrayOfObjects, newObjectKey, newObjectValue) {
  const lookupObj = {}; 

  if (arrayOfObjects.length === 0) {
    return lookupObj;
  }
  for (let i = 0; i < arrayOfObjects.length; i++) {
    const keyWeAdding = arrayOfObjects[i][newObjectKey];
    const valWeAdding = arrayOfObjects[i][newObjectValue];
    lookupObj[keyWeAdding] = valWeAdding;
  }
  return lookupObj;
}
module.exports = seedLookupObj;
