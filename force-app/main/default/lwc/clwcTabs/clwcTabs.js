import { api, track } from 'lwc';
import { ConfigurableMainComponent, Tab, CSSClass } from "c/clwcHelpers";

/**
 * @slot tab1
 * @slot tab2
 * @slot tab3
 * @slot tab4
 * @slot tab5
 * @slot tab6
 * @slot tab7
 * @slot tab8
 */
export default class ClwcTabs extends ConfigurableMainComponent {

    /** @type {string} */
    @api activeColor
    /** @type {string} */
    @api inactiveColor
    /** @type {string} */
    @api backgroundColor
    /** @type {string} */
    @api borderColor
    /** @type {string} */
    @api buttonGap

    /** @type {string} */
    @api tabName_1
    /** @type {string} */
    @api tabName_2
    /** @type {string} */
    @api tabName_3
    /** @type {string} */
    @api tabName_4
    /** @type {string} */
    @api tabName_5
    /** @type {string} */
    @api tabName_6
    /** @type {string} */
    @api tabName_7
    /** @type {string} */
    @api tabName_8

    /** @type {Tab[]} */
    @track tabs = []

    /** @type {boolean} */
    @api rerender = false

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-tabs");
    }

    /**
     * Get a list of all tab names
     * @returns {string[]}
     */
    get tabNames() {
        return Object.values(this.getProperties("tabName")) ?? []
    }

    /** @type {number} */
    nextTabIndex = 0
    /**
     * Iterates over all tabs and returns the next. If it has reached the last, reset the index of the next to 0 so it loops
     * @returns {Tab}
     */
    get nextTab() {
        const tab = this.tabs[this.nextTabIndex] ?? null
        this.nextTabIndex++
        if (this.nextTabIndex >= this.tabNames.length) this.nextTabIndex = 0
        return tab
    }

    /**
     * @returns {Tab | null}
     */
    get peekNextTab() {
        return this.tabs[this.nextTabIndex] ?? null
    }

    /**
     * @returns {boolean}
     */
    get hasNextTab() {
        return !!this.tabs[this.nextTabIndex]
    }

    /**
     * Sets all tabs to inactive except the clicked tab
     * @param {Event} event 
     */
    handleClick(event) {
        const tabIndex = event.detail.index;
        this.tabs.forEach(tab => {
            tab.active = tab.index == tabIndex
        })
        this.rerenderChildren()
    }

    /**
     * The children won't rerender by updating their tab component for some reason. So we have to rerender them manually
     */
    rerenderChildren() {
        this.rerender = !this.rerender
    }

    /**
     * Returns the styling for the component
     * @returns {string}
     */
    get styling() {
        const borderStyling = `1px solid ${this.borderColor}`
        return `
        ${new CSSClass({ 'background-color': this.backgroundColor }, `c-clwc-tabs[data-component-id="${this.id}"] > .root > .body`).format()}
        ${new CSSClass({ 'border-bottom': borderStyling }, `c-clwc-tabs[data-component-id="${this.id}"] > .root > .head > .border-proxy`).format()}
        ${new CSSClass({ 'gap': this.buttonGap }, `c-clwc-tabs[data-component-id="${this.id}"] > .root > .head > .button-container`).format()}
        ${new CSSClass({ 'background-color': this.backgroundColor }, `c-clwc-tabs[data-component-id="${this.id}"] .tab-button`).format()}
        ${new CSSClass({ color: this.inactiveColor, 'border-bottom': borderStyling }, `c-clwc-tabs[data-component-id="${this.id}"] .inactive-tab-button`).format()}
        ${new CSSClass({ color: this.activeColor, 'border-top': borderStyling, 'border-right': borderStyling, 'border-left': borderStyling }, `c-clwc-tabs[data-component-id="${this.id}"] .active-tab-button`).format()}
        `
    }

    /**
     * Adds a single empty tab if no tab names are filled in
     * @override
     */
    onFirstTimeConnected() {
        this.tabNames.forEach((tabName, index) => {
            if (tabName) this.tabs.push(new Tab(tabName, index))
        })
        if (!this.tabs[0]) this.tabs.push(new Tab(this.tabName_1, 0))
        this.tabs[0].active = true
    }

    /**
     * Places the style element
     * @override
     */
    onFirstTimeRender() {
        this.styleElement.place(this.styling)
    }

}