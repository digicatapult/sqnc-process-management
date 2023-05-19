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

export class VersionError extends Error {
  constructor(version: number, expected: number, name: string) {
    super(`Process version ${version} is invalid. If you are trying to create a new version of process ${name} version should be ${expected}`)
    Object.setPrototypeOf(this, VersionError.prototype)
  }
}

export class ProgramError extends Error {
  process?: Process.Payload
  constructor(m: string, process?: Process.Payload) {
    super(m)
    this.process = process
    Object.setPrototypeOf(this, ProgramError.prototype)
  }
}

