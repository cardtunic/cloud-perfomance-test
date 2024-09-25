export default class ServerError {
  constructor() {}

  public flatten() {
    return {
      success: false,
      ServerError: true,
    };
  }
}
