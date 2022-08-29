import { createElement } from "lwc";
import ClwcTabs from "../ClwcTabs";
jest.mock("@salesforce/community/basePath", () => { return { basepath: "/path" }; }, { virtual: true });
function createLWC(config = {}, className = "test", id = "test") {
    const element = createElement("c-clwc-tabs", {
        is: ClwcTabs,
    });
    element.className = className;
    element['data-component-id'] = id
    Object.entries(config).map(([key, value]) => {
        element[key] = value;
    });
    document.body.appendChild(element);

    return element;
}

function getElement() {
    return document.head.children[0]
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

describe("c-clwc-tabs", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        jest.clearAllMocks();
    });

    it("renders itself", () => {
        const element = createLWC();
        expect(element).toBeTruthy();
    })


});
