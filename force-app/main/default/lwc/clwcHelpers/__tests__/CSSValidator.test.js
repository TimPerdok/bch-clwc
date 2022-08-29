import { CSSValidator, ValidationError } from "../CSSValidator";

describe("CSS Validator", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("validates a css length with an incorrect unit to false", () => {
        expect(() => {
            CSSValidator.validateCSSLength("10xp");
        }).toThrowError(ValidationError.class);
    });

    it("validates spammy css length value to false", () => {
        expect(() => {
            CSSValidator.validateCSSLength("1fafsd033px");
        }).toThrowError(ValidationError.class);
    });

    it("validates correct length input to true", () => {
        expect(CSSValidator.validate("border-bottom-width", "300vw")).toBeTruthy();
    });

    it("validates correct color input to true", () => {
        expect(() => {
            CSSValidator.validateCSSColor("rgb(250      ,250,250,0.5)");
        }).toBeTruthy();
    });

    it("validates spam color input to false", () => {
        expect(() => {
            CSSValidator.validateCSSColor("rgffdb(250343,250,342350,0.5)");
        }).toThrowError(ValidationError.class);
    });

    it("validates too high color input to false", () => {
        expect(() => {
            CSSValidator.validateCSSColor("rgb(-3,255,256,0.5)");
        }).toThrowError(ValidationError.class);
    });

    it("validates too high color input to false", () => {
        expect(() => {
            CSSValidator.validateCSSColor("rgb1,5,6");
        }).toThrowError(ValidationError.class);
    });

    it("sanitizes correctly", () => {
        expect(CSSValidator.sanitize("<script>alert('hacked');</script>rgb(244,244,244,0.5)")).toBe("scriptalert(hacked)scriptrgb(244,244,244,0.5)");
    });

    it("validate wrapper validates colors correctly", () => {
        expect(CSSValidator.validate("background-color", "rgb(244, 0, 0)")).toBeTruthy();
    });

    it("validate wrapper validates wrong length to false", async () => {
        await expect(() => { CSSValidator.validate("margin-top", "fdasdf") }).toThrow(ValidationError.class);
    });
});
