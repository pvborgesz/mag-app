import { NCLElement } from './NCLElement';
import { NCLRegion } from './NCLRegion';
import { NCLRegionBase } from './NCLRegionBase';

export class NCLDescriptor extends NCLElement {
    #region: NCLRegion | null = null;

    constructor(descriptor: Element, lineNumber: number, columnNumber: number) {
        super(descriptor, lineNumber, columnNumber);
    }

    get regionId(): string | null {
        const regionAttr = this.element.attributes.getNamedItem("region");
        if (regionAttr) {
            return regionAttr.value;
        }
        return null;
    }

    set regionId(r : NCLRegion) {
        this.#region = r;
    }
}