export class CreationError extends Error {
  constructor(zodError: string | object) {
    super();
    this.message =
      typeof zodError == 'string' ? zodError : JSON.stringify(zodError);
  }
}
