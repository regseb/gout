/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/* eslint-disable max-classes-per-file */

import htm from "https://esm.sh/htm@3.1.1";
import { Component, h, render } from "https://esm.sh/preact@10.22.0";

// Initialize htm with Preact
const html = htm.bind(h);

const App = class extends Component {
    // Add `name` to the initial state
    state = { value: "", name: "world" };

    onInput = (ev) => {
        this.setState({ value: ev.currentTarget.value });
    };

    // Add a submit handler that updates the `name` with the latest input value
    onSubmit = (ev) => {
        // Prevent default browser behavior (aka don't submit the form here)
        ev.preventDefault();

        this.setState({ name: this.state.value });
    };

    render() {
        return html`
            <div>
                <h1>Hello, ${this.state.name}!</h1>
                <form onSubmit=${this.onSubmit}>
                    <input
                        type="text"
                        value=${this.state.value}
                        onInput=${this.onInput}
                    />
                    <button type="submit">Update</button>
                </form>
            </div>
        `;
    }
};

export default class HelloWorldModule extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open" });

        render(html`<${App} />`, this.shadowRoot);
    }
}
