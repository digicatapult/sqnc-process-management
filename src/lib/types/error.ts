  export class NoValidRestrictionsError extends Error {
    constructor(m: string) {
      super(m);
      Object.setPrototypeOf(this, NoValidRestrictionsError.prototype);
    }
  }

  export class HexError extends Error {
    constructor(m: string) {
      super(m);
      Object.setPrototypeOf(this, HexError.prototype);
    }
  }

  export class VersionError extends Error {
    constructor(m: string) {
      super(m);
      Object.setPrototypeOf(this, VersionError.prototype);
    }
  }