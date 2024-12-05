import { NCLElement } from "./NCLElement";
import { NCLMedia } from "./NCLMedia";

export class NCLSwitch extends NCLElement{
    constructor(swt: Element, lineNumber: number, columnNumber: number) {
        super(swt, lineNumber, columnNumber);
    }

    get component() {
        const componentAttr = this.inner["attributes"].getNamedItem('component');

        return componentAttr?.nodeValue;
    }

    get refer() {
        const referAttr = this.inner["attributes"].getNamedItem('refer');

        if (referAttr) { return referAttr.nodeValue; }
        return null;
    }

    get availableComponents() {
        const componentList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            const medias = pNode.getElements('media');
            const contexts = pNode.getElements('context');
            const switches = pNode.getElements('switch');

            for (let i = 0; i < medias.length; i++) {
                componentList.push({
                    'component': medias[i],
                    'interfaces': new Array()
                });
            }
            for (let i = 0; i < contexts.length; i++) {
                componentList.push({
                    'component': contexts[i],
                    'interfaces': new Array()
                });
            }
            for (let i = 0; i < switches.length; i++) {
                componentList.push({
                    'component': switches[i],
                    'interfaces': new Array()
                });
            }
        }

        return componentList;
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
            if (pNode.tagName === "switch") {
                pNodeList.push(pNode);
            }
            if (pNode.tagName !== "body") {
                pNodeList.push(...this.getParentsRecursively(pNode));
            }
        }

        return pNodeList;
    }

    getChildNodesRecursively(node: NCLElement): NCLElement[] {
        const cNodes = node.inner['childNodes'];
    
        const cNodeList: NCLElement[] = [];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                if (cNodes[i].nodeName === 'switch') {
                    cNodeList.push(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
                }
                
                if (cNodes[i].hasChildNodes()) {
                    cNodeList.push( ...this.getChildNodesRecursively(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber)) );
                }
            }
        }
    
        return cNodeList;
    }

    get parentNodes(): NCLElement[] {
        const pNodeList: NCLElement[] = [];
        const pNode = this.parentNode;

        if (pNode) {
            if (pNode.tagName === "switch") {
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

    get availableRefers() {
        const referList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            const gpNode: NCLElement | null = pNode.parentNode;
            const switches = pNode.getElements('switch');

            if (gpNode) {

                const outerSwitches = gpNode.getElements('switch');
                outerSwitches.forEach(os => {
                    if (os.id !== pNode.id) {
                        switches.push(os);
                    }
                });

            }

            for (let i = 0; i < switches.length; i++) {
                if (!switches[i].refer && switches[i].id !== this.id) {
                    referList.push({
                        'refer': switches[i],
                    });
                }
            }
        }

        return referList;
    }

    get availableRefs() {
        const componentList = this.availableComponents;

        componentList.forEach(component => {
            switch (component['component'].tagName) {
                case 'media':
                    if (!component['component'].inner['isEmpty']) {
                        const areas = component['component'].getElements('area');
                        const props = component['component'].getElements('property');

                        component['interfaces'].push(...areas);
                        component['interfaces'].push(...props);
                    }
                    break;
                case 'context':
                    component['interfaces'].push(...component['component'].getElements('port'));
                    break;
                case 'switch':
                    component['interfaces'].push(...component['component'].getElements('switchPort'));
                    break;
            }
        });

        return componentList;
    }

    get interface() {
        const interfaceAttr = this.inner["attributes"].getNamedItem('interface');

        return interfaceAttr?.nodeValue;
    }
}