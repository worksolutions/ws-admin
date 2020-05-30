import { excludeFromObject } from "../index";

test("exclude from object", () => {
  expect(excludeFromObject({ name: "1", value: 2 }, ["name"])).toEqual({
    value: 2,
  });
});
