import { NCLElement } from "./NCLElement";
import { NCLMedia } from "./NCLMedia";

export class NCLDefaultComponent extends NCLElement{
    constructor(defaultComponent: Element, lineNumber: number, columnNumber: number) {
        super(defaultComponent, lineNumber, columnNumber);
    }

    get component() {
        const componentAttr = this.inner["attributes"].getNamedItem('component');

        return componentAttr?.nodeValue;
    }

    get availableComponents() {
        const componentList = [];
        const pNode: NCLElement | null = this.parentNode;
        // console.log(pNode);
        if(pNode) {
            switch(pNode.tagName) {
                case 'switch':
                    const medias = pNode.getElements('media');
                    const contexts = pNode.getElements('context');
                    const switches = pNode.getElements('switch');
                    const effects = pNode.getElements('effect');
        
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
                    for (let i = 0; i < effects.length; i++) {
                        componentList.push({
                            'component': effects[i],
                            'interfaces': new Array()
                        });
                    }
                    break;
                case 'descriptorSwitch':
                    const descriptors = pNode.getElements('descriptor');
                    for (let i = 0; i < descriptors.length; i++) {
                        componentList.push({
                            'component': descriptors[i],
                        });
                    }
                    break;
            }
        }

        return componentList;
    }
}