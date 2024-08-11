/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import FilterScraper from "../../../../src/scraper/tools/filter/filter.js";

const check = async (value, filter, expected) => {
    const subScraper = {
        extract(_max) {
            return value;
        },
    };

    const scraper = new FilterScraper({ filter }, [subScraper]);

    const items = await scraper.extract();
    assert.deepEqual(items, expected);
};

describe("scraper/tools/filter/filter.js", function () {
    describe("extract()", function () {
        it("should support no filter", async function () {
            await check(
                [{ foo: "bar" }, { foo: "baz" }, { foo: 42 }],
                undefined,
                [{ foo: "bar" }, { foo: "baz" }, { foo: 42 }],
            );
        });

        it("should support '==' with string", async function () {
            await check(
                [{ foo: "bar" }, { foo: "baz" }, { foo: 42 }],
                "foo == 'bar'",
                [{ foo: "bar" }],
            );
        });

        it("should support '!=' with string", async function () {
            await check(
                [{ foo: "bar" }, { foo: "baz" }, { foo: 42 }],
                "foo != 'bar'",
                [{ foo: "baz" }, { foo: 42 }],
            );
        });

        it("should support '*=' with string", async function () {
            await check(
                [
                    { foo: "bar" },
                    { foo: "42bar" },
                    { foo: "bar42" },
                    { foo: "42bar42" },
                    { foo: "baz" },
                    { foo: 42 },
                ],
                "foo *= 'bar'",
                [
                    { foo: "bar" },
                    { foo: "42bar" },
                    { foo: "bar42" },
                    { foo: "42bar42" },
                ],
            );
        });

        it("should support '^=' with string", async function () {
            await check(
                [
                    { foo: "bar" },
                    { foo: "42bar" },
                    { foo: "bar42" },
                    { foo: "42bar42" },
                    { foo: "baz" },
                    { foo: 42 },
                ],
                "foo ^= 'bar'",
                [{ foo: "bar" }, { foo: "bar42" }],
            );
        });

        it("should support '$=' with string", async function () {
            await check(
                [
                    { foo: "bar" },
                    { foo: "42bar" },
                    { foo: "bar42" },
                    { foo: "42bar42" },
                    { foo: "baz" },
                    { foo: 42 },
                ],
                "foo $= 'bar'",
                [{ foo: "bar" }, { foo: "42bar" }],
            );
        });

        it("should support '==' with number", async function () {
            await check([{ foo: 1 }, { foo: 2 }, { foo: "bar" }], "foo == 1", [
                { foo: 1 },
            ]);
        });

        it("should support '!=' with number", async function () {
            await check([{ foo: 1 }, { foo: 2 }, { foo: "bar" }], "foo != 1", [
                { foo: 2 },
                { foo: "bar" },
            ]);
        });

        it("should support '<' with number", async function () {
            await check(
                [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: "bar" }],
                "foo < 2",
                [{ foo: 1 }],
            );
        });

        it("should support '<=' with number", async function () {
            await check(
                [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: "bar" }],
                "foo <= 2",
                [{ foo: 1 }, { foo: 2 }],
            );
        });

        it("should support '>' with number", async function () {
            await check(
                [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: "bar" }],
                "foo > 2",
                [{ foo: 3 }],
            );
        });

        it("should support '>=' with number", async function () {
            await check(
                [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: "bar" }],
                "foo >= 2",
                [{ foo: 2 }, { foo: 3 }],
            );
        });

        it("should reject invalid filter", async function () {
            await assert.rejects(
                check([{ foo: 1 }], "foo == true", [{ foo: 2 }, { foo: 3 }]),
                { name: "Error", message: 'Invalid filter: "foo == true"' },
            );
        });

        it("should limit items", async function () {
            const subScraper = {
                extract(_max) {
                    return [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: 4 }];
                },
            };
            const filter = "foo > 1";

            const scraper = new FilterScraper({ filter }, [subScraper]);

            const items = await scraper.extract(2);
            assert.deepEqual(items, [{ foo: 2 }, { foo: 3 }]);
        });
    });
});
