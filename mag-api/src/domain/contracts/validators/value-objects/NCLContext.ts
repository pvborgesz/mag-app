import { NCLElement } from "./NCLElement";
import { NCLLink } from "./NCLLink";
import { NCLMedia } from "./NCLMedia";
import { NCLPort } from "./NCLPort";
import { NCLProperty } from "./NCLProperty";

export class NCLContext extends NCLElement {
    constructor(context: Element, lineNumber: number, columnNumber: number) {
        super(context, lineNumber, columnNumber);
    }

    get component() {
        const componentAttr = this.inner["attributes"].getNamedItem('component');

        return componentAttr?.nodeValue;
    }

    get interface() {
        const interfaceAttr = this.inner["attributes"].getNamedItem('interface');

        return interfaceAttr?.nodeValue;
    }

    get childNodes() {
        const cNodes = this.inner['childNodes'];

        const cNodeList: NCLElement[] = [];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                cNodeList.push(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
            }
        }

        return cNodeList;
    }
    
    getParentsRecursively(node: NCLElement): NCLElement[] {
        const pNodeList: NCLElement[] = [];
        const pNode = node.parentNode;

        if (pNode) {
            if (pNode.tagName !== "switch") {
                pNodeList.push(pNode);
            }
            if (pNode.tagName !== "body") {
                pNodeList.push(...this.getParentsRecursively(pNode));
            }
        }

        return pNodeList;
    }

    get parentNodes(): NCLElement[] {
        const pNodeList: NCLElement[] = [];
        const pNode = this.parentNode;

        if (pNode) {
            if (pNode.tagName !== "switch") {
                pNodeList.push(pNode);
            }
            if (pNode.tagName !== "body") {
                pNodeList.push(...this.getParentsRecursively(pNode));
            }
        }


        /*for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
            }
        }*/

        return pNodeList;
    }

    getChildNodesRecursively(node: NCLElement): NCLElement[] {
        const cNodes = node.inner['childNodes'];
    
        const cNodeList: NCLElement[] = [];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                if (cNodes[i].nodeName === 'context') {
                    cNodeList.push(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
                }
                
                if (cNodes[i].hasChildNodes()) {
                    cNodeList.push( ...this.getChildNodesRecursively(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber)) );
                }
            }
        }
    
        return cNodeList;
    }

    get availableRefers() {
        const contextList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            const gpNode: NCLElement | null = pNode.parentNode;

            const contexts = pNode.getElements('context');
            if (gpNode) {

                const outerContexts = gpNode.getElements('context');
                outerContexts.forEach(oc => {
                    if (oc.id !== pNode.id) {
                        contexts.push(oc);
                    }
                });

            }

            for (let i = 0; i < contexts.length; i++) {
                if (!contexts[i].refer && contexts[i].id !== this.id) {
                    contextList.push({
                        'refer': contexts[i],
                    });
                }
            }
        }

        return contextList;
    }
}