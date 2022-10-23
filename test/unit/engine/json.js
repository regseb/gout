import assert from "node:assert";
import * as json from "../../../src/engine/json.js";

describe("engine/json.js", function () {
    describe("walk()", function () {
        it("should support non-object", async function () {
            const obj = await json.walk("foo", () => "bar");
            assert.deepStrictEqual(obj, "foo");
        });

        it("should support object", async function () {
            const obj = await json.walk({ foo: "bar" },
                                        (o) => ({ ...o, baz: "qux" }));
            assert.deepStrictEqual(obj, { foo: "bar", baz: "qux" });
        });

        it("should support sub-object", async function () {
            const obj = await json.walk({ foo: { bar: "baz" } },
                                        (o) => ({ ...o, qux: "quux" }));
            assert.deepStrictEqual(obj, {
                foo: { bar: "baz", qux: "quux" },
                qux: "quux",
            });
        });

        it("should support array", async function () {
            const obj = await json.walk(
                { foo: [{ bar: "baz" }, { qux: "quux" }] },
                (o) => ({ ...o, corge: "grault" }),
            );
            assert.deepStrictEqual(obj, {
                foo: [{
                    bar: "baz", corge: "grault",
                }, {
                    qux: "quux", corge: "grault",
                }],
                corge: "grault",
            });
        });

    });

    describe("query()", function () {
        it("should support empty chain", function () {
            const sub = json.query({ foo: "bar" }, "");
            assert.deepStrictEqual(sub, { foo: "bar" });
        });

        it("should return first level", function () {
            const sub = json.query({ foo: "bar" }, ".foo");
            assert.deepStrictEqual(sub, "bar");
        });

        it("should return sub-level", function () {
            const sub = json.query({ foo: { bar: { baz: "qux" } } },
                                   ".foo.bar.baz");
            assert.deepStrictEqual(sub, "qux");
        });

        it("should support array", function () {
            const sub = json.query({ foo: ["bar", "baz"] }, ".foo[1]");
            assert.deepStrictEqual(sub, "baz");
        });

        it("should support array of array", function () {
            const sub = json.query({ foo: [["bar"], ["baz"]] }, ".foo[1][0]");
            assert.deepStrictEqual(sub, "baz");
        });

        it("should reject", function () {
            assert.throws(() => json.query({ foo: "bar" }, "#baz"),
                          { name: "Error", message: "Invalid chain: #baz" });
        });
    });
});
