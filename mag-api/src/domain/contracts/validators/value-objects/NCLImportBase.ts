import { NCLElement } from './NCLElement';

export class NCLImportBase extends NCLElement {
    constructor(importBase: Element, lineNumber: number, columnNumber: number) {
        super(importBase, lineNumber, columnNumber);
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
    
    get baseId(): string | null {
        const baseIdAttr = this.inner["attributes"].getNamedItem('baseId');
    
        if (baseIdAttr) { return baseIdAttr.nodeValue; }
        return null;
    }
    
    get region(): string | null {
        const regionAttr = this.inner["attributes"].getNamedItem('region');
    
        if (regionAttr) { return regionAttr.nodeValue; }
        return null;
    }
}