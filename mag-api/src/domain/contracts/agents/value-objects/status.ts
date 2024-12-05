export class Status {
  private readonly value: string;
  private static validStatuses = ['active', 'inactive', 'pending'];

  constructor(value: string) {
    if (!Status.validStatuses.includes(value)) {
      throw new Error('Invalid status value');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
