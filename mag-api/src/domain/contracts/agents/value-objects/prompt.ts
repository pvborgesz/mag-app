export class Prompt {
  private readonly value: string

  constructor(value: string) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Invalid prompt value')
    }
    this.value = value
  }

  public getValue(): string {
    return this.value
  }
}
