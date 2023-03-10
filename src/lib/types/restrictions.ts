import { z } from 'zod'

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
const role = z.enum(['Owner', 'Customer', 'AdditiveManufacturer', 'Laboratory', 'Buyer', 'Supplier', 'Reviewer'])

const binaryOperator = z.enum([
  null,
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

const senderOwnsAllInputs = z.object({})

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

export const stepValidation = z
  .object({
    op: binaryOperator.optional(),
    None: none.optional(),
    SenderOwnsAllInputs: senderOwnsAllInputs.optional(),
    SenderHasInputRole: senderHasInputRole.optional(),
    SenderHasOutputRole: senderHasOutputRole.optional(),
    OutputHasRole: outputHasRole.optional(),
    MatchInputOutputRole: matchInputOutputRole.optional(),
    MatchInputOutputMetadataValue: matchInputOutputMetadataValue.optional(),
    FixedNumberOfInputs: fixedNumberOfInputs.optional(),
    FixedNumberOfOutputs: fixedNumberOfOutputs.optional(),
    FixedInputMetadataValue: fixedInputMetadataValue.optional(),
    FixedOutputMetadataValue: fixedOutputMetadataValue.optional(),
    FixedOutputMetadataValueType: fixedOutputMetadataValueType.optional(),
  })
  .strict()

const programValidation = z.array(
  z.object({ op: binaryOperator }).optional(),
  z.object({ restriction: stepValidation }).optional()
)

export type ChainRestrictions = z.infer<typeof programValidation>
