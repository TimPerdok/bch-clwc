import { CSSFormatter } from "./CSSFormatter"
import { CSSValidator } from "./CSSValidator"
/**
 * CSS box-shadow class
 */
export class BoxShadow {
    /** @type {string} */
    color
    /** @type {string} */
    horizontal
    /** @type {string} */
    vertical
    /** @type {string} */
    blur
    /** @type {string} */
    spread
    /** @type {boolean} */
    inset

    /**
     * Sets the selector of this CSS class
     * @constructor
     * @param {string} color
     * @param {string} horizontal
     * @param {string} vertical
     * @param {string} blur
     * @param {string} spread
     * @param {boolean} inset
     */
    constructor(color, horizontal, vertical, blur, spread, inset = false) {
        this.color = color
        this.horizontal = horizontal
        this.vertical = vertical
        this.blur = blur
        this.spread = spread
        this.inset = inset
    }
}

/**
 * An object that represents a CSS class.
 */
export class CSSClass {

    /**
     * @type {BoxShadow}
     */
    _boxShadow
    /**
     * @type {string}
     */
    _selector

    /**
     * @param {object} props 
     * @param {string} selector 
     */
    constructor(props = {}, selector) {
        this._selector = selector ?? ""
        this.properties = props
    }

    /**
     * Get all properties of this CSS class that don't start with "_"
     * @returns {object}
     */
    get properties() {
        const props = Object.fromEntries(Object.entries(this).filter(
            ([key, value]) => !key.startsWith("_") && (!!value || value === "0")
        ))
        return props
    }

    /**
     * Setter for properties
     * @param {object} props
     */
    set properties(props = {}) {
        Object.entries(props).map(([key, value]) => {
            if (key.startsWith("_")) return
            this[key] = value
        })
    }

    /**
     * Formats the properties of this CSS class to a string and returns it
     * @example { "color": "red", "background-color": "blue" } => "color: red; background-color: blue;"
     * @returns {string}
     */
    get formattedProperties() {
        let cssProps = CSSFormatter.formatProperties(this.properties) + " "
        if (this._boxShadow) cssProps += CSSFormatter.formatShadows(this._boxShadow)
        return cssProps
    }

    /**
     * Adds a box shadow to this CSS class
     * @param {BoxShadow} boxShadow
     */
    addBoxShadow(boxShadow) {
        this._boxShadow = boxShadow
    }

    /**
     * Validates every property in this CSS class and returns a combined promise
     * @returns {Promise}
     */
    validate() {
        const promises = []
        Object.entries(this.properties).forEach(([key, value]) => {
            promises.push(CSSValidator.validate(key, value))
        })
        return Promise.all(promises)
    }

    /**
     * Formats this CSS class to a string
     * @param {boolean} isBreakpointConditionBelow
     * @param {string} breakpointWidth
     * @returns {string}
     */
    format(isBreakpointConditionBelow, breakpointWidth) {
        if (!this._selector) return ""
        return CSSFormatter.formatClass(this._selector, this.formattedProperties, isBreakpointConditionBelow, breakpointWidth)
    }
}