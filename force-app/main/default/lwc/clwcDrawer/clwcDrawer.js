import { api, track } from 'lwc';
import { CSSClass, ConfigurableMainComponent, CSSFormatter, SlotComponentMixin } from "c/clwcHelpers";

/**
 * Drawer component that includes a button and a panel that opens if the button is pressed
 * @slot Drawer Content of the Drawer
 */
export default class ClwcDrawer extends SlotComponentMixin(ConfigurableMainComponent) {

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-drawer")
    }

    @api get proxy_className() { return this.className }
    set proxy_className(value) { this.className = value }

    /** @type {string} */
    @api iconColor = "rgb(0,0,0)"
    /** @type {string} */
    @api iconSize = "48px"
    /** @type {string} */
    @api drawerWidth = "300px"
    /** @type {string} */
    @api overlayOpacity = "0.3"
    /** @type {string} */
    @api backgroundColor = "rgb(224, 224, 224)"


    /**
     * Whether the drawer is open
     */
    _drawerOpen = false
    get drawerOpen() { return this._drawerOpen }
    set drawerOpen(value) {
        this._drawerOpen = value
        if (this.isInBuilder) value ? this.addClearBackground() : this.removeClearBackground()
    }

    /**
     * Adds a top margin of 100% to the pages body root element so that the background is clear.
     * In the builder you can't have components overlap each other because their hover events will conflict.
     */
    addClearBackground() {
        const pageBodyRoot = document.getElementsByTagName("webruntime-app")[0].parentNode
        if (pageBodyRoot && pageBodyRoot.classList) pageBodyRoot.classList.add('clwc-drawer-open')
    }

    /**
     * Removes the top margin of the pages body root element
     */
    removeClearBackground() {
        const root = document.getElementsByTagName("webruntime-app")[0].parentNode
        if (root.classList.contains("clwc-drawer-open")) root.classList.remove("clwc-drawer-open")
    }

    /**
     * Getter for all classes that the drawer panel has
     * @returns {string}
     */
    get drawerClass() {
        let cls = `drawer clwc-drawer ${this.className} `
        cls += this.drawerOpen ? "visible " : "hidden "
        return cls
    }

    /**
     * Getter for the styling of the overlay panel
     * @returns {string}
     */
    get overlayStyling() {
        return this.isInBuilder ? CSSFormatter.formatProperties({ opacity: this.overlayOpacity, display: "flex", 'justify-content': "center", 'align-items': 'center' }) : CSSFormatter.formatProperties({ opacity: this.overlayOpacity })
    }

    /**
     * Toggles the drawer
     */
    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen
    }

    /**
     * Returns all classes for the drawer button
     * @returns {string}
     */
    get buttonClass() {
        return "drawer-button slds-button slds-button_icon-border-filled"
    }

    /**
     * Returns overwrite styling for the drawer button
     * @returns {string}
     */
    get iconDivSize() {
        return CSSFormatter.formatProperties({ width: this.iconSize, height: this.iconSize })
    }

    /**
     * Returns formatted css classes to style the drawer
     * @returns {string}
     */
    get drawerStyling() {
        return `${new CSSClass({ 'background-color': this.backgroundColor, width: `${this.drawerWidth} !important` }, ".clwc-drawer").format()}`
    }

    /**
     * Returns overlay text if in the builder
     * @returns {string}
     */
    get overlayText() {
        return this.isInBuilder ? "Editing Drawer. Click here to leave" : ""
    }

    /**
     * @override
     */
    onFirstTimeRender() {
        new CSSClass({ opacity: this.overlayOpacity, width: this.drawerWidth }).validate()
        if (!this.styleElement.exists()) {
            this.styleElement.place(this.drawerStyling)
        }
    }



}