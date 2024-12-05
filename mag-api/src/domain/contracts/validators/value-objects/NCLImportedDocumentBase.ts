import { NCLElement } from './NCLElement';
import { NCLImportNCL } from './NCLImportNCL';

export class NCLImportedDocumentBase extends NCLElement {
    constructor(docBase: Element, lineNumber: number, columnNumber: number) {
        super(docBase, lineNumber, columnNumber);
    }

    get nclImports() : NCLImportNCL [] {
        const importList: NCLImportNCL [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                const elem: any = cNodes[i] as Element;
                importList.push(new NCLImportNCL(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return importList;
    }
}
