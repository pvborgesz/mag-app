import { NCLElement } from './NCLElement';

export class NCLConnector extends NCLElement {

    constructor(connector: Element, lineNumber: number, columnNumber: number) {
        super(connector, lineNumber, columnNumber);
    }

    get connectorId(): string | null {
        const regionAttr = this.element.attributes.getNamedItem("region");
        if (regionAttr) {
            return regionAttr.value;
        }
        return null;
    }

    findConnectorParam(paramName: string) {
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "connectorParam") {
                const param = new NCLElement((cNodes[i] as Element), (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber);
                if (param.name === paramName) {
                    return param;
                }
            }
        }

        return null;
    }

    get connectorParams() {
        const connectorParams = [];
        const cNodes = this.inner['childNodes'];

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "connectorParam") {
                connectorParams.push(new NCLElement((cNodes[i] as Element), (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber));
            }
        }

        return connectorParams;
    }

    /*get min(): number | null {
        const minAttr = this.element.attributes.getNamedItem("min");
        if (minAttr) {
            return parseInt(minAttr.value);
        }
        return null;
    }
    
    get max(): number | null {
        const maxAttr = this.element.attributes.getNamedItem("max");
        if (maxAttr) {
            return parseInt(maxAttr.value);
        }
        return null;
    }

    get roleLimits() {
        const cNodes = this.inner['childNodes'];
        const roleLimitsObj = {
            'simpleConditions': new Array(),
            'simpleActions': new Array()
        };

        const conditions = this.conditions;
        const actions = this.actions;

        roleLimitsObj['simpleConditions'].push(conditions['simpleConditions']);
        roleLimitsObj['simpleActions'].push(actions['simpleActions']);

        return roleLimitsObj;
    }*/

    /*getConditionsRecursively(cNode: ChildNode) {
        const conditionList = {
            'simpleConditions': new Array(),
        };

        const simpleConditionNodes = cNode.childNodes;

        for(let i = 0; i < simpleConditionNodes.length; i++) {
            if (simpleConditionNodes[i].nodeName === 'simpleCondition') {
                const simpleCondition = new NCLElement(simpleConditionNodes[i] as Element, (simpleConditionNodes[i] as any).lineNumber, (simpleConditionNodes[i] as any).columnNumber);
    
                const role = simpleCondition.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const max = simpleCondition.inner['attributes'].getNamedItem('max');                        
                const maxValue = max ? max.nodeValue : 1;
                
                const min = simpleCondition.inner['attributes'].getNamedItem('min');
                const minValue = min ? min.nodeValue : 1;
    
                conditionList['simpleConditions'].push({
                    'role': roleValue,
                    'max': maxValue,
                    'min': minValue,
                });
            } else if (simpleConditionNodes[i].nodeName === 'compoundCondition') {
                conditionList['simpleConditions'].push( ...this.getConditionsRecursively(simpleConditionNodes[i])['simpleConditions'] );
            }
            
        }

        return conditionList;
    }*/
    
    /*getActionsRecursively(cNode: ChildNode) {
        const actionList = {
            'simpleActions': new Array(),
        };

        const simpleActionNodes = cNode.childNodes;

        for(let i = 0; i < simpleActionNodes.length; i++) {
            if (simpleActionNodes[i].nodeName === 'simpleAction') {
                const simpleAction = new NCLElement(simpleActionNodes[i] as Element, (simpleActionNodes[i] as any).lineNumber, (simpleActionNodes[i] as any).columnNumber);
    
                const role = simpleAction.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const max = simpleAction.inner['attributes'].getNamedItem('max');                        
                const maxValue = max ? max.nodeValue : 1;
                
                const min = simpleAction.inner['attributes'].getNamedItem('min');
                const minValue = min ? min.nodeValue : 1;
    
                actionList['simpleActions'].push({
                    'role': roleValue,
                    'max': maxValue,
                    'min': minValue,
                });
            } else if (simpleActionNodes[i].nodeName === 'compoundAction') {
                actionList['simpleActions'].push( ...this.getActionsRecursively(simpleActionNodes[i])['simpleActions'] );
            }
            
        }

        return actionList;
    }*/
    
    getRolesRecursively(cNode: ChildNode, simpleElem: string, compoundElem: string) {
        const simpleElems = simpleElem+'s';
        const roleList = {
            [simpleElems]: new Array(),
        };

        const cNodes = cNode.childNodes;

        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === simpleElem) {
                const simpleElement = new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber);
    
                const role = simpleElement.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const max = simpleElement.inner['attributes'].getNamedItem('max');                        
                let maxValue = max ? max.nodeValue : 1;
                
                const min = simpleElement.inner['attributes'].getNamedItem('min');
                let minValue = min ? min.nodeValue : 1;

                if (maxValue === 'unbounded') {
                    maxValue = Number.MAX_SAFE_INTEGER;
                }
                
                if (minValue === 'unbounded') {
                    minValue = 1;
                }
    
                roleList[simpleElems].push({
                    'role': roleValue,
                    'max': maxValue,
                    'min': minValue,
                    'lineNumber': simpleElement.lineNumber,
                    'columnNumber': simpleElement.columnNumber,
                });
            } else if (cNodes[i].nodeName === compoundElem) {
                roleList[simpleElems].push( ...this.getRolesRecursively(cNodes[i], simpleElem, compoundElem)[simpleElems] );
            }
            
        }

        return roleList;
    }

    get conditions() {
        const conditionList = {
            'simpleConditions': new Array(),
        };

        const cNodes = this.inner['childNodes'];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "simpleCondition") {
                const sc = new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber);

                const role = sc.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const max = sc.inner['attributes'].getNamedItem('max');                        
                let maxValue = max ? max.nodeValue : 1;
                
                const min = sc.inner['attributes'].getNamedItem('min');
                let minValue = min ? min.nodeValue : 1;

                if (maxValue === 'unbounded') {
                    maxValue = Number.MAX_SAFE_INTEGER;
                }
                
                if (minValue === 'unbounded') {
                    minValue = 1;
                }

                conditionList['simpleConditions'].push({
                    'role': roleValue,
                    'max': maxValue,
                    'min': minValue,
                    'lineNumber': sc.lineNumber,
                    'columnNumber': sc.columnNumber,
                });
            } else if (cNodes[i].nodeName === 'compoundCondition') {
                // conditionList['simpleConditions'].push( ...this.getConditionsRecursively(cNodes[i])['simpleConditions'] );
                conditionList['simpleConditions'].push( ...this.getRolesRecursively(cNodes[i], 'simpleCondition', 'compoundCondition')['simpleConditions'] );
            }
        }

        return conditionList;
    }

    get actions() {
        const actionList = {
            'simpleActions': new Array(),
        };

        const cNodes = this.inner['childNodes'];
        for(let i = 0; i < cNodes.length; i++) {
            if (cNodes[i].nodeName === "simpleAction") {
                const sa = new NCLElement(cNodes[i] as Element, (cNodes[i] as any).lineNumber, (cNodes[i] as any).columnNumber);

                const role = sa.inner['attributes'].getNamedItem('role');
                const roleValue = role ? role.nodeValue : '';

                const max = sa.inner['attributes'].getNamedItem('max');                        
                let maxValue = max ? max.nodeValue : 1;
                
                const min = sa.inner['attributes'].getNamedItem('min');
                let minValue = min ? min.nodeValue : 1;

                if (maxValue === 'unbounded') {
                    maxValue = Number.MAX_SAFE_INTEGER;
                }
                
                if (minValue === 'unbounded') {
                    minValue = 1;
                }

                actionList['simpleActions'].push({
                    'role': roleValue,
                    'max': maxValue,
                    'min': minValue,
                    'lineNumber': sa.lineNumber,
                    'columnNumber': sa.columnNumber,
                });
            } else if (cNodes[i].nodeName === 'compoundAction') {
                // actionList['simpleActions'].push( ...this.getActionsRecursively(cNodes[i])['simpleActions'] );
                actionList['simpleActions'].push( ...this.getRolesRecursively(cNodes[i], 'simpleAction', 'compoundAction')['simpleActions'] );
            }

        }

        return actionList;
    }

}