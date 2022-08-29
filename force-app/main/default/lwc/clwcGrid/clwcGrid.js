import { api } from "lwc";
import { ConfigurableMainComponent, SlotComponentMixin, CSSClass } from "c/clwcHelpers";


/**
* @slot Grid Content of the grid
*/
export default class ClwcGrid extends SlotComponentMixin(ConfigurableMainComponent) {

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-grid")
    }

    _wrap = false;
    @api get wrap() { return this._wrap ? "slds-wrap " : ""; }
    set wrap(wrap) { this._wrap = wrap; }


    _align = "";
    /**
     * Returns a SLDS class corresponding with the chosen alignment in the dropdown
     * @returns {string}
     */
    @api get align() { return { "Center": "slds-grid_align-center ", "Right": "slds-grid_align-end ", "Left": "slds-grid_align-start", "Space around": "slds-grid_align-space", "Spread around": "slds-grid_align_spread" }[this._align] }
    set align(align) { this._align = align; }

    @api rowGap
    @api columnGap
    /**
     * Formats rowGap and columnGap to a CSS value
     * @returns {string}
     */
    get gap() { return `${this.rowGap ?? "0px"} ${this.columnGap ?? "0px"}` }

    /**
     * Returns all the classes the flex parent should have
     * @returns {string}
     */
    get flexParentClass() {
        let cls = "clwc-grid-root slds-grid clwc-grid-gap ";
        cls += this.wrap;
        cls += this.align;
        if (this.isInBuilder) cls += " clwc-builder-mode "
        return cls;
    }

    /**
     * Returns the regionWrapper div if in the builder, which is the <div webruntimedesign-regionWrapper>
     * And if in production it returns the components own element.
     * @returns {HTMLElement} <div webruntimedesign-regionWrapper> | <c-clwc-grid>
     */
    get flexParent() {
        if (this.isInBuilder) return this.firstSlot.assignedNodes()[0].firstChild // <div webruntimedesign-regionWrapper>
        return this.element
    }

    /**
     * Adds experience builder specific styling
     * @override
     * @param {HTMLElement} thisElement
     */
    addBuilderStyling(thisElement) {
        this.styleElement.place(new CSSClass({ gap: this.gap }, `.clwc-grid-gap[data-item-id="${this.flexParent.getAttribute("data-item-id")}"]`).format())
        this.flexParent.classList += ` ${this.flexParentClass} `
    }

    /**
     * Adds styling to the components production version
     * @override
     * @param {HTMLElement} self 
     */
    addProductionStyling(self) {
        this.styleElement.place(new CSSClass({ gap: this.gap }, `.clwc-grid-gap[data-component-id="${this.flexParent.getAttribute("data-component-id")}"]`).format())
        self.classList = ` ${this.flexParentClass} `
    }

    /**
     * Removes borders to the flexparent
     * @override
     */
    onToPreview() {
        this.flexParent?.classList?.remove("clwc-builder-outline-on")
    }
    /**
     * Adds borders to the flexparent
     * @override
     */
    onToBuilder() {
        this.flexParent?.classList?.add("clwc-builder-outline-on")
    }

}
