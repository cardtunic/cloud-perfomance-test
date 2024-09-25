export default class ServerRateLimitedError {
  public timeout: number;

  constructor(timeout: number) {
    this.timeout = timeout;
  }

  public flatten() {
    return {
      success: false,
      timeout: this.timeout,
    };
  }
}
