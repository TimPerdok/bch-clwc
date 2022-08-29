import { CSSFormatter } from '../CSSFormatter';

function format(content) {
    return content.toLowerCase().replace(/\s/g, "");
}

describe("CSS Formatter", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("formats shadows correctly", () => {
        const config = { color: "rgb(255,255,255)", horizontal: "10px", blur: "10px", vertical: "10px", spread: "10px", inset: true }
        expect(CSSFormatter.formatShadows(config)).toBe("box-shadow: 10px 10px 10px 10px rgb(255,255,255) inset;")
    });

    it("formats css body correctly", () => {
        const config = { "background-color": "rgb(255,255,255)", "border-radius": "10px" }
        expect(CSSFormatter.formatProperties(config)).toBe("background-color:rgb(255,255,255);border-radius:10px;")
    });

    it("determines the breakpoint condition property correctly", () => {
        expect(CSSFormatter.getBreakpointConditionProperty(true)).toBe("max-width")
        expect(CSSFormatter.getBreakpointConditionProperty(false)).toBe("min-width")
    });

    it("formats a css class correctly", () => {
        expect(format(CSSFormatter.formatClass(".test", CSSFormatter.formatProperties({ "border-radius": "10px" }), true, "700"))).toBe("@mediaonlyscreenand(max-width:700px){.test{border-radius:10px;}}")
    });

});
