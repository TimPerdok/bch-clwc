import { CSSClass } from "../css/CSSClass";

/**
 * Global configuration variables
 */
export class Config {
    static globalStyling = `
    ${new CSSClass({ display: "contents !important" }, ".display-contents").format()}
    ${new CSSClass({ "word-break": "break-word" }, ".clwc-grid-item-root dxp_base-text-block > *:first-child").format()}
    ${new CSSClass({ display: 'block', flex: '0' }, `.clwc-grid-item-slot-child`).format()}
    ${new CSSClass({ width: '100%' }, `.column-content`).format()}
    ${new CSSClass({ width: '100%' }, `.clwc-full-width`).format()}
    ${new CSSClass({ "flex-direction": 'row !important' }, `.clwc-builder-mode`).format()}
    ${new CSSClass({ 'padding-top': "12px !important", border: "1px dashed #ccc !important" }, `.clwc-builder-outline-on`).format()}
    ${new CSSClass({ height: '100%' }, `.clwc-full-height`).format()}
    ${new CSSClass({ display: 'none !important' }, `.clwc-hidden`).format()}
    ${new CSSClass({ "flex-direction": "row" }, `.clwc-flex-horizontal`).format()}
    ${new CSSClass({ "flex-direction": "column" }, `.clwc-flex-vertical`).format()}
    ${new CSSClass({ 'padding-top': "100%", 'overflow-y': "hidden", "background-color": "#e5e5f7", opacity: 0.8, background: "repeating-linear-gradient( -45deg, #444cf7, #444cf7 2px, #e5e5f7 2px, #e5e5f7 10px )" }, ".clwc-drawer-open").format()}
    ${new CSSClass({ 'height': "100%" }, ".clwc-drawer-full-height").format()}
    `

}