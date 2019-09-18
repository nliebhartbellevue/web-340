/**
 * Title: Exercise 7.3
 * Author: Nathaniel Liebhart
 * Date: September 18, 2019
 * Description: Mocha & Chai Example
 */

let fruits = require("../liebhart-fruits");

const chai = require("chai");
const assert = chai.assert;

describe("fruits", () => {
  it("should return an array of fruits", () => {
    let f = fruits("Apple, Orange, Mango");
    assert(Array.isArray(f));
  });
});
