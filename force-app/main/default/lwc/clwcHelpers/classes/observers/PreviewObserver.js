

/**
 * Listens for style changes in a specific HTML element to determine whether the builder is in preview mode or not
 */
export class PreviewObserver extends MutationObserver {

    /**
     * @type {(toPreview: Boolean) => void}
     */
    onChange = (toPreview) => { }

    /**
     * @type {HTMLElement}
     */
    element = null

    /**
     * @constructor
     * @param {HTMLElement} element
     */
    constructor(element) {
        super((mutations) => {
            const toPreview = !mutations[0].target?.style?.border // Only check if border changes
            this.onChange(toPreview) // Then run callback
        })
        this.element = element
    }

    /**
     * Starts observing the element
     */
    start = () => {
        this.observe(this.element, {
            attributes: true, attributeFilter: ["style"] // Only check for style changes
        })
    }



}