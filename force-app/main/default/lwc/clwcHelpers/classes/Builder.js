
/**
 * Super class to implement Builder design patterns
 */
export class Builder {

    /**
     * @type {object}
     */
    object

    /**
     * @constructor
     * @param {object} object 
     */
    constructor(object) {
        if (!object) throw new Error("Must pass object")  
        this.object = object
    }

    /**
     * Builds the object
     * @returns {*} object
     */
    build() {
        this.beforeBuild()
        return this.object
    }

    /**
     * Runs before building. Can be overriden if needed
     */
    beforeBuild() {}

}