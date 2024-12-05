import { NCLConnector } from './NCLConnector';
import { NCLDescriptor } from './NCLDescriptor';
import { NCLElement } from './NCLElement';
import { NCLRegion } from './NCLRegion';

export class NCLImportNCL extends NCLElement {
    constructor(docBase: Element, lineNumber: number, columnNumber: number) {
        super(docBase, lineNumber, columnNumber);
    }

    get documentURI(): string | null {
        const docUriAttr = this.inner["attributes"].getNamedItem('documentURI');

        if (docUriAttr) { return docUriAttr.nodeValue; }
        return null;
    }
    
    get alias(): string | null {
        const aliasAttr = this.inner["attributes"].getNamedItem('alias');

        if (aliasAttr) { return aliasAttr.nodeValue; }
        return null;
    }
}