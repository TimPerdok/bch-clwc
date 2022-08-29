import { LightningElement, api, track, wire } from 'lwc';
import { ConfigurableSubComponent } from "c/clwcHelpers";

export default class ClwcTabContent extends ConfigurableSubComponent {

    /** @type {Tab} */
    @api tab
    /**
     * TODO Some rerender problems occured with SLDS's reactivity so here is a workaround
     * @type {boolean}
    */
    @api rerender

    /**
     * Dispatches event to parent component
     * @param {Event} event 
     */
    handleClick(event) {
        this.dispatchEvent(new CustomEvent('tabswitch', { detail: this.tab }))
    }

    /** @constructor */
    constructor() {
        super("c-clwc-tab-button")
    }

    /** @type {string} */
    rootClass = "tab-button"

    /**
     * Changes the root class if a tab is active
     * @override
    */
    onRendered() {
        this.rootClass = `tab-button ${this.tab?.active ? "active-tab-button" : "inactive-tab-button"}`
    }

}