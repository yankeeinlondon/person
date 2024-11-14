import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { tokenize } from "../src/utils/tokenize";

describe("tokenize a string", () => {
  it("happy path", () => {
    const t1 = tokenize("foo bar ./path/to/somewhere !");
    expect(t1).toEqual(["foo", "bar", "./path/to/somewhere", "!"]);
  });
});
