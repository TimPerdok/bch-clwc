import { createElement } from 'lwc';
import ClwcCard from '../ClwcCard';

jest.mock(
    "@salesforce/community/basePath",
    () => {
        return {
            basepath: "/path"
        };
    },
    { virtual: true }
);

function createLWC(config = { id: "test" }) {
    const element = createElement('c-clwc-card', {
        is: ClwcCard
    });
    Object.entries(config).map(([key, value]) => {
        element[key] = value
    })
    document.body.appendChild(element);
    return element
}

function findElementById(root, id) {
    return [...root.shadowRoot.querySelectorAll('*')].find(element => {
        return element.id.toLowerCase().includes(id.toLowerCase())
    })
}

describe('c-clwc-card', () => {

    afterEach(() => {
        document.body.innerHTML = ""
        document.head.innerHTML = ""
        jest.clearAllMocks();
    });

    it('should render', () => {
        const element = createLWC()
        expect(element).toBeTruthy()
    })

    it('should render with default props', () => {
        const element = createLWC()
        expect(element.style_padding).toBe("4px")
        expect(element.shadow).toBe("")
        expect(element.style_background_color).toBe("rgb(224, 224, 224)")
        expect(element.style_border_radius).toBe("")
        expect(element.style_height).toBe("")
    })



})