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

const argType = z.union([z.literal('Reference'), z.literal('Input'), z.literal('Output')])

const senderHasArgRole = z.object({ arg_type: argType, index: z.number(), role_key: role })

const argHasRole = z.object({ arg_type: argType, index: z.number(), role_key: role })

const argHasMetadata = z.object({ arg_type: argType, index: z.number(), metadata_key: tokenMetadataKey })

const matchArgsRole = z.object({
  left_arg_type: argType,
  left_index: z.number(),
  left_role_key: role,
  right_arg_type: argType,
  right_index: z.number(),
  right_role_key: role,
})

const matchArgsMetadataValue = z.object({
  left_arg_type: argType,
  left_index: z.number(),
  left_metadata_key: tokenMetadataKey,
  right_arg_type: argType,
  right_index: z.number(),
  right_metadata_key: tokenMetadataKey,
})

const matchArgIdToMetadataValue = z.object({
  left_arg_type: argType,
  left_index: z.number(),
  right_arg_type: argType,
  right_index: z.number(),
  right_metadata_key: tokenMetadataKey,
})

const fixedArgCount = z.object({ arg_type: argType, count: z.number() })

const fixedArgMetadataValue = z.object({
  arg_type: argType,
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value: metadataValue,
})

const fixedArgMetadataValueType = z.object({
  arg_type: argType,
  index: z.number(),
  metadata_key: tokenMetadataKey,
  metadata_value_type: metadataValueType,
})

export const restrictionValidation = z.union([
  z.literal('None'),
  z.literal('Fail'),
  z.literal('SenderIsRoot'),
  z.object({ SenderHasArgRole: senderHasArgRole }).strict(),
  z.object({ ArgHasRole: argHasRole }).strict(),
  z.object({ ArgHasMetadata: argHasMetadata }).strict(),
  z.object({ MatchArgsRole: matchArgsRole }).strict(),
  z.object({ MatchArgsMetadataValue: matchArgsMetadataValue }).strict(),
  z.object({ MatchArgIdToMetadataValue: matchArgIdToMetadataValue }).strict(),
  z.object({ FixedArgCount: fixedArgCount }).strict(),
  z.object({ FixedArgMetadataValue: fixedArgMetadataValue }).strict(),
  z.object({ FixedArgMetadataValueType: fixedArgMetadataValueType }).strict(),
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
