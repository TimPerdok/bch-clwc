/**
 * Class that manages a style element
 */
export class StyleElement {

  
    /**
     * @type {string}
     */
    id = null

    /**
     * @constructor
     * @param {string} id
     */
    constructor(id) {
        this.id = id;
    }


    _element = null
    /**
     * Getter for the style element. Creates it if it doesn't exist
     * @type {HTMLElement}
     */
    get element() {
        if (!this.id) return null
        if (!this._element) this._element = document.getElementById(this.id);
        return this._element
    }
    set element(element) { this._element = element }

    /**
     * Edits the style element if it exists. Else it creates it and adds it to the DOM
     * @returns {HTMLElement}
     */
    place(content = "") {
        if (this.exists()) return this.edit(content);
        const el = this.create(content);
        return this.addToDOM(el);
    }

    /**
     * Edits the style element if its not the same
     * @returns {HTMLElement}
     */
    edit(newContent = "") {
        if (this.element.innerText !== this.formatHTML(newContent)) this.element.innerText = this.formatHTML(newContent);
        return this.element;
    }

    /**
     * Removes the element from the head of the DOM
     * @returns {boolean}
     */
    remove() {
        return document.head.removeChild(this.element);
    }

    /**
     * Checks if the element exists in the DOM
     * @returns {boolean}
     */
    exists() {
        return !!this.element;
    }

    /**
     * Adds the style element to the head of the DOM
     * @returns {HTMLElement}
     */
    addToDOM(element) {
        return !!document.getElementsByTagName("head")[0].appendChild(element);
    }

    /**
     * Formats the content of the style element
     * @param {string} input
     * @returns {string}
     */
    formatHTML(input) {
        if (!input) return ""
        return input.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ');
    }

    /**
     * Creates the style element
     * @param {string} content 
     * @returns {HTMLElement}
     */
    create(content = "") {
        var element = document.createElement("style");
        element.type = "text/css";
        element.id = this.id;
        element.innerText = this.formatHTML(content)
        return element;
    }
}
