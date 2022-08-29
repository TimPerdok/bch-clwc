import { CSSClass } from '../classes/css/CSSClass';
import { ValidationError } from '../CSSValidator';

function format(content) {
    return content.toLowerCase().replace(/\s/g, "");
}

describe("CSS Formatter", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    it("sets properties correctly", () => {
        const config = { "background-color": "rgb(255,255,255)", "border-radius": "10px" }
        const result = { "background-color": "rgb(255,255,255)", "border-radius": "10px" }
        expect(new CSSClass(config, ".test").properties).toStrictEqual(result);
    });

    it("formats correctly", () => {
        const config = { "background-color": "rgb(255,255,255)", "border-radius": "10px" }
        expect(format(new CSSClass(config, ".test").format())).toBe(".test{background-color:rgb(255,255,255);border-radius:10px;}");
    });


    it("validates correctly", async () => {
        const config = { "background-color": "rgb(255,255,255)", "border-radius": "10px" }
        await expect(new CSSClass(config, ".test").validate()).toBeTruthy()
    });

    it("throws an error with faulty config", async () => {
        const config = { "background-color": "rgb(255,255)", "border-radius": "10xx" }
        await expect(()=>{new CSSClass(config, ".test").validate()}).toThrow(ValidationError.class);

    });


});
