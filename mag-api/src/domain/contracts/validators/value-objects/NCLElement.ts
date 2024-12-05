export class NCLElement {
    constructor(public element: Element, public lineNumber: number, public columnNumber: number) {
        this.element = element;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }

    getChildNodesRecursively(node: NCLElement): NCLElement[] {
        const cNodes = node.inner['childNodes'];
    
        const cNodeList: NCLElement[] = [];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                cNodeList.push(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
                if (cNodes[i].hasChildNodes()) {
                    cNodeList.push( ...this.getChildNodesRecursively(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber)) );
                }
            }
        }
    
        return cNodeList;
    }

    getChildrenIDRecursively(cNodes: NodeList): string[] {
        const elementList: string[] = [];
        let _;

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                const elem: any = cNodes[i] as Element;
                
                elem.attributes?.getNamedItem('id') ? elementList.push(elem.attributes?.getNamedItem('id').nodeValue) : _ = '';
    
                if (cNodes[i].childNodes) {
                    elementList.push(...this.getChildrenIDRecursively(cNodes[i].childNodes)); // Recursão
                }
                
                /*if (elem.attributes?.getNamedItem('refer')) {

                }*/
            }
        }

        return elementList;
    }

    getElementsRecursively(cNodes: NodeList, tagName: string): NCLElement [] {
        const elementList: NCLElement [] = [];
        let _;

        for(let i = 0; i < cNodes.length; i++) {
            const elem: any = cNodes[i] as Element;

            elem.tagName === tagName ? elementList.push(new NCLElement(elem, elem.lineNumber, elem.columnNumber)) : _ = '';

            if (cNodes[i].childNodes) {
                elementList.push(...this.getElementsRecursively(cNodes[i].childNodes, tagName)); // Recursão
            }
        }

        return elementList;
    }

    appendChild(node: Node) {
        this.element.appendChild(node.cloneNode(true));
    }

    getElements(tagName: string): NCLElement[] {
        const cNodes = this.inner['childNodes'];
        const elementList: NCLElement[] = [];
        let _;

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                const elem = cNodes[i] as Element;

                elem.tagName === tagName ? elementList.push(new NCLElement( elem, (elem as any).lineNumber, (elem as any).columnNumber )) : _ = '';
            }
        }
        return elementList;
    }

    get refer() {
        const referAttr = this.inner["attributes"]?.getNamedItem('refer');

        if (referAttr) { return referAttr.nodeValue; }
        return null;
    }

    get parentNode(): NCLElement | null {
        const pNode = this.element.parentNode as Element;

        if (pNode) {
            return new NCLElement(pNode, (pNode as any).lineNumber, (pNode as any).columnNumber);
            /*switch(pNode.nodeName) {
                case 'context':
                    return new NCLContext(pNode, (pNode as any).lineNumber, (pNode as any).columnNumber);
                case 'body':
                    return new NCLBody(pNode, (pNode as any).lineNumber, (pNode as any).columnNumber);
                default:
                    return null;
            }*/
        }

        return null;
    }

    get inner() {
        return {
            'childNodes': this.element.childNodes,
            'isEmpty': this.element.childNodes?.length <= 1 ? true : false,
            'attributes': this.element.attributes,
        };
    }

    get tagName() {
        return this.element.tagName;
    }

    get id(): string | null {
        const idAttr = this.inner['attributes']?.getNamedItem('id');

        if (idAttr) { return idAttr.nodeValue; }
        return null;
    }

    get name(): string | null {
        const idAttr = this.inner['attributes']?.getNamedItem('name');

        if (idAttr) { return idAttr.nodeValue; }
        return null;
    }

    /*get component(): string | null {

    }

    get interface(): string | null {
        
    }*/
}