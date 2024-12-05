import { NCLContext } from "./NCLContext";
import { NCLElement } from "./NCLElement";
import { NCLLink } from "./NCLLink";
import { NCLMedia } from "./NCLMedia";
import { NCLPort } from "./NCLPort";

export class NCLBody extends NCLElement {
    constructor(body: Element, lineNumber: number, columnNumber: number) {
        super(body, lineNumber, columnNumber);
    }

    findMedia(mediaId: string) {
        const cNodes = this.inner['childNodes'];

        const elementList = this.getElementsRecursively(cNodes, 'media');

        for(let i = 0; i < elementList.length; i++) {
            const childElement = elementList[i];
            if (childElement.id === mediaId) {
                return new NCLMedia(childElement.element, childElement.lineNumber, childElement.columnNumber);
            }
        }

        return null;
    }
}