

/**
 * Listens for style changes in a specific HTML element to determine whether the builder is in preview mode or not
 */
export class SlotObserver extends MutationObserver {

    /**
     * @type {(componentWrapper: HTMLElement) => void}
     */
    onItemAdded = (componentWrapper) => { }

    /**
     * @type {(componentWrapper: HTMLElement) => void}
     */
    onItemRemoved = (componentWrapper) => { }
    
    /**
     * @type {HTMLElement}
     */
    slot = null

    /**
     * @constructor
     * @param {HTMLElement} slot
     */
    constructor(slot) {
        super((mutations) => {
            if (mutations.length > 1) return // Return if multiple mutations
            mutations.forEach((mutation) => {
                // If only nodes are added or only nodes are removed
                if ((mutation.addedNodes.length === 0 && !mutation.removedNodes.length === 0) || (!mutation.addedNodes.length === 0 && mutation.removedNodes.length === 0)) return // XOR
                const node = mutation.addedNodes[0] ?? mutation.removedNodes[0] // Get the addednode or removednode
                if (node?.tagName !== "WEBRUNTIMEDESIGN-COMPONENT-WRAPPER") return // If a componentwrapper is added or removed
                mutation.addedNodes[0] ? this.onItemAdded(node) : this.onItemRemoved(node) // Run the correct callback
            })
        })
        this.slot = slot
    }

    /**
     * Starts observing the slots first child
     */
    start = () => {
        this.observe(this.slot.assignedNodes()[0], { childList: true, subtree: true })
    }



}