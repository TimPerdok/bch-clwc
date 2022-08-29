import { LightningElement, api, track, wire } from 'lwc';
import { ConfigurableSubComponent, SlotComponentMixin } from "c/clwcHelpers";

export default class ClwcTabContent extends SlotComponentMixin(ConfigurableSubComponent) {

    /** @type {Tab} */
    @api tab
    /** @type {boolean} */
    @api rerender

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-tab-content")
    }

    /** @type {string} */
    rootClass = "clwc-hidden"

    /**
     * Changes the root class if a tab is active
     * @override
     */
    onRendered() {
        this.rootClass = `tab-content ${this.tab?.active ? "active" : "clwc-hidden"}`
    }

}