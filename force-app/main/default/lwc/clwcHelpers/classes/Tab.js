/**
 * Tab Class for the Tab Component
 */
export class Tab {

    /** @type {string} */
    name
    /** @type {number} */
    index
    /** @type {boolean} */
    active

    /**
     * @constructor
     * @param {string} name
     * @param {number} index
     */
    constructor(name, index) {
        this.name = name;
        this.index = index
        this.active = false
    }

    /**
     * Sets active to true
     */
    activate() {
        this.active = true
    }

    /**
     * Sets active to true
     */
    deactivate() {
        this.active = false
    }

}