/**
 * @module
 */

/**
 * Exécute une fonction sur l'objet et tous les sous-objets.
 *
 * @param {any}      obj Une variable quelconque.
 * @param {Function} fn  La fonction appliquée sur tous les objets.
 * @returns {Promise<any>} Le retour de la méthode.
 */
export const walk = async function (obj, fn) {
    if (Object !== obj?.constructor) {
        return obj;
    }

    return fn(Object.fromEntries(
        await Promise.all(Object.entries(obj).map(async ([key, value]) => [
            key,
            Array.isArray(value)
                ? await Promise.all(value.map((v) => walk(v, fn)))
                : await walk(value, fn),
        ])),
    ));
};

export const query = function (json, chain) {
    const re = /^\.(?<prop>\w+)|^\[(?<index>\d+)\]/u;
    const sub = { json, chain };
    while (0 !== sub.chain.length) {
        const result = re.exec(sub.chain);
        if (undefined !== result?.groups.prop) {
            sub.json = sub.json[result.groups.prop];
        // eslint-disable-next-line no-negated-condition
        } else if (undefined !== result?.groups.index) {
            sub.json = sub.json[result.groups.index];
        } else {
            throw new Error(`Invalid chain: ${chain}`);
        }
        sub.chain = sub.chain.slice(result[0].length);
    }
    return sub.json;
};

/**
 * Fusionne deux objets.
 *
 * @param {any} first  Le premier objet.
 * @param {any} second Le second objet.
 * @returns {any} La fusion des deux objets.
 */
export const merge = function (first, second) {
    if (Object !== first?.constructor || Object !== second?.constructor) {
        return second;
    }

    const third = {};
    for (const key of new Set([...Object.keys(first),
                               ...Object.keys(second)])) {
        // Ne pas copier les surcharges d'éléments.
        if (key.startsWith("$")) {
            continue;
        }

        // Si la propriété est dans les deux objets : fusionner les deux
        // valeurs.
        if (key in first && key in second) {
            third[key] = merge(first[key], second[key]);
        // Si la propriété est seulement dans le premier objet.
        } else if (key in first) {
            third[key] = first[key];
        // Si la propriété est seulement dans le second objet.
        } else {
            third[key] = second[key];
        }

        // Si la valeur est un tableau : chercher si le second objet a des
        // surcharges d'éléments.
        if (Array.isArray(third[key])) {
            const overelemRegex = new RegExp(`^\\$${key}\\[(?<index>\\d+)\\]$`,
                                             "u");
            const overelems =
                Object.entries(second)
                      .map(([k, v]) => [overelemRegex.exec(k)?.groups.index, v])
                      .filter(([i]) => undefined !== i);
            for (const [index, value] of overelems) {
                third[key][Number.parseInt(index, 10)] = value;
            }
        }
    }
    return third;
};

const inherit = async function (obj) {
    const parents = [];
    if (undefined !== obj.$extends) {
        if (Array.isArray(obj.$extends)) {
            // eslint-disable-next-line no-use-before-define
            parents.concat(await Promise.all(obj.$extends.map(load)));
        } else {
            // eslint-disable-next-line no-use-before-define
            parents.push(await load(obj.$extends));
        }
    }
    parents.push(obj);

    return parents.reduce(merge);
};

export const load = async function (url) {
    const response = await fetch(url);
    const json = await response.json();
    return walk(query(json, new URL(url).hash.replace(/^#/u, ".")),
                inherit);
};

export const parse = function (text) {
    return walk(JSON.parse(text), inherit);
};
