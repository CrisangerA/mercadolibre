export class BadRequestError extends Error {
  constructor(message: string){
    super(message);
    this.name = 'Bad request';
    this.message = message;
  }
}

export class InternalServerError extends Error {
  constructor(message: string){
    super(message);
    this.name = 'Internal server error';
    this.message = message;
  }
}
