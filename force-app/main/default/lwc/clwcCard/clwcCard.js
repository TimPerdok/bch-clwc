import { api } from 'lwc';
import { BoxShadow, CSSClass, ConfigurableMainComponent, SlotComponentMixin } from "c/clwcHelpers";

/**
 * Card component
 * @slot Title Title bar
 * @slot Card Content of the card
 */
export default class ClwcCard extends SlotComponentMixin(ConfigurableMainComponent) {


    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-card")
    }

    @api get proxy_className() { return this.className }
    set proxy_className(value) { this.className = value }

    @api titled = false

    @api style_padding = "4px"
    @api style_height = ""
    @api style_background_color = "rgb(224, 224, 224)";
    @api style_border_radius = "";
    @api style_bottom_margin = "32px"

    /**
     * Returns preset CSS box-shadow values with given dropdown input
     * @returns {string}
     */
    _shadow = "None";
    @api get shadow() {
        const shadowSizes = { "None": "", "Small": new BoxShadow("grey", "2px", "2px", "3px"), "Medium": new BoxShadow("grey", "4px", "4px", "5px"), "Large": new BoxShadow("grey", "6px", "6px", "7px") };
        return shadowSizes[this._shadow] ?? new BoxShadow()
    }
    set shadow(shadow) { this._shadow = shadow; }


    /**
     * Returns all classnames for this components root element
     * @returns {string}
     */
    get rootClass() {
        let className = `clwc-card-root `
        className += `${this.className} `
        return className
    }

    /**
     * Returns CSS Styling with current config variables
     * @returns {string}
     * 
     */
    get cardStyling() {
        const cls = new CSSClass(this.getFormattedStyleProperties(), `c-clwc-card[data-component-id="${this.id}"]>.clwc-card-root`)
        if (this.shadow) cls.addBoxShadow(this.shadow)
        return cls.format()
    }

    /**
     * Validates every property starting with style_ and places the styling if everything is right
     * @override
     */
    onFirstTimeRender() {
        this.validateStyleProperties().then((result) => {
            this.styleElement.place(this.cardStyling)
        }).catch((error) => {
            if (this.isInBuilder) console.error(error?.message)
        })
    }

    /**
     * Removes dashed borders if going to preview
     * @override
     */
    onToPreview() {
        this.template.firstChild?.classList?.remove("clwc-builder-outline-on")
    }

    /**
     * Adds dashed borders if going from preview to builder
     * @override
     */
    onToBuilder() {
        this.template.firstChild?.classList?.add("clwc-builder-outline-on")
    }

}