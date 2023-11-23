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
const role = z.string()

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

const senderHasInputRole = z.object({
  index: z.number(),
  role_key: role,
})

const senderHasOutputRole = z.object({
  index: z.number(),
  role_key: role,
})

const outputHasRole = z.object({
  index: z.number(),
  role_key: role,
})

const outputHasMetadata = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
})

const inputHasRole = z.object({
  index: z.number(),
  role_key: role,
})

const inputHasMetadata = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
})

const matchInputOutputRole = z.object({
  input_index: z.number(),
  input_role_key: role,
  output_index: z.number(),
  output_role_key: role,
})

const matchInputOutputMetadataValue = z.object({
  input_index: z.number(),
  input_metadata_key: tokenMetadataKey,
  output_index: z.number(),
  output_metadata_key: tokenMetadataKey,
})

const matchInputIdOutputMetadataValue = z.object({
  input_index: z.number(),
  output_index: z.number(),
  output_metadata_key: tokenMetadataKey,
})

const fixedNumberOfInputs = z.object({
  num_inputs: z.number(),
})

const fixedNumberOfOutputs = z.object({
  num_outputs: z.number(),
})

const fixedInputMetadataValue = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value: metadataValue,
})

const fixedOutputMetadataValue = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value: metadataValue,
})

const fixedInputMetadataValueType = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value_type: metadataValueType,
})

const fixedOutputMetadataValueType = z.object({
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value_type: metadataValueType,
})

export const restrictionValidation = z.union([
  z.literal('None'),
  z.literal('Fail'),
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
  z.object({ FixedInputMetadataValueType: fixedInputMetadataValueType }).strict(),
  z.object({ FixedOutputMetadataValueType: fixedOutputMetadataValueType }).strict(),
])

export const stepValidation = z.union([
  z.object({ Op: binaryOperator }),
  z.object({ Restriction: restrictionValidation }),
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
