import { LightningElement, api, track, wire } from "lwc";
import { CSSValidator, ConfigurableMainComponent, CSSClass, CSSFormatter, BoxShadow } from "c/clwcHelpers";

export default class ClwcStyler extends ConfigurableMainComponent {

    /**
     * @constructor
     */
    constructor() {
        super("c-clwc-styler")
    }

    /**
     * @returns {string}
     */
    get label() {
        return this.className ? this.className : "[ Styler ]"
    }

    /**
     * @returns {boolean}
     */
    get shouldShow() {
        return this.isInBuilder
    }

    /**
     * @type {Error}
     */
    @api error

    // Tooltip:
    @api tooltipOpen = false;
    openTooltip() {
        this.tooltipOpen = true;
    }
    closeTooltip() {
        this.tooltipOpen = false;
    }
    toggleTooltip() {
        this.tooltipOpen = !this.tooltipOpen;
    }

    /**
     * Getter for the CSS class for the tooltip
     * @returns {string}
     */
    get tooltipClass() {
        let cls = "slds-popover slds-nubbin_top-left ";
        return this.tooltipOpen ? cls + "tooltip-open " : cls + "tooltip-closed ";
    }

    /**
     * Getter for the content of the tooltip
     * @returns {string}
     */
    get tooltipContent() {
        if (this.error?.message) return this.error?.message;
        return "Everything looks good!";
    }

    @api get proxy_className() { return this.className }
    set proxy_className(value) { this.className = value }

    /**
    * Getter for CSS Class body
    * @returns {string}
    */
    get classBody() {
        let body = ""
        body += CSSFormatter.formatStyleProperties(this);
        if (this.shadows) body += CSSFormatter.formatShadows(this.shadows)
        return body
    }

    // Breakpoints:
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

    // Visibility:
    /** @type {string} */
    @api style_visibility = "";
    /** @type {string} */
    @api style_display = "";

    // Styling:
    /** @type {string} */
    @api style_background_color = "";
    /** @type {string} */
    @api style_opacity = "";

    // Borders:
    /** @type {string} */
    @api style_border_radius = "";
    /** @type {string} */
    @api style_border = "";

    /** @type {string} */
    @api style_border_bottom_color = "";
    /** @type {string} */
    @api style_border_bottom_width = "";
    /** @type {string} */
    @api style_border_bottom_style = "";

    /** @type {string} */
    @api style_border_left_color = "";
    /** @type {string} */
    @api style_border_left_width = "";
    /** @type {string} */
    @api style_border_left_style = "";

    /** @type {string} */
    @api style_border_right_color = "";
    /** @type {string} */
    @api style_border_right_width = "";
    /** @type {string} */
    @api style_border_right_style = "";

    /** @type {string} */
    @api style_border_top_color = "";
    /** @type {string} */
    @api style_border_top_width = "";
    /** @type {string} */
    @api style_border_top_style = "";

    // Shadows:
    /** @type {string} */
    @api box_shadow_color = "";
    /** @type {string} */
    @api box_shadow_horizontal = "";
    /** @type {string} */
    @api box_shadow_vertical = "";
    /** @type {string} */
    @api box_shadow_blur = "";
    /** @type {string} */
    @api box_shadow_spread = "";
    /** @type {boolean} */
    @api box_shadow_inset = false;

    /**
     * @returns {BoxShadow}
     */
    get shadows() {
        const allShadowsFilledIn = Object.values(this.getProperties("box_shadow_")).some((propertyValue) => { return !!propertyValue; })
        if (!allShadowsFilledIn) return null;
        return new BoxShadow(this.box_shadow_color, this.box_shadow_horizontal, this.box_shadow_blur, this.box_shadow_vertical, this.box_shadow_spread, this.box_shadow_inset)
    }

    // Overflow:
    /** @type {string} */
    @api style_overflow = "";
    /** @type {string} */
    @api style_overflow_x = "";
    /** @type {string} */
    @api style_overflow_y = "";
    /** @type {string} */

    // Size:
    /** @type {string} */
    @api style_max_height = "";
    /** @type {string} */
    @api style_max_width = "";
    /** @type {string} */
    @api style_min_width = "";
    /** @type {string} */
    @api style_min_height = "";
    /** @type {string} */
    @api style_height = "";
    /** @type {string} */
    @api style_width = "";

    // Spacing:
    /** @type {string} */
    @api style_margin = "";
    /** @type {string} */
    @api style_margin_bottom = "";
    /** @type {string} */
    @api style_margin_left = "";
    /** @type {string} */
    @api style_margin_right = "";
    /** @type {string} */
    @api style_margin_top = "";

    /** @type {string} */
    @api style_padding = "";
    /** @type {string} */
    @api style_padding_top = "";
    /** @type {string} */
    @api style_padding_right = "";
    /** @type {string} */
    @api style_padding_bottom = "";
    /** @type {string} */
    @api style_padding_left = "";

    // Position:
    /** @type {string} */
    @api style_position = "";
    /** @type {string} */
    @api style_top = "";
    /** @type {string} */
    @api style_right = "";
    /** @type {string} */
    @api style_bottom = "";
    /** @type {string} */
    @api style_left = "";
    /** @type {string} */
    @api style_z_index = "";

    // Text:
    /** @type {string} */
    @api style_font_family = "";
    /** @type {string} */
    @api style_font_size = "";
    /** @type {string} */
    @api style_font_weight = "";
    /** @type {string} */
    @api style_font_style = "";
    /** @type {string} */
    @api style_text_align = "";

    /** @type {string} */
    @api style_text_decoration = "";
    /** @type {string} */
    @api style_text_transform = "";
    /** @type {string} */
    @api style_letter_spacing = "";
    /** @type {string} */
    @api style_word_spacing = "";
    /** @type {string} */
    @api style_line_height = "";
    /** @type {string} */

    /** @type {string} */
    @api style_text_overflow = "";
    /** @type {string} */
    @api style_white_space = "";

    /**
     * Getter for the URLs to the badge icons
     * @returns {string}
     */
    get badgeIcon() {
        const url = "/assets/icons/utility-sprite/svg/symbols.svg#";
        if (this.error?.severity === "error") return url + "error";
        if (this.error?.severity === "warning") return url + "warning";
        return url + "color_swatch";
    }

    /**
     * Getter for style element content
     * @returns {string}
     */
    get cssClass() {
        const cssClass = new CSSClass(this.getFormattedStyleProperties(), "." + this.className)
        if (this.shadows) cssClass.addBoxShadow(this.shadows)
        return cssClass.format(this.isBreakpointConditionBelow(), this.breakpointWidth);
    }

    /**
     * Getter for CSS class of the SLDS Badge
     * @returns {string}
     */
    get badgeClass() {
        const badges = { "error": "badge-error", "warning": "badge-warning" }
        return `badge ${badges[this.error?.severity] ?? "badge-success"}`
    }

    /**
     * @override
     */
    onFirstTimeRender() {
        this.validateStyleProperties().then(() => {
            this.styleElement.place(this.cssClass)
        }).catch((error) => {
            console.error(error?.message)
        })
    }

    /**
     * @override
     */
    onToPreview() {
        this.element.classList?.add("clwc-hidden")
    }
    /**
     * @override
     */
    onToBuilder() {
        this.element.classList?.remove("clwc-hidden")
    }
}
