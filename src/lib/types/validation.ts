import { z } from 'zod'
import { Constants } from '../process/constants.js'

const tokenMetadataKey = z.string()
const tokenId = z.number()
const file = z.string()
const metadataValue = z.union([
  z.object({ File: file }),
  z.object({ Literal: z.string() }),
  z.object({ TokenId: tokenId }),
  z.object({ None: z.null() }),
])
const metadataValueType = z.enum(['File', 'Literal', 'TokenId', 'None'])
const role = z.enum([
  'Owner',
  'Customer',
  'AdditiveManufacturer',
  'Laboratory',
  'Buyer',
  'Supplier',
  'Reviewer',
  'Optimiser',
  'MemberA',
  'MemberB',
])

const binaryOperator = z.enum([
  'Identity',
  'TransferL',
  'TransferR',
  'NotL',
  'NotR',
  'And',
  'Nand',
  'Or',
  'Nor',
  'Xor',
  'Xnor',
  'ImplicationL',
  'ImplicationR',
  'InhibitionL',
  'InhibitionR',
])

const none = z.object({})
const fail = z.object({})

const senderHasInputRole = z.object({
  index: z.number(),
  roleKey: role,
})

const senderHasOutputRole = z.object({
  index: z.number(),
  roleKey: role,
})

const outputHasRole = z.object({
  index: z.number(),
  roleKey: role,
})

const outputHasMetadata = z.object({
  index: z.number(),
  metadataKey: tokenMetadataKey,
})

const inputHasRole = z.object({
  index: z.number(),
  roleKey: role,
})

const inputHasMetadata = z.object({
  index: z.number(),
  metadataKey: tokenMetadataKey,
})

const matchInputOutputRole = z.object({
  inputIndex: z.number(),
  inputRoleKey: role,
  outputIndex: z.number(),
  outputRoleKey: role,
})

const matchInputOutputMetadataValue = z.object({
  inputIndex: z.number(),
  inputMetadataKey: tokenMetadataKey,
  outputIndex: z.number(),
  outputMetadataKey: tokenMetadataKey,
})

const matchInputIdOutputMetadataValue = z.object({
  inputIndex: z.number(),
  outputIndex: z.number(),
  outputMetadataKey: tokenMetadataKey,
})

const fixedNumberOfInputs = z.object({
  numInputs: z.number(),
})

const fixedNumberOfOutputs = z.object({
  numOutputs: z.number(),
})

const fixedInputMetadataValue = z.object({
  index: z.number(),
  metadataKey: tokenMetadataKey,
  metadataValue: metadataValue,
})

const fixedOutputMetadataValue = z.object({
  index: z.number(),
  metadataKey: tokenMetadataKey,
  metadataValue: metadataValue,
})

const fixedOutputMetadataValueType = z.object({
  index: z.number(),
  metadataKey: tokenMetadataKey,
  metadataValueType: metadataValueType,
})

export const restrictionValidation = z.union([
  z.object({ None: none }).strict(),
  z.object({ Fail: fail }).strict(),
  z.object({ SenderHasInputRole: senderHasInputRole }).strict(),
  z.object({ SenderHasOutputRole: senderHasOutputRole }).strict(),
  z.object({ OutputHasRole: outputHasRole }).strict(),
  z.object({ OutputHasMetadata: outputHasMetadata }).strict(),
  z.object({ InputHasRole: inputHasRole }).strict(),
  z.object({ InputHasMetadata: inputHasMetadata }).strict(),
  z.object({ MatchInputOutputRole: matchInputOutputRole }).strict(),
  z.object({ MatchInputOutputMetadataValue: matchInputOutputMetadataValue }).strict(),
  z.object({ MatchInputIdOutputMetadataValue: matchInputIdOutputMetadataValue }).strict(),
  z.object({ FixedNumberOfInputs: fixedNumberOfInputs }).strict(),
  z.object({ FixedNumberOfOutputs: fixedNumberOfOutputs }).strict(),
  z.object({ FixedInputMetadataValue: fixedInputMetadataValue }).strict(),
  z.object({ FixedOutputMetadataValue: fixedOutputMetadataValue }).strict(),
  z.object({ FixedOutputMetadataValueType: fixedOutputMetadataValueType }).strict(),
])

export const stepValidation = z.union([
  z.object({ op: binaryOperator }),
  z.object({ restriction: restrictionValidation }),
])

export const programValidation = z.array(stepValidation)

export const processValidation = z.object({
  name: z.string().max(Constants.PROCESS_ID_LENGTH),
  version: z.number(),
  program: programValidation,
})

export const simpleProcesssValidation = z.array(z.object({ name: z.string() }).passthrough())

export const processesValidation = z.array(processValidation)

export type ValidationRestriction = z.infer<typeof restrictionValidation>
export type ValidationProgramStep = z.infer<typeof stepValidation>
export type ValidationProgram = z.infer<typeof programValidation>
export type ValidationProcess = z.infer<typeof processValidation>
export type ValidationProcesses = z.infer<typeof processesValidation>
