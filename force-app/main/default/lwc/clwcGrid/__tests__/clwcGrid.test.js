import { createElement } from 'lwc';
import ClwcGrid from '../clwcGrid';


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
    const element = createElement('c-clwc-grid', {
        is: ClwcGrid
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

describe('c-clwc-grid', () => {
    afterEach(() => {
        document.body.innerHTML = ""
        document.head.innerHTML = ""
        jest.clearAllMocks();
    });

    it('should render', () => {
        const element = createLWC()
        expect(element).toBeTruthy()
    })




})