import { NCLElement } from "./NCLElement";
import { NCLImportBase } from "./NCLImportBase";
import { NCLRegion } from "./NCLRegion";

export class NCLRegionBase extends NCLElement{
    constructor(region: Element, lineNumber: number, columnNumber: number) {
        super(region, lineNumber, columnNumber);
    }

    #getInnerNodes(cNodes: NodeList): NCLRegion [] {
        const regionList: NCLRegion [] = [];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].childNodes) {
                regionList.push(...this.#getInnerNodes(cNodes[i].childNodes)); // Recursão para capturar regions que estão dentro de regions
            }
            
            if (cNodes[i].nodeType === 1) {
                const elem: any = cNodes[i] as Element;
                regionList.push(new NCLRegion(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return regionList;
    }

    get regions() : NCLRegion [] {
        const regionList: NCLRegion [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {

                const elem: any = cNodes[i] as Element;

                if (elem.childNodes.length > 0) {
                    regionList.push(...this.#getInnerNodes(elem.childNodes));
                }

                regionList.push(new NCLRegion(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return regionList;
    }

    get baseImports(): NCLImportBase[] {
        const importList: NCLImportBase [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1 && cNodes[i].nodeName === "importBase") {
                // console.log("Entrou aq!!!");
                const elem: any = cNodes[i] as Element;
                importList.push(new NCLImportBase(elem, elem.lineNumber, elem.columnNumber));
            }
        }

        return importList;
    }

    findRegion(regionId: string): NCLRegion | null {
        const regionList = this.regions;

        for (let i = 0; i < regionList.length; i++) {
            if (regionList[i].element.nodeType === 1) { // 1 == ELEMENT_NODE
                if (regionList[i].id === regionId) { 
                    return regionList[i];
                }
            }
        }

        return null;
    }
}