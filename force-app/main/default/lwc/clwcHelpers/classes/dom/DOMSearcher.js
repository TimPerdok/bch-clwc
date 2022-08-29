
/**
 * Class to search for DOM elements
 */
export class DOMSearcher {

    /**
     * Searches for the first element with the given tag name and data-component-id. All main components have this unique id
     * @param {string} tag html tag name
     * @param {string} dataComponentId html data-component-id
     * @returns {HTMLElement}
     */
    static findInDOM(tag, dataComponentId) {
        if ([...document.getElementsByTagName(tag)].length === 0) throw new Error(tag + " not found in DOM!")
        return [...document.getElementsByTagName(tag)].find(el => {
            return el.getAttribute("data-component-id") === dataComponentId
        })
    }

    /**
     * Checks if an element has a parent with the given tag name. It searches until an optional tag is found
     * @param {HTMLElement} el 
     * @param {string} tagName 
     * @param {string | null} searchUntilTag 
     * @returns {boolean}
     */
    static hasParentWithTagName(el, tagName, searchUntilTag = null) {
        let parent = el?.parentNode
        while (parent) {
            if (searchUntilTag && parent?.tagName?.toLowerCase() === searchUntilTag.toLowerCase()) return false
            if (parent?.tagName?.toLowerCase().includes(tagName.toLowerCase())) {
                return true;
            }
            parent = parent?.parentNode;
        }
        return false;
    }

    /**
     * Returns the first parent of the element with the given tag name
     * @param {HTMLElement} el 
     * @param {string} tagName 
     * @returns {HTMLElement | null}
     */
    static getFirstParentWithTag(el, tagName) {
        let parent = el?.parentNode;
        while (parent) {
            if (parent?.tagName?.toLowerCase().includes(tagName)) {
                return parent;
            }
            parent = parent?.parentNode;
        }
        return null;
    }

    /**
     * Returns the Nth parent of the element
     * @param {HTMLElement} node 
     * @param {number} depth 
     * @returns {HTMLElement}
     */
    static getParentRecursive(node, depth = 0) {
        if (depth > 0) return DOMSearcher.getParentRecursive(node.parentNode, depth - 1)
        return node
    }

}
