
export class ModelConfig {
  private readonly modelName: string;
  private readonly version: string;

  constructor(modelName: string, version: string) {
    this.modelName = modelName;
    this.version = version;
  }

  public getModelName(): string {
    return this.modelName;
  }

  public getVersion(): string {
    return this.version;
  }
}
