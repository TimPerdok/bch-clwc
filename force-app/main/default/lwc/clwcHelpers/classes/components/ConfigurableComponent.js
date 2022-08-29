import { LightningElement, track, api, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { StyleElement } from "../dom/StyleElement";
import { CSSValidator } from "../css/CSSValidator";
import { Config } from "../config/Config";
import { PreviewObserver } from "../observers/PreviewObserver";
import { PageReference, PageReferenceBuilder } from "../PageReference";

/**
 * Configurable Component super class
 * Can be extended by other LWCs to provide functionalities
 */
export class ConfigurableComponent extends LightningElement {
    /**
     * @type {boolean}
     */
    @track firstTimeRender = true

    /**
     * @type {boolean}
     */
    @track firstTimeConnected = true

    /**
     * Instance specific ID
     * @type {string}
     */
    @api id

    /**
     * The tag name of the LWC
     * @example c-clwc-card
     * @type {string}
     */
    @track tag

    /**
     * Class name that is set by a config var
     * @type {string}
     */
    _className
    @api get className() {
        return this._className
    }
    set className(value) {
        this._className = value
    }

    /**
    * A style element that contains a HTML Element that can be placed if needed
    * @type {StyleElement}
    */
    @track styleElement = null

    /**
     * A reference to the HTML element of itself.
     * This is the template as default but can be overriden if DOM context is needed
     * @type {HTMLElement}
     */
    @api element = this.template

    /**
     * Checks if the component is currently running in the experience builder
     * @returns {boolean}
     */
    get isInBuilder() {
        return this.currentPageReference?.state?.view === "editor" && this.currentPageReference?.state?.app === "commeditor";
    }

    /**
     * Whether it's in preview mode or not
     * @type {boolean}
     */
    @track isInPreview = false

    /**
     * An observer that listens to changes in preview mode
     * @type {PreviewObserver}
     */
    previewObserver = null

    /**
     * A reference to the current page
     * @type {PageReference}
     */
    currentPageReference = null

    /**
     * A wire that fetches the current page reference
     */
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        const { type, attributes, state } = currentPageReference;
        this.currentPageReference = new PageReferenceBuilder().setType(type).setAttributes(attributes).setState(state).build()
        this.onCurrentPageReference()
    }

    /**
     * @constructor
     * @param {string} tag
     */
    constructor(tag) {
        super()
        this.id = ""
        this.className = ""
        this.tag = tag
    }


    /**
     * Creates the preview observer, saves it and starts it
     */
    initPreviewObserver() {
        if (!this.isInBuilder) return
        const headerRegionWrapper = document.querySelector("div.webruntimedesign-regionWrapper_regionWrapper.interactions-region.interactions-element")
        this.previewObserver = new PreviewObserver(headerRegionWrapper)
        this.previewObserver.onChange = (toPreview) => {
            this.isInPreview = toPreview
            this.isInPreview ? this.onToPreview() : this.onToBuilder()
        }
        this.previewObserver.start()
    }

    /**
     * Runs when a LW Component starts rendering
     * @override
     */
    renderedCallback() {
        this.onRendered()
        // Return if not first time render
        if (!this.firstTimeRender) return;
        this.firstTimeRender = false;

        // Set id as it's data-component-id
        this.id = this.getAttribute("data-component-id")

        // Creates a global styling element once and places it 
        new StyleElement("style-clwc-global").place(Config.globalStyling)
        // Creates this style element
        this.styleElement = new StyleElement("style-" + this.id)

        // Call child onfirsttimerender
        this.onFirstTimeRender()

        // Add builder/production styling
        const thisElement = this.element
        // Return if not in bulider
        if (this.isInBuilder) {

            this.addBuilderStyling(thisElement)

            // Add preview listener
            this.isInPreview ? this.onToPreview() : this.onToBuilder()
            this.initPreviewObserver()
        } else {
            this.addProductionStyling(thisElement)
        }
        this.onAfterRender()
    }




    /**
      * Runs when a LW Component is connected
      * @override
      */
    connectedCallback() {
        this.onConnected()
        // Return if not first time connected
        if (!this.firstTimeConnected) return;
        this.firstTimeConnected = false
        this.onFirstTimeConnected()
    }

    /**
     * Runs when a LW Component starts rendering
     */
    onRendered() { }
    /**
     * Runs when a LW Component starts connecting
     */
    onConnected() { }
    /**
     * Runs when a LW Component connects for the first time
     */
    onFirstTimeConnected() { }
    /**
     * Runs when a LW Component renders for the first time
     */
    onFirstTimeRender() { }
    /**
     * Runs at the end of the render
     */
    onAfterRender() { }
    /**
     * Can be used to apply specific styling if the component is in production mode
     * @param {HTMLElement} element 
     */
    addProductionStyling(element) { }
    /**
     * Can be used to apply specific styling if the component is in the experience builder
     * @param {HTMLElement} element 
     */
    addBuilderStyling(element) { }

    /**
     * Runs when the currentPageReference wire is called
     */
    onCurrentPageReference() { }

    /**
     * Runs when the component is transitioning to preview mode
     */
    onToPreview() { }
    /**
     * Runs when the component is transitioning to builder mode
     */
    onToBuilder() { }

    /**
     * Finds all properties in this object that are not falsy and returns them as an object.
     * @param {string[]} contains Optional list of property names to include
     * @returns {object}
     */
    getNonEmptyProperties(contains = []) {
        const properties = {}
        Object.entries(this.getProperties(contains)).forEach(
            ([key, value]) => {
                if (value) properties[key] = value
            }
        )
        return properties
    }


    /**
     * Finds all properties in this object that are not falsy and returns them as an object
     * @param {string[]} contains Optional list of property names to include
     * @returns {object}
     */
    getProperties(contains = []) {
        if (typeof contains === "string" || contains instanceof String) contains = [contains];
        let props = {};
        for (let prop in this) {
            if (contains.length > 0 && !contains.every((element) => prop.includes(element))) continue;
            props[prop] = this[prop];
        }
        return props;
    }

    /**
     * Validates every property starting with "style_", combines their promises and returns the combined promise
     * @returns {Promise}
     */
    validateStyleProperties() {
        const promises = []
        Object.entries(this.getFormattedStyleProperties()).forEach(([key, value]) => {
            if (value) promises.push(async (resolve, reject) => { return CSSValidator.validate(key, value) })
        })
        return Promise.all(promises)
    }

    /**
     * Gets all style properties that start with "style_", removes the style prefix (style_), changes underscores (_) to dashes (-), and returns it
     * @example { "style_background_color": "red" } => { "background-color": "red" }
     * @returns {object}
     */
    getFormattedStyleProperties() {
        return Object.fromEntries(Object.entries(this.getNonEmptyProperties("style_")).map(([key, value]) => { return [key.replace("style_", "").replace(/_/g, "-"), value] }))
    }

    /**
     * Filters all empty values of an object and returns it
     * @param {object} props 
     * @returns {object}
     */
    filterEmptyValues(props) {
        return Object.fromEntries(Object.entries(props).filter(([key, value]) => {
            return !!value || value === "0" || value === 0
        }))
    }

}
