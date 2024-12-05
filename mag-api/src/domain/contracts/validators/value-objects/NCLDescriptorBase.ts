import { NCLDescriptor } from './NCLDescriptor';
import { NCLElement } from './NCLElement';
import { NCLImportBase } from './NCLImportBase';
import { NCLRegion } from './NCLRegion';

export class NCLDescriptorBase extends NCLElement {
    constructor(descriptor: Element, lineNumber: number, columnNumber: number) {
        super(descriptor, lineNumber, columnNumber);
    }

    get descriptors() : NCLDescriptor [] {
        const descList: NCLDescriptor [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1 && cNodes[i].nodeName === "descriptor") {
                const elem: any = cNodes[i] as Element;
                descList.push(new NCLDescriptor(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return descList;
    }

    get baseImports(): NCLImportBase[] {
        const importList: NCLImportBase [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1 && cNodes[i].nodeName === "importBase") {

                const elem: any = cNodes[i] as Element;
                importList.push(new NCLImportBase(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return importList;
    }

    findDescriptor(descriptorId: string): NCLDescriptor | null {
        const descriptorList = this.descriptors;

        for (let i = 0; i < descriptorList.length; i++) {
            if (descriptorList[i].element.nodeType === 1) { // 1 == ELEMENT_NODE
                if (descriptorList[i].id === descriptorId) { 
                    return descriptorList[i];
                }
            }
        }

        return null;
    }
}