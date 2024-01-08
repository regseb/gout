/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Envoie les options à tous les scrapers.
 *
 * @param {any} options Les options des scrapers.
 * @returns {Object} Une simulation d'un tableau dont la méthode
 *                   <code>pop()</code> retourne toujours les options.
 */
const DEFAULT_DISPATCH = (options) => ({ pop: () => options });

/**
 * Chaine des scrapers pour combiner leurs fonctionnalités.
 *
 * @param {Function}             FirstScraper Le premier scraper.
 * @param {...(Function|Object)} others       Les autres scrapers et/ou les
 *                                            options.
 */
export default function chain(FirstScraper, ...others) {
    const AllScraperss = [];
    let dispatch = DEFAULT_DISPATCH;
    for (const other of others) {
        if ("function" === typeof other) {
            AllScraperss.unshift([other]);
        } else if (Array.isArray(other)) {
            AllScraperss.unshift(other.reverse());
        } else {
            dispatch = other.dispatch;
        }
    }

    return class ChainScraper {
        constructor(options, scrapers) {
            const allOptions = dispatch(options);
            const subScrapers = AllScraperss.reduce(
                (dependancies, Scrapers) => {
                    return Scrapers.map(
                        (S) => new S(allOptions.pop(), dependancies),
                    );
                },
                scrapers,
            );
            // eslint-disable-next-line no-constructor-return
            return new FirstScraper(allOptions.pop(), subScrapers);
        }
    };
}
