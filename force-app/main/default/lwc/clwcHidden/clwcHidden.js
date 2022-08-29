import { api } from 'lwc';
import { CSSClass, ConfigurableMainComponent, SlotComponentMixin } from "c/clwcHelpers";

/**
* @slot Hidden
*/
export default class ClwcHidden extends SlotComponentMixin(ConfigurableMainComponent) {

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-hidden")
    }

    @api get proxy_className() { return this.className }
    set proxy_className(value) { this.className = value }

    /** @type {string} */
    @api breakpoint = "";
    /** @type {string} */
    @api breakpointCondition = "";

    /**
     * @returns {number}
     */
    get breakpointWidth() {
        return parseInt(this.breakpoint.split("(").pop().split(")")[0]);
    }

    /**
     * Returns whether the breakpoint is set to "Above" or "Below"
     * @returns {boolean}
     */
    isBreakpointConditionBelow() {
        return this.breakpointCondition.toLowerCase().includes("below");
    }

    /**
     * Returns if both breakpoint configurations are set
     * @returns {boolean}
     */
    hasBreakpoint() {
        return this.breakpoint && this.breakpointCondition
    }

    /**
     * Content of the style element
     * @returns {string}
     */
    get hiddenClass() {
        return new CSSClass({ display: "none" }, `.clwc-hidden-root[data-component-id="${this.id}"]`).format(this.isBreakpointConditionBelow(), this.breakpointWidth)
    }


    /**
     * @override
     */
    onFirstTimeRender() {
        this.element.classList.add("clwc-hidden-root")
        if (this.hasBreakpoint()) this.styleElement.place(this.hiddenClass) // Place hidden style element if configuration is set
    }

    /**
     * @override
     */
    onToPreview() {
        this.element.classList.remove("clwc-builder-outline-on")
    }

    /**
     * @override
     */
    onToBuilder() {
        this.element.classList.add("clwc-builder-outline-on")
    }

}