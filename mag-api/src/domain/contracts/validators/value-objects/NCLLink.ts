import { NCLBind } from "./NCLBind";
import { NCLConnector } from "./NCLConnector";
import { NCLElement } from "./NCLElement";

export class NCLLink extends NCLElement {
    constructor(link: Element, lineNumber: number, columnNumber: number) {
        super(link, lineNumber, columnNumber);
    }

    get bindings(): NCLBind[] {
        const cNodes = this.inner['childNodes'];
        const bindList: NCLBind[] = [];
        let _;

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeType === 1) {
                const elem = cNodes[i] as Element;

                elem.tagName === "link" ? bindList.push(new NCLBind( elem, (elem as any).lineNumber, (elem as any).columnNumber )) : _ = '';
            }
        }
        return bindList;
    }

    get linkParams() {
        const linkParams = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "linkParam") {
                linkParams.push(new NCLElement((cNodes[i] as Element), (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
            }
        }

        return linkParams;
    }

    get connectorId(): string | null {
        const connectorAttr = this.inner['attributes'].getNamedItem("xconnector");
        if (connectorAttr) {
            return connectorAttr.value;
        }
        return null;
    }

    get currentRoles() {
        const roles = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "bind") {
                const bind = new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber);

                const role = bind.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const result: any = roles.find(elem => {
                    return elem['role'] === roleValue;
                });

                if (result) {
                    for (let i = 0; i < roles.length; i++) {
                        const roleObj = roles[i];
                        if(roleObj['role'] === result['role']) {
                            roleObj['count'] += 1;
                            break;
                        }
                    }
                    // result['count'] += 1;
                } else {
                    roles.push({
                        'role': roleValue,
                        'count': 1
                    });
                }
                
                // console.log(obj);
            }
        }
        
        return roles;
    }
}