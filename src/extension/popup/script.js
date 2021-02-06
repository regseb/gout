/**
 * @module
 */

const add = async function () {
    // Récupérer l'URL de l'onglet courant.
    const tab = await browser.tabs.query({
        active:        true,
        currentWindow: true,
    });

    const list = document.querySelector("#list");
    const edit = document.querySelector("#edit");

    edit.querySelector(`input[name="index"]`).value = "";
    edit.querySelector(`input[name="title"]`).value = tab[0].title;
    edit.querySelector(`input[name="link"]`).value = tab[0].url;

    list.hidden = true;
    edit.hidden = false;
};

const update = function (event) {
    const li = event.target.closest("li");
    const link = li.querySelector("a").href;
    const title = li.querySelector("a").textContent;

    const list = document.querySelector("#list");
    const edit = document.querySelector("#edit");

    edit.querySelector(`input[name="index"]`).value = li.dataset.index;
    edit.querySelector(`input[name="title"]`).value = title;
    edit.querySelector(`input[name="link"]`).value = link;

    list.hidden = true;
    edit.hidden = false;
};

const show = async function () {
    const list = document.querySelector("#list");
    const edit = document.querySelector("#edit");

    const ul = document.querySelector("ul");
    while (null !== ul.firstChild) {
        ul.firstChild.remove();
    }

    const dashboards = (await browser.storage.sync.get("dashboards"))
                                                  .dashboards;
    for (const [index, dashboard] of dashboards.entries()) {
        const template = document.querySelector("template");
        const clone = document.importNode(template.content, true);

        clone.querySelector("li").dataset.index = index;
        clone.querySelector("a").textContent = dashboard.title;
        clone.querySelector("a").href = dashboard.link;
        if (dashboard.link.startsWith("file:")) {
            clone.querySelector("a").style.cursor = "not-allowed";
            clone.querySelector("a").title = "Impossible d'ouvrir directement" +
                                             " le lien. Il faut le" +
                                             " copier-coler manuellement.";
        } else {
            clone.querySelector("a").addEventListener("click", window.close);
        }
        clone.querySelector("button").addEventListener("click", update);

        ul.append(clone);
    }

    edit.hidden = true;
    list.hidden = false;
};

const save = async function () {
    const list = document.querySelector("#list");
    const edit = document.querySelector("#edit");

    const index = Number.parseInt(edit.querySelector(`input[name="index"]`)
                                      .value, 10);
    const title = edit.querySelector(`input[name="title"]`).value;
    const link = edit.querySelector(`input[name="link"]`).value;

    const dashboards = (await browser.storage.sync.get("dashboards"))
                                                  .dashboards;
    if (Number.isNaN(index)) {
        dashboards.push({ title, link });
    } else {
        dashboards[index] = { title, link };
    }
    await browser.storage.sync.set({ dashboards });

    await show();

    edit.hidden = true;
    list.hidden = false;
};

const remove = async function () {
    const list = document.querySelector("#list");
    const edit = document.querySelector("#edit");

    const index = Number.parseInt(edit.querySelector(`input[name="index"]`)
                                      .value, 10);

    const dashboards = (await browser.storage.sync.get("dashboards"))
                                                  .dashboards;
    dashboards.splice(index, 1);
    await browser.storage.sync.set({ dashboards });

    await show();

    edit.hidden = true;
    list.hidden = false;
};


document.querySelector("#add").addEventListener("click", add);
document.querySelector("#remove").addEventListener("click", remove);
document.querySelector("#save").addEventListener("click", save);
show();
