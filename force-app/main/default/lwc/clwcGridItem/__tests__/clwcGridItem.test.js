import { createElement } from 'lwc';
import ClwcGridItem from '../clwcGridItem';

jest.mock(
    "@salesforce/community/basePath",
    () => {
        return {
            basepath: "/path"
        };
    },
    { virtual: true }
);


function createLWC(config = {}) {
    const element = createElement('c-clwc-grid-item', {
        is: ClwcGridItem
    });
    Object.entries(config).map(([key, value]) => {
        element[key] = value
    })
    element.id = "test"
    document.body.appendChild(element);
    return element
}


function findElementById(root, id) {
    return [...root.shadowRoot.querySelectorAll('*')].find(element => {
        return element.id.toLowerCase().includes(id.toLowerCase())
    })
}

describe('c-clwc-grid-item', () => {
    afterEach(() => {
        document.body.innerHTML = ""
        document.head.innerHTML = ""
        jest.clearAllMocks();
    });

    it("renders itself", () => {
        const element = createLWC();
        expect(element).toBeTruthy();
    });

})