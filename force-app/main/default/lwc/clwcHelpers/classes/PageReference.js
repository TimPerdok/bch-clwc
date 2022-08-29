import { Builder } from './Builder';
/**
 * Page Reference Builder
 */
export class PageReferenceBuilder extends Builder {

    /**
     * @constructor
     */
    constructor() {
        super(new PageReference());
    }

    /**
     * Sets type
     * @param {string} type 
     * @returns {PageReferenceBuilder}
     */
    setType(type) {
        this.object.type = type;
        return this;
    }

    /**
     * Sets attributes
     * @param {object} attributes 
     * @returns {PageReferenceBuilder}
     */
    setAttributes(attributes) {
        this.object.attributes = attributes;
        return this;
    }

    /**
     * Sets type
     * @param {object} state
     * @returns {PageReferenceBuilder}
     */
    setState(state) {
        this.object.state = state;
        return this;
    }
}

/**
 * Salesforce page reference class
 */
export class PageReference {

    /**
     * @type {string}
     */
    type
    /**
     * @type {object}
     */
    attributes
    /**
     * @type {object}
     */
    state

    /** @constructor */
    constructor() {
    }

}