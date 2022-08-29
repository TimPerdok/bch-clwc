import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import { NavigationMenuItem, ConfigurableSubComponent, CSSClass } from "c/clwcHelpers";


export default class ClwcNavItem extends NavigationMixin(ConfigurableSubComponent) {

  /**
   * @constructor
   */
  constructor() {
    super("c-clwc-nav-item")
  }

  /**
   * the NavigationMenuItem from the Apex controller
   * @type {NavigationMenuItem}
   */
  @api item

  /** @type {string} */
  @track href = "javascript:void(0);";

  /**
   * @type {string}
   */
  get rootClass() {
    return `nav-button-container `
  }

  /**
   * @type {string}
   */
  get linkClass() {
    let cls = 'link '
    if (this.item?.active) cls += 'active '
    return cls
  }

  /**
   * Removes all spaces of text and lowercases it
   * @param {string} text 
   * @returns {string}
   */
  filterString(text) {
    if (!text) return ""
    return text.toLowerCase().replace(/\s/g, '');
  }

  /**
   * @override
   */
  onFirstTimeRender() {
    this.orderedClassName = `nav-item-${this.item?.id}`
  }

  /**
   * @override
   */
  onFirstTimeConnected() {
    if (!this.item.pageReference) return
    this[NavigationMixin.GenerateUrl](this.item?.pageReference).then((url) => {
      this.href = url
      // TODO Find a way to get the URL to compare with active tab
      this.item.active = this.filterString(this.item?.label) === this.filterString(this.item?.activeTabName)
    });
  }

  /**
   * @param {Event} evt 
   */
  handleClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (!this.item?.pageReference) return console.log(`Navigation menu type "${this.item?.type}" not implemented for item ${JSON.stringify(this.item)}`);
    this.navigate(this.item?.pageReference);
  }

  /**
   * Navigates to the page reference
   * @param {PageReference} pageReference
   */
  navigate(pageReference) {
    this[NavigationMixin.Navigate](pageReference);
  }

}