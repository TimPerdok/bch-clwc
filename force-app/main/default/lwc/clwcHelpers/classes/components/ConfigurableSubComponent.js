import { ConfigurableComponent } from "./ConfigurableComponent";

/**
 * Configurable sub component
 * Sub components do not have a data-component-id so they are difficult to distinguish from each other.
 * They also don't have the contextual elements that main components have.
 */
export class ConfigurableSubComponent extends ConfigurableComponent {
    /**
     * @constructor
     * @param {string} tag
     */
    constructor(tag) {
        super(tag)
    }
}
