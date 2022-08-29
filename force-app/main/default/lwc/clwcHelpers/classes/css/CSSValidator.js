/**
 * Validation error class
 */
export class ValidationError extends Error {
    /** 
     * @type {string}
     */
    severity;

    /**
     * @constructor
     * @param {string} message
     * @param {string} severity default: "error"
     */
    constructor(message, severity = "error") {
        super(message);
        this.name = "ValidationError";
        this.severity = severity;
    }
}

/**
 * Can be used to validate CSS properties
 */
export class CSSValidator {
    /**
     * All valid CSS length units
     * @type {string[]}
     */
    static lengthUnits = ["px", "em", "%", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "in", "pt", "pc", "ex", "ch", "vmin", "vmax"];

    /**
     * All CSS properties that use length units ends with one of the following:
     * @type {string[]}
     */
    static lengthTags = ["height", "width", "horizontal", "vertical", "blur", "spread", "top", "right", "bottom", "left", "radius"];

    /**
     * Removes whitespace and lowercases the input
     * @param {string} input
     * @returns {string}
     */
    static format(input) {
        return input.toLowerCase().replace(/\s/g, "");
    }

    /**
     * Validates config input for CSS
     * @param {string} key
     * @param {string} value
     * @returns {boolean}
     */

    static validate(key, value) {
        try {
            if (!value) return
            const sanitizedValue = CSSValidator.sanitize(value);
            if (CSSValidator.lengthTags.some((tag) => { return key.endsWith(tag) })) return this.validateCSSLength(sanitizedValue, key);
            if (key.endsWith("color")) return this.validateCSSColor(sanitizedValue, key);
        } catch (error) {
            if (error instanceof ValidationError) throw error;
            else throw new ValidationError(error?.message);
        }
    }

    /**
     * Sanitizes input for CSS values
     * @param {string} input
     * @returns {string}
     */
    static sanitize(input) {
        return input.replace(/[^a-zA-Z0-9_(),.\-\s]/g, "");
    }

    /**
     * Validates CSS length value
     * @param {string} value 
     * @param {string} key
     * @returns {boolean}
     */
    static validateCSSLength(value, key = "Unknown property") {
        value = CSSValidator.format(value);
        const number = parseInt(value);
        if (number == null || number == undefined || isNaN(number)) throw new ValidationError(`Invalid ${key} value`);
        const unit = value.split(number)[1];
        if (unit == null || unit == undefined) throw new ValidationError(`No unit entered for ${key}`);
        if (!CSSValidator.lengthUnits.some((lengthUnit) => { return lengthUnit === unit; })) throw new ValidationError(`Invalid unit entered for ${key}`);
        return true;
    }

    /**
     * Validates CSS rgb value
     * @param {string} value
     * @returns {boolean}
     */
    static validateCSSColor(value, key = "Unknown") {
        try {
            value = CSSValidator.format(value);
            let colorValues = value.split("(")[1].split(",");

            // Change color values to int
            colorValues = colorValues.map((colorValue) => { return parseFloat(colorValue); });

            // Check if color values are in correct range
            if (colorValues.slice(0, 3).some((colorValue) => { return colorValue < 0 || colorValue > 255; })) throw new ValidationError("Color values must be between 0 and 255");
            if (colorValues[3] && (colorValues[3] < 0 || colorValues[3] > 1)) throw new ValidationError("Opacity value must be between 0 and 1");

            return true;
        } catch (error) {
            throw new ValidationError(`Error on ${key}: ${error?.message}`);
        }
    }
}
