import { NCLElement } from "./NCLElement";
import { NCLMedia } from "./NCLMedia";

export class NCLMapping extends NCLElement{
    constructor(mapping: Element, lineNumber: number, columnNumber: number) {
        super(mapping, lineNumber, columnNumber);
    }

    get component() {
        const componentAttr = this.inner["attributes"].getNamedItem('component');

        return componentAttr?.nodeValue;
    }

    get availableComponents() {
        const componentList = [];
        const switchPort: NCLElement | null = this.parentNode;

        if (switchPort) {
            const pNode: NCLElement | null = switchPort.parentNode;
            // console.log(pNode);
            if(pNode) {
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
            }
        }

        return componentList;
    }

    get availableRefs() {
        const componentList = this.availableComponents;

        componentList.forEach(component => {
            switch (component['component'].tagName) {
                case 'media':
                    if (!component['component'].inner['isEmpty']) {
                        const areas = component['component'].getElements('area');
                        // const props = component['component'].getElements('property');

                        component['interfaces'].push(...areas);
                        // component['interfaces'].push(...props);
                    }
                    break;
                case 'context':
                    component['interfaces'].push(...component['component'].getElements('port'));
                    break;
                case 'switch':
                    component['interfaces'].push(...component['component'].getElements('switchPort'));
                    break;
                case 'effect':
                    if (!component['component'].inner['isEmpty']) {
                        const areas = component['component'].getElements('area');
                        // const props = component['component'].getElements('property');

                        component['interfaces'].push(...areas);
                        // component['interfaces'].push(...props);
                    }
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