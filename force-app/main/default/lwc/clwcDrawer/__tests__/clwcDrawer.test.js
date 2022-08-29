import { createElement } from 'lwc';
import ClwcDrawer from '../clwcDrawer';

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
    const element = createElement('c-clwc-drawer', {
        is: ClwcDrawer
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
        expect(element.className).toBe("")
        expect(element.drawerWidth).toBe("300px")
        expect(element.overlayOpacity).toBe("0.3")
    })

    it('should add styling to its first body parent', () => {
        const element = createLWC()
        setTimeout(500, () => {
            expect(document.body.style.cssText.length > 1).toBeTruthy()
        })
    })


})