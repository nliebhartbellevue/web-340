/**
 * Title: Exercise 7.2
 * Author: Nathaniel Liebhart
 * Date: September 18, 2019
 * Description: TDD Example
 */

const assert = require("assert");

describe("String#split", () => {
  it("should return an array of fruits", () => {
    assert(Array.isArray("Apple, Orange, Mango".split(",")));
  });
});
