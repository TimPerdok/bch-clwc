import { createElement } from "lwc";
import ClwcStyler from "../clwcStyler";

jest.mock("@salesforce/community/basePath", () => { return { basepath: "/path" }; }, { virtual: true });

function createLWC(config = {}, className = "test", id = "test") {
    const element = createElement("c-clwc-styler", {
        is: ClwcStyler,
    });
    element.className = className;
    element['data-component-id'] = id
    element.id = id;
    Object.entries(config).map(([key, value]) => {
        element[key] = value;
    });
    document.body.appendChild(element);

    return element;
}

function getElement() {
    return [...document.head.children].filter((element) => {
        return !element?.id?.includes("global")
    })[0];
}

function getStyleContent() {
    return getElement().innerText?.replace(/\s/g, "");
}

function findElementById(root, id) {
    return [...root.shadowRoot.querySelectorAll("*")].find((element) => {
        if (element.id.toLowerCase().includes(id.toLowerCase())) {
            return element;
        }
    });
}

describe("c-clwc-styler", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        jest.clearAllMocks();
    });

    it("renders itself", () => {
        const element = createLWC();
        expect(element).toBeTruthy();
    });

    it("should add a single style element and a global style element in head on creation", () => {
        const element = createLWC();
        return Promise.resolve().then(() => {
            expect([...document.head.children].length).toBe(2);
        });
    });

    it("should replace an old style element if id is the same", () => {
        const element = createLWC({ style_background_color: "red", style_opacity: "0.5" });
        const element2 = createLWC({ style_background_color: "green", style_opacity: "0.5" });
        return Promise.resolve().then(() => {
            expect([...document.head.children].length).toBe(1);
        });
    });

    it("should add background-color and opacity correctly if set", async () => {
        const element = createLWC({ style_background_color: "red", style_opacity: "0.5" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{background-color:red;opacity:0.5;}");
            res()
        }, 500))
    });

    it("shouldnt create a style element if there is no id and/or classname", () => {
        const element = createLWC({ style_background_color: "red", style_opacity: "0.5" }, "", "");
        return Promise.resolve().then(() => {
            expect([...document.querySelectorAll("[id=hv-clwc-test]")].length).toBe(0);
        });
    });

    it("should add box-shadow correctly if some properties set", () => {
        const element = createLWC({ box_shadow_horizontal: "2px", box_shadow_color: "red" });
        setTimeout(1000, () => {
            const content = getStyleContent()
            expect(content).toContain(".test{box-shadow:2px0px0px0pxred;}");
        });
    });

    it("should add box-shadow correctly if all properties are set", async () => {
        const element = createLWC({ box_shadow_horizontal: "2px", box_shadow_color: "red", box_shadow_vertical: "2px", box_shadow_spread: "2px", box_shadow_blur: "2px", box_shadow_inset: "inset" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{box-shadow:2px2px2px2pxredinset;}");
            res()
        }, 500))
    });

    it("should add borders correctly if some properties are set", async () => {
        const element = createLWC({ style_border_bottom_color: "red", style_border_bottom_width: "2px" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{border-bottom-color:red;border-bottom-width:2px;}");
            res()
        }, 500))
    });

    it("should add overflow correctly if they are set", async () => {
        const element = createLWC({ style_overflow: "hidden", style_overflow_x: "hidden", style_overflow_y: "scroll" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{overflow:hidden;overflow-x:hidden;overflow-y:scroll;}");
            res()
        }, 500))
    });

    it("should add min/max height and min/max width correctly if set", async () => {
        const element = createLWC({ style_min_height: "100px", style_min_width: "100px", style_max_height: "100px", style_max_width: "100px", style_height: "100px", style_width: "100px" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{max-height:100px;max-width:100px;min-width:100px;min-height:100px;height:100px;width:100px;}");
            res()
        }, 500))
    });

    it("should add margin and padding correctly if set", async () => {
        const element = createLWC({
            style_margin_top: "100px",
            style_margin_right: "100px",
            style_margin_bottom: "100px",
            style_margin_left: "100px",
            style_padding_top: "100px",
            style_padding_right: "100px",
            style_padding_bottom: "100px",
            style_padding_left: "100px",
        });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{margin-bottom:100px;margin-left:100px;margin-right:100px;margin-top:100px;padding-top:100px;padding-right:100px;padding-bottom:100px;padding-left:100px;}");
            res()
        }, 500))
    });

    it("should add position properties correctly if set", async () => {
        const element = createLWC({ style_position: "absolute", style_top: "100px", style_right: "100px", style_bottom: "100px", style_left: "100px" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{position:absolute;top:100px;right:100px;bottom:100px;left:100px;}");
            res()
        }, 500))
    });

    it("should add text properties correctly if set", async () => {
        const element = createLWC({
            style_text_align: "center",
            style_font_family: "Arial",
            style_font_size: "12px",
            style_font_weight: "bold",
            style_font_style: "italic",
            style_text_align: "center",
            style_text_decoration: "underline",
            style_text_transform: "uppercase",
            style_letter_spacing: "1px",
            style_word_spacing: "1px",
            style_line_height: "1px",
            style_text_overflow: "ellipsis",
            style_white_space: "nowrap",
        });

        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe(".test{font-family:Arial;font-size:12px;font-weight:bold;font-style:italic;text-align:center;text-decoration:underline;text-transform:uppercase;letter-spacing:1px;word-spacing:1px;line-height:1px;text-overflow:ellipsis;white-space:nowrap;}");
            res()
        }, 500))
    })

    it("should add media queries correctly if breakpoints are set", async () => {
        const element = createLWC({ style_display: "none", breakpoint: "Mobile (600px)", breakpointCondition: "Above" });
        await new Promise(res => setTimeout(() => {
            const content = getStyleContent()
            expect(content).toBe("@mediaonlyscreenand(min-width:601px){.test{display:none;}}");
            res()
        }, 500))
    });

});
