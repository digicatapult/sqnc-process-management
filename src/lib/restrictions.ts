export const PROCESS_ID_LENGTH: number = 32

type TokenMetadataKey = string
type TokenId = number
type File = string
type MetadataValue = File | string | TokenId | null

enum MetadataValueType {
  File,
  Literal,
  TokenId,
  None,
}

enum Role {
  Owner,
  Customer,
  AdditiveManufacturer,
  Laboratory,
  Buyer,
  Supplier,
  Reviewer,
}

export type Restrictions = Restriction[]
interface Restriction {
  None?: None
  SenderOwnsAllInputs?: SenderOwnsAllInputs
  SenderHasInputRole?: SenderHasInputRole
  SenderHasOutputRole?: SenderHasOutputRole
  OutputHasRole?: OutputHasRole
  MatchInputOutputRole?: MatchInputOutputRole
  MatchInputOutputMetadataValue?: MatchInputOutputMetadataValue
  FixedNumberOfInputs?: FixedNumberOfInputs
  FixedNumberOfOutputs?: FixedNumberOfOutputs
  FixedInputMetadataValue?: FixedInputMetadataValue
  FixedOutputMetadataValue?: FixedOutputMetadataValue
  FixedOutputMetadataValueType?: FixedOutputMetadataValueType
}

export interface None {}

export interface SenderOwnsAllInputs {}

export interface SenderHasInputRole {
  index: number
  role_key: Role
}

export interface SenderHasOutputRole {
  index: number
  role_key: Role
}

export interface OutputHasRole {
  index: number
  role_key: Role
}

export interface MatchInputOutputRole {
  input_index: number
  input_role_key: Role
  output_index: number
  output_role_key: Role
}

export interface MatchInputOutputMetadataValue {
  input_index: number
  input_metadata_key: TokenMetadataKey
  output_index: number
  output_metadata_key: TokenMetadataKey
}

export interface FixedNumberOfInputs {
  num_inputs: number
}

export interface FixedNumberOfOutputs {
  num_outputs: number
}

export interface FixedInputMetadataValue {
  index: number
  metadata_key: TokenMetadataKey
  metadata_value: MetadataValue
}

export interface FixedOutputMetadataValue {
  index: number
  metadata_key: TokenMetadataKey
  metadata_value: MetadataValue
}

export interface FixedOutputMetadataValueType {
  index: number
  metadata_key: TokenMetadataKey
  metadata_value_type: MetadataValueType
}
