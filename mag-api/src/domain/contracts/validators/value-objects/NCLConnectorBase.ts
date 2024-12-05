import { NCLConnector } from './NCLConnector';
import { NCLElement } from './NCLElement';
import { NCLImportBase } from './NCLImportBase';

export class NCLConnectorBase extends NCLElement {
    constructor(connector: Element, lineNumber: number, columnNumber: number) {
        super(connector, lineNumber, columnNumber);
    }

    get connectors() : NCLConnector [] {
        const descList: NCLConnector [] = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                const elem: any = cNodes[i] as Element;
                descList.push(new NCLConnector(elem, elem.lineNumber, elem.columnNumber));
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

    findConnector(connectorId: string): NCLConnector | null {
        const connectorList = this.connectors;

        for (let i = 0; i < connectorList.length; i++) {
            if (connectorList[i].element.nodeType === 1) { // 1 == ELEMENT_NODE
                if (connectorList[i].id === connectorId) { 
                    return connectorList[i];
                }
            }
        }

        return null;
    }
}