
import { DOMSearcher } from "../dom/DOMSearcher";
import { ConfigurableComponent } from "./ConfigurableComponent";

/**
 * A main configurable component.
 * These have extra functionalities like containing a reference to it's element in the DOM by having a unique ID that subcomponents do not have (data-component-id)
 */
export class ConfigurableMainComponent extends ConfigurableComponent {

    /**
     * @constructor
     * @param {string} tag
     */
    constructor(tag) {
        super(tag)
    }

    _element = null
    /**
     * If element is not set, then set it by finding itself using its tag and its ID
     * @override
     * @returns {HTMLElement}
     */
    get element() {
        if (!this._element) this.element = DOMSearcher.findInDOM(this.tag, this.id)
        return this._element
    }
    set element(element) { this._element = element }

    /**
     * Checks whether the component is in a drop region.
     * @description If you move or edit a componenint in the builder it gets moved to a drop region element until the page is refreshed. Which requires special styling.
     * @returns {boolean}
     */
    isInDropRegion() {
        return DOMSearcher.hasParentWithTagName(this.element, "drop-region", "webruntimedesign-region-wrapper")
    }

    /**
     * Calls a function for every contextual HTML element in the experience builder above the components element.
     * These functions can be overridden to add custom styling to the corresponding element.
     * See CLWC documentation for more information.
     * @param {HTMLElement} thisElement 
     */
    addElementStyling(thisElement) {
        const funcs = [this.addDesignComponentStyling, this.addActualNodeStyling, this.addInteractionsComponentStyling, this.addComponentWrapperStyling, this.addDropZoneStyling, this.addDropRegionStyling]
        funcs.forEach((func, index) => {
            if ([4, 5].includes(index) && !this.isInDropRegion()) return // If not in drop region, don't add drop region styling
            func.bind(this)(DOMSearcher.getParentRecursive(thisElement, index + 1)) // Run the function and bind it to the correct 'this'
        })
        if (!this.isInDropRegion("slot")) this.addRegionWrapperStyling(DOMSearcher.getParentRecursive(thisElement, 6)) // 
    }

    /**
     * Runs the addElementStyling functions if the component is in the builder
     */
    onAfterRender() {
        if (this.isInBuilder) this.addElementStyling(this.element)
    }

    /**
     * Can be overridden to add custom styling to the design component
     * @param {HTMLElement} designComponent <webruntimedesign-design-component>
     */
    addDesignComponentStyling(designComponent) { }

    /**
     * Can be overridden to add custom styling to the actual node div
     * @param {HTMLElement} actualNode <div class="webruntimedesign-componentWrapper_componentWrapper actualNode">
     */
    addActualNodeStyling(actualNode) { }

    /**
     * Can be overridden to add custom styling to the interactions component
     * @param {HTMLElement} interactionsComponent <div class="webruntimedesign-componentWrapper_componentWrapper interactions-component interactions-element">
     */
    addInteractionsComponentStyling(interactionsComponent) { }

    /**
     * Can be overridden to add custom styling to the component wrapper
     * @param {HTMLElement} componentWrapper <webruntimedesign-component-wrapper>
     */
    addComponentWrapperStyling(componentWrapper) { }

    /**
     * Can be overridden to add custom styling to the region wrapper
     * @param {HTMLElement} regionWrapper <div class="webruntimedesign-regionWrapper_regionWrapper interactions-region interactions-element">
     */
    addRegionWrapperStyling(regionWrapper) { }

    /**
     * Can be overridden to add custom styling to the drop zone
     * @param {HTMLElement} dropZone <div class="webruntimedesign-dropRegion_dropRegion dropzone">
     */
    addDropZoneStyling(dropZone) { }

    /**
     * Can be overridden to add custom styling to the drop region
     * @param {HTMLElement} dropRegion <webruntimedesign-drop-region>
     */
    addDropRegionStyling(dropRegion) { }

}
