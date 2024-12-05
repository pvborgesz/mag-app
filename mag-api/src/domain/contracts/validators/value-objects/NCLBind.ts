import { NCLConnector } from "./NCLConnector";
import { NCLConnectorBase } from "./NCLConnectorBase";
import { NCLElement } from "./NCLElement";
import { NCLLink } from "./NCLLink";

export class NCLBind extends NCLElement {
    constructor(bind: Element, lineNumber: number, columnNumber: number) {
        super(bind, lineNumber, columnNumber);
    }

    get descriptorId(): string | null {
        const descriptorAttr = this.inner['attributes'].getNamedItem("descriptor");
        if (descriptorAttr) {
            return descriptorAttr.value;
        }
        return null;
    }

    get availableComponents() {
        const componentList = [];
        const link: NCLElement | null = this.parentNode;

        // console.log(pNode);
        if(link) {
            const pNode: NCLElement | null = link.parentNode;

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

                componentList.push({
                    'component': pNode,
                    'interfaces': new Array()
                });
            }
        }

        return componentList;
    }

    get availableRefs() { // âncoras de cada elemento
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

    get parentLink() { 
        const link: NCLElement | null = this.parentNode;
        if (link) {
            const linkObj: NCLLink = new NCLLink(link.element, link.lineNumber, link.columnNumber);
            return linkObj;
        }
        return null;
    }

    get bindParams() {
        const bindParams = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "bindParam") {
                bindParams.push(new NCLElement((cNodes[i] as Element), (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
            }
        }

        return bindParams;
    }

    getAvailableRoles(connectorBase: NCLConnectorBase | null) {
        if (connectorBase) {
            const roles = {
                'simpleConditions': new Array(),
                'simpleActions': new Array()
            };
    
            const link = this.parentLink;
    
            if(link) {
                // const linkObj: NCLLink = new NCLLink(link.element, link.lineNumber, link.columnNumber);
    
                let connector: NCLConnector | null;
                const connectorId = link.connectorId;
                if (connectorId && connectorId.indexOf("#") > -1) { // conector importado
                    const splitId: string[] = link.connectorId.split("#");

                    connector = connectorBase.findConnector(splitId[1]);
                } else {
                    // console.log(linkObj.connectorId);
                    connector = connectorBase.findConnector(connectorId ? connectorId : '');
                }

                if(connector) {
                    const conditions = connector.conditions;
                    const actions = connector.actions;

                    /*console.log(conditions);
                    console.log(actions);*/
    
                    roles['simpleActions'].push(...actions['simpleActions']);
                    roles['simpleConditions'].push(...conditions['simpleConditions']);
                }
            }
    
            return roles;
        }

        return null;
    }

    get component() {
        const componentAttr = this.inner["attributes"].getNamedItem('component');

        return componentAttr?.nodeValue;
    }

    get interface() {
        const interfaceAttr = this.inner["attributes"].getNamedItem('interface');

        return interfaceAttr?.nodeValue;
    }
}