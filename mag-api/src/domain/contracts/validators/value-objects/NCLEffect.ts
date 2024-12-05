import { NCLElement } from "./NCLElement";
import { NCLProperty } from "./NCLProperty";

export class NCLEffect extends NCLElement{
    constructor(effect: Element, lineNumber: number, columnNumber: number) {
        super(effect, lineNumber, columnNumber);
    }

    get descriptorId(): string | null {
        const descriptorAttr = this.inner['attributes'].getNamedItem("descriptor");
        if (descriptorAttr) {
            return descriptorAttr.value;
        }
        return null;
    }

    get childNodes() {
        const cNodes = this.inner['childNodes'];

        const cNodeList: NCLElement[] = [];
        if (cNodes) {
            for(let i = 0; i < cNodes.length; i++) {
                if (cNodes[i].nodeType === 1) {
                    cNodeList.push(new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
                }
            }
        }

        return cNodeList;
    }

    get availableRefers() {
        const effectList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            const gpNode: NCLElement | null = pNode.parentNode;
            const effects = pNode.getElements('effect');

            if (gpNode) {
                const outerEffects = gpNode.getElements('effect');
                outerEffects.forEach(oe => {
                    if (oe.id !== pNode.id) { // Elementos dentro do elemento Avô (excluindo o próprio <effect> Pai)
                        effects.push(oe);
                    }
                });
            }

            for (let i = 0; i < effects.length; i++) {
                if (!effects[i].refer && effects[i].id !== this.id) { // Elementos dentro do elemento Pai que não reusam outro (excluindo o próprio <effect> atual)
                    effectList.push({
                        'refer': effects[i],
                    });
                }
            }
        }

        return effectList;
    }
}