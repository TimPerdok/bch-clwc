
import { ConfigurableComponent } from "../ConfigurableComponent";
import { SlotObserver } from "../../observers/SlotObserver";

/**
 * Mixin for components with slots for extra functionalities
 * @param {ConfigurableComponent} superClass 
 * @returns {ConfigurableComponent}
 */
export const SlotComponentMixin = (superClass) => class extends superClass {

    /**
     * @type {SlotObserver[]}
     */
    slotObservers = []

    /**
     * @constructor
     * @param {string} tag
     */
    constructor(tag) {
        super(tag)
    }

    /**
     * @returns {HTMLCollection}
     */
    get slots() {
        return this.template.querySelectorAll("slot")
    }

    /**
     * Returns the first found slot
     * @returns {HTMLElement}
     */
    get firstSlot() {
        return this.template.querySelector("slot")
    }

    

    /**
     * Checks if slot has content. Checks if actual node has children if in builder. And checks the assignednodes if in production
     * @param {HTMLElement} slot 
     * @returns {boolean}
     */
    slotHasContent(slot) {
        return this.isInBuilder ? this.template.querySelectorAll(".actualNode").length > 0 : slot.assignedNodes().length > 0
    }

    /**
     * Initializes a slot observer on the passed slot
     * @param {HTMLElement} slot 
     */
    initSlotObserver(slot) {
        if (!this.isInBuilder) return
        const slotObserver = new SlotObserver(slot)
        // Set callbacks
        slotObserver.onItemAdded = (componentWrapper) => this.onItemAdded(componentWrapper)
        slotObserver.onItemRemoved = (componentWrapper) => this.onItemRemoved(componentWrapper)
        // Add the observer to the array of observers with index of slot
        this.slotObservers[[...this.slots].indexOf(slot)] = slotObserver
        slotObserver.start()
        // Run it manually once
        this.slotHasContent(slot) ? this.onItemAdded(slot) : this.onItemRemoved(slot)
    }

    /**
     * Can be overridden to run something when an item is added to a slot in the builder
     * @param {HTMLElement} componentWrapper 
     */
    onItemAdded(componentWrapper) { }

    /**
     * Can be overridden to run something when an item is removed from a slot in the builder
     * @param {HTMLElement} componentWrapper
     */
    onItemRemoved(componentWrapper) { }


}
