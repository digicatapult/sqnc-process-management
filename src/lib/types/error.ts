export class DisableError extends Error {
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, DisableError.prototype)
  }
}

export class HexError extends Error {
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, HexError.prototype)
  }
}

export class ProgramError extends Error {
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, ProgramError.prototype)
  }
}

