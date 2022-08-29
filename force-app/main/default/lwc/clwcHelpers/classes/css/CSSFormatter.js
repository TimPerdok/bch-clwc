/**
 * Can be used to format CSS properties to a string
 */
export class CSSFormatter {

    /**
     * Changes shadow variables to the input of CSS property box-shadow
     * @param {BoxShadow} boxShadow 
     * @returns {string}
     */
    static formatShadows(boxShadow) {
        const { color, horizontal, blur, vertical, spread, inset } = boxShadow;
        let shadow = "";
        shadow += horizontal ? `${horizontal} ` : "0px ";
        shadow += vertical ? `${vertical} ` : "0px ";
        shadow += blur ? `${blur} ` : "0px ";
        shadow += spread ? `${spread} ` : "0px ";
        shadow += color ? `${color} ` : "";
        shadow += inset ? "inset" : "";
        return `box-shadow: ${shadow};`;
    }

    /**
     * Changes an object to a css string
     * @param {object} config
     * @returns {string}
     */
    static formatProperties(obj) {
        var css = "";
        for (var property in obj) {
            css += property + ":" + obj[property] + ";";
        }
        return css;
    }

    /**
    * Changes an object to a css string
    * @param {ConfigurableComponent} config
    * @returns {string}
    */
    static formatStyleProperties(obj) {
        const properties = {}
        Object.entries(obj.getNonEmptyProperties("style_")).forEach(([key, value]) => {
            const parts = key.toLowerCase().split("_");
            const propertyName = parts.slice(parts.indexOf("style") + 1).join("-");
            if (value) properties[propertyName] = value;
        });
        return CSSFormatter.formatProperties(properties);
    }

    /**
     * Returns the media query property for the current breakpoint condition
     * @param {boolean} isBreakpointConditionBelow
     * @returns {string}
     */
    static getBreakpointConditionProperty(isBreakpointConditionBelow) {
        return isBreakpointConditionBelow ? "max-width" : "min-width";
    }

    /**
     * Formats a CSS Class using a name, body and breakpoint configuration
     * @param {string} selector
     * @param {string} classBody
     * @param {boolean} isBreakpointConditionBelow
     * @param {string} breakpoint
     */
    static formatClass(selector, classBody, isBreakpointConditionBelow = false, breakpointWidth = null) {
        const cssClass = `${selector} { \n ${classBody} \n }`;
        if (breakpointWidth) return `@media only screen and (${CSSFormatter.getBreakpointConditionProperty(isBreakpointConditionBelow)}: ${isBreakpointConditionBelow ? breakpointWidth : breakpointWidth + 1}px) { \n ${cssClass} \n }`;
        return cssClass;
    }
}
