import { NCLArea } from "./NCLArea";
import { NCLElement } from "./NCLElement";
import { NCLProperty } from "./NCLProperty";

export class NCLMedia extends NCLElement{
    constructor(media: Element, lineNumber: number, columnNumber: number) {
        super(media, lineNumber, columnNumber);
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
        const mediaList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            const gpNode: NCLElement | null = pNode.parentNode;
            const medias = pNode.getElements('media');

            if (gpNode) {
                const outerMedias = gpNode.getElements('media');
                outerMedias.forEach(om => {
                    if (om.id !== pNode.id) { // Elementos dentro do elemento Avô (excluindo o próprio <media> Pai)
                        medias.push(om);
                    }
                });
            }

            for (let i = 0; i < medias.length; i++) {
                if (!medias[i].refer && medias[i].id !== this.id) { // Elementos dentro do elemento Pai que não reusam outro (excluindo o próprio <media> atual)
                    mediaList.push({
                        'refer': medias[i],
                    });
                }
            }
        }

        return mediaList;
    }
}