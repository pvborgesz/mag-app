import { NCLElement } from "./NCLElement";

export class NCLRegion extends NCLElement{
    constructor(region: Element, lineNumber: number, columnNumber: number) {
        super(region, lineNumber, columnNumber);
    }
}