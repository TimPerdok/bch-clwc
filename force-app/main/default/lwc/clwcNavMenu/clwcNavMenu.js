import { api, wire, track } from "lwc";

import getNavigationMenuItems from "@salesforce/apex/NavigationController.getNavigationMenuItems";

import isGuestUser from "@salesforce/user/isGuest";
import { ConfigurableMainComponent, NavigationMenuItemBuilder, CSSClass } from "c/clwcHelpers";

/**
 * This is a custom LWC navigation menu component.
 * IMPORTANT: Make sure the Guest user profile has access to the NavigationMenuItemsController apex class.
 */
export default class ClwcNavMenu extends ConfigurableMainComponent {

  /**
   * @constructor
   */
  constructor() {
    super("c-clwc-nav-menu");
  }

  /**
   * the menu items when fetched by the NavigationItemsController
   */
  @track menuItems = [];

  /**
   * get the navigationMenuName from the meta property
   * @type {string}
   */
  @api menuName;

  /**
   * get the navigationMenuName from the meta property
   * @type {string}
   */
  @api activeTabName;

  @api itemHeight
  @api itemWidth
  @api itemColor
  @api activeItemColor

  @api align

  isHorizontal() {
    return this.align === "Horizontal"
  }

  get rootClass() {
    let cls = `root `
    if (this.isInBuilder) cls += "clwc-builder-outline-on "
    cls += this.isHorizontal() ? "clwc-flex-horizontal " : "clwc-flex-vertical "
    return cls
  }

  onToPreview() {
    this.template.firstChild?.classList.remove("clwc-builder-outline-on")
  }

  onToBuilder() {
    this.template.firstChild?.classList.add("clwc-builder-outline-on")
  }

  /**
   * the published state of the site, used to determine from which schema to
   * fetch the NavigationMenuItems
   * @type {string}
   */
  publishedState

  filterString(text) {
    return text.toLowerCase().replace(/\s/g, '');
  }

  get styling() {
    return `
    ${new CSSClass({ height: this.itemHeight, width: this.itemWidth }, `c-clwc-nav-menu[data-component-id="${this.id}"] .nav-button-container`).format()}
    ${new CSSClass({ color: this.itemColor, "text-decoration": "none" }, `c-clwc-nav-menu[data-component-id="${this.id}"] .nav-button-container > a`).format()}
    ${new CSSClass({ color: this.activeItemColor }, `c-clwc-nav-menu[data-component-id="${this.id}"] .nav-button-container > a.active`).format()}
    `
  }

  get showWarning() {
    return this.isInBuilder && !this.menuItems.length
  }

  get warning() {
    return this.menuName ? `${this.menuName} is unknown` : "No menu name provided"
  }

  formatData(data) {
    return data.map((item, index) => {
      const builder = new NavigationMenuItemBuilder().setTarget(item?.Target).setId(index).setLabel(item?.Label).setDefaultListViewId(item?.DefaultListViewId).setType(item.Type).setAccessRestriction(item?.AccessRestriction).setActiveTabName(this.activeTabName ?? null)
      return builder.build()
    }).filter((item) => {
      // Only show "Public" items if guest user
      return (
        item?.accessRestriction === "None" ||
        (item?.accessRestriction === "LoginRequired" && !isGuestUser)
      );
    });
  }

  /**
   * Using a custom Apex controller, query for the NavigationMenuItems using the
   * menu name and published state.
   *
   * The custom Apex controller is wired to provide reactive results.
   */
  @wire(getNavigationMenuItems, {
    menuName: "$menuName",
    publishedState: "$publishedState"
  })
  wiredMenuItems({ error, data }) {
    if (data) return this.menuItems = this.formatData(data)
    if (error) {
      this.menuItems = [];
      if (this.isInBuilder) console.log(`Navigation menu error: ${JSON.stringify(error)}`);
    }
  }


  onFirstTimeRender() {
    if (this.isInBuilder) console.log("Drawer initiated! Make sure to give guest users permission as described in the manual.")
    this.publishedState = this.currentPageReference?.state?.app === "commeditor" ? "Draft" : "Live";
    this.styleElement.place(this.styling)
  }

}