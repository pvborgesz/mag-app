import { NCLElement } from "./NCLElement";
import { NCLMedia } from "./NCLMedia";

export class NCLSwitchPort extends NCLElement{
    constructor(switchport: Element, lineNumber: number, columnNumber: number) {
        super(switchport, lineNumber, columnNumber);
    }

}