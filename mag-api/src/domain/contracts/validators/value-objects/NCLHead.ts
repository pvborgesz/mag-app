import { NCLConnectorBase } from "./NCLConnectorBase";
import { NCLDescriptorBase } from "./NCLDescriptorBase";
import { NCLElement } from "./NCLElement";
import { NCLImportedDocumentBase } from "./NCLImportedDocumentBase";
import { NCLRegionBase } from "./NCLRegionBase";

export class NCLHead extends NCLElement{
    constructor(head: Element, lineNumber: number, columnNumber: number) {
        super(head, lineNumber, columnNumber);
    }

    getBasesAlias(): string[] {
        const elementList: string[] = [];

        const regionBases = this.regionBases;
        const descriptorBases = this.descriptorBases;
        const connectorBases = this.connectorBases;
        const importedDocumentBases = this.importedDocumentBases;

        let _;

        for(let i = 0; i < regionBases.length; i++) {
            const cNodes = regionBases[i].inner['childNodes'];
            for(let j = 0; j < cNodes.length; j++) {
                if (cNodes[j].nodeName === "importBase") {
                    const elem: any = cNodes[j] as Element;
                    
                    elem.attributes?.getNamedItem('alias') ? elementList.push(elem.attributes?.getNamedItem('alias').nodeValue) : _ = '';
                }
            }
        }

        for(let i = 0; i < descriptorBases.length; i++) {
            const cNodes = descriptorBases[i].inner['childNodes'];
            for(let j = 0; j < cNodes.length; j++) {
                if (cNodes[j].nodeName === "importBase") {
                    const elem: any = cNodes[j] as Element;
                    
                    elem.attributes?.getNamedItem('alias') ? elementList.push(elem.attributes?.getNamedItem('alias').nodeValue) : _ = '';
                }
            }
        }

        for(let i = 0; i < connectorBases.length; i++) {
            const cNodes = connectorBases[i].inner['childNodes'];
            for(let j = 0; j < cNodes.length; j++) {
                if (cNodes[j].nodeName === "importBase") {
                    const elem: any = cNodes[j] as Element;
                    
                    elem.attributes?.getNamedItem('alias') ? elementList.push(elem.attributes?.getNamedItem('alias').nodeValue) : _ = '';
                }
            }
        }
        
        for(let i = 0; i < importedDocumentBases.length; i++) {
            const cNodes = importedDocumentBases[i].inner['childNodes'];
            for(let j = 0; j < cNodes.length; j++) {
                if (cNodes[j].nodeName === "importNCL") {
                    const elem: any = cNodes[j] as Element;
                    
                    elem.attributes?.getNamedItem('alias') ? elementList.push(elem.attributes?.getNamedItem('alias').nodeValue) : _ = '';
                }
            }
        }

        return elementList;
    }

    get importedDocumentBases(): NCLImportedDocumentBase[] {
        const cNodes = this.inner['childNodes'];
        const bases = [];

        for (let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) { // 1 == Node.ELEMENT_NODE
                const elem: any = cNodes[i] as Element;
                if (elem.tagName === "importedDocumentBase") {
                    bases.push(new NCLImportedDocumentBase(elem, elem.lineNumber, elem.columnNumber));
                }
            } 
        }

	    return bases;
    }

    get regionBases(): NCLRegionBase[] {
        const cNodes = this.inner['childNodes'];
        const bases = [];

        for (let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) { // 1 == Node.ELEMENT_NODE
                const elem: any = cNodes[i] as Element;
                if (elem.tagName === "regionBase") {
                    bases.push(new NCLRegionBase(elem, elem.lineNumber, elem.columnNumber));
                }
            } 
        }

	    return bases;
    }

    get descriptorBases(): NCLDescriptorBase[] {
        const cNodes = this.inner['childNodes'];
        const bases = [];

        for (let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) { // 1 == Node.ELEMENT_NODE
                const elem: any = cNodes[i] as Element;
                if (elem.tagName === "descriptorBase") {
                    bases.push(new NCLDescriptorBase(elem, elem.lineNumber, elem.columnNumber));
                }
            } 
        }
	    
	    return bases;
    }

    get connectorBases(): NCLConnectorBase[] {
        const cNodes = this.inner['childNodes'];
        const bases = [];

        for (let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) { // 1 == Node.ELEMENT_NODE
                const elem: any = cNodes[i] as Element;
                if (elem.tagName === "connectorBase") {
                    bases.push(new NCLConnectorBase(elem, elem.lineNumber, elem.columnNumber));
                }
            } 
        }
	    
	    return bases;
    }
    
    get importedDocumentBase(): NCLImportedDocumentBase | null {
        const cNodes = this.inner['childNodes'];

        for (let i = 0; i < cNodes.length; i++) {

            if (cNodes[i].nodeType === 1) { // 1 == Node.ELEMENT_NODE
                const elem: any = cNodes[i] as Element;
                if (elem.tagName === "importedDocumentBase") {
                    return new NCLImportedDocumentBase(elem, elem.lineNumber, elem.columnNumber);
                }
            }

        }
	    
	    return null;
    }
}