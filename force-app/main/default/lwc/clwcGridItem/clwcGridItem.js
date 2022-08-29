import { api } from 'lwc';
import { ConfigurableMainComponent, SlotComponentMixin, CSSClass, DOMSearcher } from "c/clwcHelpers";

/**
* Grid Items can be dragged into a grid and can be configured for creating layouts
* @slot Grid_item Content of the grid item
*/
export default class ClwcGridItem extends SlotComponentMixin(ConfigurableMainComponent) {

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-grid-item")
    }

    @api get proxy_className() { return this.className }
    set proxy_className(value) { this.className = value }

    /** @type {boolean} */
    @api fullWidth

    // Desktop:
    _span = ""
    /** @type {string} */
    @api get span() {
        if (!this._span) return ""
        return `slds-size_${this._span}-of-12 `
    }
    set span(value) { this._span = value; }

    /** @type {string} */
    @api width = ""
    /** @type {string} */
    @api height = ""


    // Tablet:
    _tabletSpan
    /** @type {string} */
    @api get tabletSpan() {
        if (!this._tabletSpan) return ""
        return `slds-max-medium-size_${this._tabletSpan}-of-12 `
    }
    set tabletSpan(value) { this._tabletSpan = value }

    /** @type {string} */
    @api tabletWidth = ""
    /** @type {string} */
    @api tabletHeight = ""

    // Mobile:
    _mobileSpan
    /** @type {string} */
    @api get mobileSpan() {
        if (!this._mobileSpan) return ""
        return `slds-max-small-size_${this._mobileSpan}-of-12 `
    }
    set mobileSpan(value) { this._mobileSpan = value }

    /** @type {string} */
    @api mobileWidth = ""
    /** @type {string} */
    @api mobileHeight = ""

    // Gutters
    /** @type {string} */
    @api gutters

    // Margins
    @api topMargin = ""
    @api bottomMargin = ""

    // Alignment
    _horizontalAlign = "Center"
    /**
     * Formats the selected dropdown value to a CSS value
     * @returns {string}
     */
    @api get horizontalAlign() {
        const options = { "Left": "flex-start", "Center": "center", "Right": "flex-end" }
        return options[this._horizontalAlign] ?? ""
    }
    set horizontalAlign(value) { this._horizontalAlign = value; }

    _verticalAlign = "Top"
    @api get verticalAlign() {
        const options = { "Top": "flex-start", "Center": "center", "Bottom": "flex-end" }
        return options[this._verticalAlign] ?? ""
    }
    set verticalAlign(value) { this._verticalAlign = value; }

    /**
     * @override
     * @param {HTMLElement} thisElement
     */
    addProductionStyling(thisElement) {
        thisElement.classList += " display-contents "
    }

    /**
     * @override
     * @param {HTMLElement} thisElement
     */
    addBuilderStyling(thisElement) {
        const slotChild = this.firstSlot.assignedNodes()[0]
        let cls = " clwc-grid-item-slot-child "
        if (this.fullWidth) cls += "clwc-full-width "
        slotChild.classList += cls

        this.initSlotObserver(this.firstSlot)
    }

    /**
    * Getter for the component's flexbox parent.
    * In the experience builder this is for it's interactions-component and for live it's the root div.
    * @returns {string}
    */
    get flexParentClass() {
        return ` slds-col ${this.span} ${this.tabletSpan} ${this.mobileSpan} ${this.className} `
    }

    /**
     * Getter for the root class of the grid item
     * @returns {string}
    */
    get rootClass() {
        let cls = "clwc-grid-item-root "
        if (!this.isInBuilder) cls += this.flexParentClass
        return cls
    }

    /**
     * @override
     */
    addActualNodeStyling(actualNode) { actualNode.classList.add("clwc-full-height") }
    /**
     * @override
     */
    addInteractionsComponentStyling(interactionsComponent) {
        interactionsComponent.classList += this.flexParentClass + "clwc-builder-mode  " // In the builder, this is the flexbox parent
    }
    /**
     * @override
     */
    addComponentWrapperStyling(componentWrapper) {
        componentWrapper.classList.add("display-contents") // Passes child upwards for flexbox
    }
    /**
     * @override
     */
    addDropRegionStyling(dropRegion) {
        dropRegion.classList.add("display-contents") // Passes child upwards for flexbox
    }
    /**
     * @override
     */
    addDropZoneStyling(dropZone) {
        dropZone.classList.add("display-contents")  // Passes child upwards for flexbox
    }
    /**
     * @override
     */
    addRegionWrapperStyling(regionWrapper) {
    }

    /**
     * Getter for the css class for this components root styling
     * If the component is in the builder, don't apply width and height here but somewhere else.
     * @returns {string}
     */
    get rootStyling() {
        let props = { height: '100%', display: "flex", "flex-direction": "column", "align-items": this.horizontalAlign, "justify-content": this.verticalAlign, "margin-top": this.topMargin, "margin-bottom": this.bottomMargin }
        if (!this.isInBuilder) props = { ...props, ...{ width: this.width, 'max-width': this.width, height: this.height } } // The width/height should be set elsewhere in the builder
        return new CSSClass(this.filterEmptyValues(props), `c-clwc-grid-item[data-component-id="${this.id}"]>.clwc-grid-item-root`).format()
    }

    /**
     * Getter for the css class for the interactions components styling.
     * Width and height must be applied here if in the builder for correct layouts.
     * If the slot is empty, height must not be set or the drop zone will be inaccessible.
     * @returns {string}
     */
    get sizeStyling() {
        const id = DOMSearcher.getParentRecursive(this.element, 3).getAttribute("data-item-id")
        if (!id) return ""
        return `${new CSSClass({ "max-width": this.width, width: this.width, height: this.isInPreview ? this.height : undefined, 'min-height': '0px !important' }, `div.interactions-component[data-item-id="${id}"]`).format()}
        ${new CSSClass({ "max-width": this.tabletWidth, width: this.tabletWidth, height: this.isInPreview ? this.tabletHeight : undefined, 'min-height': '0px !important' }, `div.interactions-component[data-item-id="${id}"]`).format(true, "768px")}
        ${new CSSClass({ "max-width": this.mobileWidth, width: this.mobileWidth, height: this.isInPreview ?  this.mobileHeight : undefined, 'min-height': '0px !important' }, `div.interactions-component[data-item-id="${id}"]`).format(true, "600px")}`
    }

    /**
     * Getter for the body of the style element that contains the component's specific styling
     * @returns {string}
     */
    get styling() {
        return `${this.rootStyling} ${this.isInBuilder ? this.sizeStyling : ""} `
    }

    /**
     * Places the style element if it doesn't exist. Else it updates the style element.
     */
    updateStyleElement() {
        this.styleElement.place(this.styling)
    }

    /**
     * @override
     */
    onFirstTimeRender() {
        this.updateStyleElement()
    }

    /**
     * @override
     */
    onToPreview() {
        this.template.firstChild?.classList?.remove("clwc-builder-outline-on")
        this.updateStyleElement()
    }

    /**
     * @override
     */
    onToBuilder() {
        this.template.firstChild?.classList?.add("clwc-builder-outline-on")
        this.updateStyleElement()
    }

    /**
     * If an item is added to the slot, then check if fullWidth is set to remove the full-width class
     * @override
     * @param {HTMLElement} componentWrapper 
     */
    onItemAdded(componentWrapper) {
        if (!this.fullWidth) this.firstSlot.assignedNodes()[0].classList.remove("clwc-full-width")
    }

    

    /**
     * If the slot is empty then it should be always be at full width.
     * @override
     * @param {HTMLElement} componentWrapper
     */
    onItemRemoved(componentWrapper) {
        if (this.slotHasContent(this.firstSlot)) return
        this.firstSlot.assignedNodes()[0].classList.add("clwc-full-width")
    }


}