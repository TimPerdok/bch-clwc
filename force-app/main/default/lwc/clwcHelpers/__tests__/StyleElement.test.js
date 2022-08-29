import {StyleElement} from '../classes/dom/StyleElement';

function format(content) {
    return content.toLowerCase().replace(/\s/g, "");
}

describe("CSS Formatter", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    it("creates a style element", async () => {
        new StyleElement("testid").place("content")
        expect(document.head.innerHTML).toContain("testid");
    });


});
