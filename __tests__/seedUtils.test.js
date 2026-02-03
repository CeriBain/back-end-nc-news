const seedLookupObj = require("../db/seeds/seedUtils");

describe("seedLookupObj", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(seedLookupObj([], "hello", "hi")).toEqual({});
  });
  test("returns an object with a single key:value pair when passed an array of multiple", () => {
    const testInput = [{ name: "Ceri", age: 28 }];
    const expectedOutput = { Ceri: 28 };
    expect(seedLookupObj(testInput, "name", "age")).toEqual(expectedOutput);
  });
  test("returns an object with multiple key:value pairs when passed an array containing multiple objects", () => {
    const testInput = [
      { name: "Ceri", age: 28 },
      { name: "John", age: 43 },
    ];
    const expectedOutput = { Ceri: 28, John: 43 };
    expect(seedLookupObj(testInput, "name", "age")).toEqual(expectedOutput);
  });
  test("if it mutates the original array", () => {
    const testArray = [1, 2, 3, 4, 5];
    const copyTestArray = [1, 2, 3, 4, 5];
    expect(testArray).toEqual(copyTestArray);
  });
});
