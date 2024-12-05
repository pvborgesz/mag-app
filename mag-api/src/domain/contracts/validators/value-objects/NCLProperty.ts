import { NCLElement } from "./NCLElement";

export class NCLProperty extends NCLElement{
    constructor(property: Element, lineNumber: number, columnNumber: number) {
        super(property, lineNumber, columnNumber);
    }
}