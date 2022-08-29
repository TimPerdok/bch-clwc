import { ConfigurableComponent } from '../classes/components/ConfigurableComponent';
import { createElement } from 'lwc';

function format(content) {
    return content.toLowerCase().replace(/\s/g, "");
}
function createLWC(config = {}) {
    const element = createElement('c-config-component', {
        is: ConfigurableComponent
    });
    Object.entries(config).map(([key, value]) => {
        element[key] = value
    })
    element.id = "test"
    document.body.appendChild(element);
    return element
}


describe("ConfigurableComponent", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render", () => {
        const element = createLWC();
        expect(element).toBeTruthy()
    })

});
