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
const metadataValueType = z.union([z.literal('File'), z.literal('Literal'), z.literal('TokenId'), z.literal('None')])
const role = z.union([
  z.literal('Owner'),
  z.literal('Customer'),
  z.literal('AdditiveManufacturer'),
  z.literal('Laboratory'),
  z.literal('Buyer'),
  z.literal('Supplier'),
  z.literal('Reviewer'),
])

const binaryOperator = z.union([
  z.literal('and'),
  z.literal('or'),
  z.null(),
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

export const userRestrictionValidation = z.array(z.object({
  op: binaryOperator.optional(),
  None: z.array(none).optional(),
  SenderOwnsAllInputs: z.array(senderOwnsAllInputs).optional(),
  SenderHasInputRole: z.array(senderHasInputRole).optional(),
  SenderHasOutputRole: z.array(senderHasOutputRole).optional(),
  OutputHasRole: z.array(outputHasRole).optional(),
  MatchInputOutputRole: z.array(matchInputOutputRole).optional(),
  MatchInputOutputMetadataValue: z.array(matchInputOutputMetadataValue).optional(),
  FixedNumberOfInputs: z.array(fixedNumberOfInputs).optional(),
  FixedNumberOfOutputs: z.array(fixedNumberOfOutputs).optional(),
  FixedInputMetadataValue: z.array(fixedInputMetadataValue).optional(),
  FixedOutputMetadataValue: z.array(fixedOutputMetadataValue).optional(),
  FixedOutputMetadataValueType: z.array(fixedOutputMetadataValueType).optional(),
}))

const chainRestrictionValidation = z.array(
  z.object({
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
)

export type ChainRestrictions = z.infer<typeof chainRestrictionValidation>
