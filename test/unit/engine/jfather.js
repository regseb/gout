/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as jfather from "../../../src/engine/jfather.js";

describe("engine/jfather.js", function () {
    describe("walkAsync()", function () {
        it("should apply on object", async function () {
            const obj = { foo: "bar" };
            const result = await jfather.walkAsync(obj, (o) =>
                Promise.resolve({ ...o, baz: 42 }),
            );
            assert.deepEqual(result, { foo: "bar", baz: 42 });
            // Vérifier que l'objet d'entrée n'a pas été modifié.
            assert.deepEqual(obj, { foo: "bar" });
        });

        it("should apply on all elements of array", async function () {
            const obj = [{ foo: "bar" }, { baz: "qux", quux: "corge" }];
            const result = await jfather.walkAsync(obj, (o) =>
                Promise.resolve(Object.keys(o)),
            );
            assert.deepEqual(result, [["foo"], ["baz", "quux"]]);
            // Vérifier que l'objet d'entrée n'a pas été modifié.
            assert.deepEqual(obj, [
                { foo: "bar" },
                { baz: "qux", quux: "corge" },
            ]);
        });

        it("should ignore others types", async function () {
            const obj = "foo";
            const result = await jfather.walkAsync("foo", () =>
                Promise.resolve(42),
            );
            assert.deepEqual(result, "foo");
            // Vérifier que l'objet d'entrée n'a pas été modifié.
            assert.deepEqual(obj, "foo");
        });

        it("should apply on sub-object", async function () {
            const obj = { foo: { bar: "baz" } };
            const result = await jfather.walkAsync(obj, (o) =>
                Promise.resolve({ ...o, qux: 42 }),
            );
            assert.deepEqual(result, { foo: { bar: "baz", qux: 42 }, qux: 42 });
            // Vérifier que l'objet d'entrée n'a pas été modifié.
            assert.deepEqual(obj, { foo: { bar: "baz" } });
        });

        it("should apply on all elements of array of array", async function () {
            const obj = [[{ foo: "bar" }], { baz: ["qux"], quux: "corge" }];
            const result = await jfather.walkAsync(obj, (o) =>
                Promise.resolve(Object.values(o)),
            );
            assert.deepEqual(result, [[["bar"]], [["qux"], "corge"]]);
            // Vérifier que l'objet d'entrée n'a pas été modifié.
            assert.deepEqual(obj, [
                [{ foo: "bar" }],
                { baz: ["qux"], quux: "corge" },
            ]);
        });
    });

    describe("query()", function () {
        it("should get by property name", function () {
            const result = jfather.query({ foo: "bar" }, ".foo");
            assert.deepEqual(result, "bar");
        });

        it("should get by index", function () {
            const result = jfather.query(["foo", "bar"], "[1]");
            assert.deepEqual(result, "bar");
        });

        it("should get by property name and index", function () {
            const result = jfather.query({ foo: ["bar", "baz"] }, ".foo[1]");
            assert.deepEqual(result, "baz");
        });

        it("should get by sub-property name", function () {
            const result = jfather.query({ foo: { bar: "baz" } }, ".foo.bar");
            assert.deepEqual(result, "baz");
        });

        it("should get reject invalid chain", function () {
            assert.throws(
                () => jfather.query({ foo: { bar: "baz" } }, ".qux.quux"),
                {
                    name: "TypeError",
                    message:
                        "Cannot read properties of undefined (reading 'quux')",
                },
            );
        });

        it("should get reject unsupported chain", function () {
            assert.throws(() => jfather.query({ foo: "bar" }, ".?foo"), {
                name: "TypeError",
                message: "Invalid chain: .?foo",
            });
        });
    });

    describe("merge()", function () {
        it("should return second when first isn't object", function () {
            const overrode = jfather.merge("foo", { bar: "baz" });
            assert.deepEqual(overrode, { bar: "baz" });
        });

        it("should return second when second isn't object", function () {
            const overrode = jfather.merge({ foo: "bar" }, "baz");
            assert.equal(overrode, "baz");
        });

        it("should return second when both aren't object", function () {
            const overrode = jfather.merge("foo", "bar");
            assert.equal(overrode, "bar");
        });

        it("should merge two objects", function () {
            const overrode = jfather.merge(
                { foo: "bar", baz: "qux" },
                { foo: "quux", corge: "grault" },
            );
            assert.deepEqual(overrode, {
                foo: "quux",
                baz: "qux",
                corge: "grault",
            });
        });

        it("should override", function () {
            const overrode = jfather.merge(
                { foo: ["bar", "baz"] },
                { "$foo[0]": "qux", "$foo[]": "quux" },
            );
            assert.deepEqual(overrode, { foo: ["qux", "baz", "quux"] });
        });

        it("should override in sub-object", function () {
            const overrode = jfather.merge(
                { foo: ["bar", "baz"], qux: { quux: ["corge", "grault"] } },
                {
                    "$foo[0]": "garply",
                    "$foo[]": "waldo",
                    qux: { fred: "plugh", "$quux[1]": "xyzzy" },
                },
            );
            assert.deepEqual(overrode, {
                foo: ["garply", "baz", "waldo"],
                qux: { quux: ["corge", "xyzzy"], fred: "plugh" },
            });
        });

        it("should override in depth", function () {
            const overrode = jfather.merge(
                { foo: [{ bar: "baz" }, { qux: "quux" }, "corge"] },
                {
                    "$foo[0]": "grault",
                    "$foo[1]": { garply: "waldo" },
                    "$foo[2]": { fred: "plugh" },
                },
            );
            assert.deepEqual(overrode, {
                foo: [
                    "grault",
                    { qux: "quux", garply: "waldo" },
                    { fred: "plugh" },
                ],
            });
        });
    });
});
