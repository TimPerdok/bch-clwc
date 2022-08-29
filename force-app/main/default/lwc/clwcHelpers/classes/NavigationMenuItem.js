import { Builder } from './Builder';
import basePath from "@salesforce/community/basePath";
import { PageReference, PageReferenceBuilder } from "./PageReference";

/**
 * Navigation Menu Item
 */
export class NavigationMenuItem {

  /**
   * @type {string}
   */
  target
  /**
   * @type {string}
   */
  id
  /**
   * @type {string}
   */
  label
  /**
   * @type {string}
   */
  defaultListViewId
  /**
   * @type {string}
   */
  type
  /**
   * @type {string}
   */
  accessRestriction
  /**
   * @type {string}
   */
  activeTabName
  /**
   * @type {PageReference}
   */
  pageReference
  /**
   * @type {boolean}
   */
  active

  /** @constructor */
  constructor() { }

}

/**
 * Builder for Navigation Menu Item
 */
export class NavigationMenuItemBuilder extends Builder {

  /**
   * @constructor
   */
  constructor() {
    super(new NavigationMenuItem())
  }

  /**
   * Page references map
   * @type {object{string: () => PageReference}}
   */
  pageReferences = {
    // aka "Salesforce Object" menu item
    "SalesforceObject": () => { return new PageReferenceBuilder().setType("standard__objectPage").setAttributes({ objectApiName: this.object.target }).setState({ filterName: defaultListViewId }).build() },
    // aka "Site Page" menu item
    // WARNING: Normally you shouldn't use 'standard__webPage' for internal relative targets, but
    // we don't have a way of identifying the Page Reference type of an InternalLink URL
    "InternalLink": () => { return new PageReferenceBuilder().setType("standard__webPage").setAttributes({ url: basePath + this.object.target }).build() },
    // aka "External URL" menu item
    "ExternalLink": () => { return new PageReferenceBuilder().setType("standard__webPage").setAttributes({ url: this.object.target }).build() }
  }

  /**
   * Sets target
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setTarget(target) {
    this.object.target = target;
    return this;
  }

  /**
   * Sets id
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setId(id) {
    this.object.id = id;
    return this;
  }

  /**
   * Sets label
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setLabel(label) {
    this.object.label = label;
    return this;
  }

  /**
   * Sets default list view id
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setDefaultListViewId(defaultListViewId) {
    this.object.defaultListViewId = defaultListViewId;
    return this;
  }
  /**
   * Sets type
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setType(type) {
    this.object.type = type;
    return this;
  }
  /**
   * Sets access restriction
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setAccessRestriction(accessRestriction) {
    this.object.accessRestriction = accessRestriction;
    return this;
  }
  /**
   * Sets active tab name
   * @type {string}
   * @returns {NavigationMenuItemBuilder}
   */
  setActiveTabName(activeTabName) {
    this.object.activeTabName = activeTabName;
    return this;
  }
  /**
   * Sets page reference
   * @type {PageReference}
   * @returns {NavigationMenuItemBuilder}
   */
  setPageReference(pageReference) {
    this.object.pageReference = pageReference;
    return this;
  }
  /**
   * Sets active
   * * @type {boolean}
   * @returns {NavigationMenuItemBuilder}
   */
  setActive(value) {
    this.object.active = value
    return this;
  }
  /**
   * Runs before building
   * @override
   */
  beforeBuild() {
    this.setPageReference(this.pageReferences[this.object.type]() ?? null)
  }


}
