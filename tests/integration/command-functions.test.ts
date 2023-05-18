import { default as chai, expect, assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { createProcess, disableProcess, loadProcesses } from '../../src/lib/process/index.js'
import {
  validAllRestrictions,
  invalidPOSIX,
  multiple,
  simple2,
  simple,
  invalidRestrictionKey,
  invalidRestrictionValue,
} from '../fixtures/programs.js'
import { Constants } from '../../src/lib/process/constants.js'
import { getVersionHelper } from '../helpers/substrateHelper.js'
import { ZodError } from 'zod'
import { DisableError, ProgramError, VersionError } from '../../src/lib/types/error.js'
import { getAll } from '../../src/lib/process/api.js'
import errorExamples from '../fixtures/errors.json' assert { type: 'json' }
const aa = [
  {
    "name": "demand-create",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 0
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 1
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "created"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValueType": {
            "index": 0,
            "metadataKey": "parameters",
            "metadataValueType": "File"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_a"
            }
          }
        }
      },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_b"
            }
          }
        }
      },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "OutputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      { "op": "And" },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 0,
            "roleKey": "Owner"
          }
        }
      },
      { "op": "And" }
    ]
  },
  {
    "name": "match2-propose",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 2
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 3
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_a"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "created"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "type",
            "outputIndex": 0,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "version",
            "outputIndex": 0,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "subtype",
            "outputIndex": 0,
            "outputMetadataKey": "subtype"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "state",
            "outputIndex": 0,
            "outputMetadataKey": "state"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "Owner",
            "outputIndex": 0,
            "outputRoleKey": "Owner"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 0,
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_b"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "created"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "type",
            "outputIndex": 1,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "version",
            "outputIndex": 1,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "subtype",
            "outputIndex": 1,
            "outputMetadataKey": "subtype"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "state",
            "outputIndex": 1,
            "outputMetadataKey": "state"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 1,
            "inputRoleKey": "Owner",
            "outputIndex": 1,
            "outputRoleKey": "Owner"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "originalId",
            "outputIndex": 1,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 1,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 1,
            "outputIndex": 1,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 2,
            "roleKey": "Optimiser"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "Owner",
            "outputIndex": 2,
            "outputRoleKey": "MemberA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 1,
            "inputRoleKey": "Owner",
            "outputIndex": 2,
            "outputRoleKey": "MemberB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 2,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "MATCH2"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 2,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 2,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "proposed"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 2,
            "outputMetadataKey": "demandA"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 0,
            "outputIndex": 2,
            "outputMetadataKey": "demandA"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "originalId",
            "outputIndex": 2,
            "outputMetadataKey": "demandB"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 1,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 1,
            "outputIndex": 2,
            "outputMetadataKey": "demandB"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "OutputHasMetadata": {
            "index": 2,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      { "op": "And" }
    ]
  },
  {
    "name": "match2-accept",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 1
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 1
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "MemberA",
            "outputIndex": 0,
            "outputRoleKey": "MemberA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "MemberB",
            "outputIndex": 0,
            "outputRoleKey": "MemberB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "Optimiser",
            "outputIndex": 0,
            "outputRoleKey": "Optimiser"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "MATCH2"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "proposed"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "type",
            "outputIndex": 0,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "version",
            "outputIndex": 0,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "demandA",
            "outputIndex": 0,
            "outputMetadataKey": "demandA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "demandB",
            "outputIndex": 0,
            "outputMetadataKey": "demandB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 0,
            "roleKey": "MemberA"
          }
        }
      },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedA"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 0,
            "roleKey": "MemberB"
          }
        }
      },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedB"
            }
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 0,
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" }
    ]
  },
  {
    "name": "match2-acceptFinal",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 3
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 3
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "Owner",
            "outputIndex": 0,
            "outputRoleKey": "Owner"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "type",
            "outputIndex": 0,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_a"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "subtype",
            "outputIndex": 0,
            "outputMetadataKey": "subtype"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "version",
            "outputIndex": 0,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 0,
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "created"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "allocated"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 1,
            "inputRoleKey": "Owner",
            "outputIndex": 1,
            "outputRoleKey": "Owner"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "type",
            "outputIndex": 1,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "subtype",
            "metadataValue": {
              "Literal": "demand_b"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "subtype",
            "outputIndex": 1,
            "outputMetadataKey": "subtype"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "version",
            "outputIndex": 1,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "originalId",
            "outputIndex": 1,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 1,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 1,
            "outputIndex": 1,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 1,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "created"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 1,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "allocated"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 2,
            "inputRoleKey": "Optimiser",
            "outputIndex": 2,
            "outputRoleKey": "Optimiser"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 2,
            "inputRoleKey": "MemberA",
            "outputIndex": 2,
            "outputRoleKey": "MemberA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 2,
            "inputRoleKey": "MemberB",
            "outputIndex": 2,
            "outputRoleKey": "MemberB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 2,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "MATCH2"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 2,
            "inputMetadataKey": "type",
            "outputIndex": 2,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 2,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 2,
            "inputMetadataKey": "version",
            "outputIndex": 2,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 2,
            "outputMetadataKey": "demandA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 2,
            "inputMetadataKey": "demandA",
            "outputIndex": 2,
            "outputMetadataKey": "demandA"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 1,
            "inputMetadataKey": "originalId",
            "outputIndex": 2,
            "outputMetadataKey": "demandB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 2,
            "inputMetadataKey": "demandB",
            "outputIndex": 2,
            "outputMetadataKey": "demandB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 2,
            "inputMetadataKey": "originalId",
            "outputIndex": 2,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 2,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 2,
            "outputIndex": 2,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValue": {
            "index": 2,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedFinal"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 2,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedA"
            }
          }
        }
      },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 2,
            "roleKey": "MemberB"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 2,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedB"
            }
          }
        }
      },
      {
        "restriction": {
          "SenderHasOutputRole": {
            "index": 2,
            "roleKey": "MemberA"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" }
    ]
  },
  {
    "name": "demand-comment",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 1
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 1
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "DEMAND"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedOutputMetadataValueType": {
            "index": 0,
            "metadataKey": "comment",
            "metadataValueType": "File"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "type",
            "outputIndex": 0,
            "outputMetadataKey": "type"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "version",
            "outputIndex": 0,
            "outputMetadataKey": "version"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "subtype",
            "outputIndex": 0,
            "outputMetadataKey": "subtype"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "state",
            "outputIndex": 0,
            "outputMetadataKey": "state"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputRole": {
            "inputIndex": 0,
            "inputRoleKey": "Owner",
            "outputIndex": 0,
            "outputRoleKey": "Owner"
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "MatchInputOutputMetadataValue": {
            "inputIndex": 0,
            "inputMetadataKey": "originalId",
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "InputHasMetadata": {
            "index": 0,
            "metadataKey": "originalId"
          }
        }
      },
      {
        "restriction": {
          "None": {}
        }
      },
      { "op": "NotL" },
      {
        "restriction": {
          "MatchInputIdOutputMetadataValue": {
            "inputIndex": 0,
            "outputIndex": 0,
            "outputMetadataKey": "originalId"
          }
        }
      },
      { "op": "And" },
      { "op": "Or" },
      { "op": "And" }
    ]
  },
  {
    "name": "match2-reject",
    "version": 1,
    "program": [
      {
        "restriction": {
          "FixedNumberOfInputs": {
            "numInputs": 1
          }
        }
      },
      {
        "restriction": {
          "FixedNumberOfOutputs": {
            "numOutputs": 0
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "type",
            "metadataValue": {
              "Literal": "MATCH2"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "version",
            "metadataValue": {
              "Literal": "1"
            }
          }
        }
      },
      { "op": "And" },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "proposed"
            }
          }
        }
      },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedA"
            }
          }
        }
      },
      {
        "restriction": {
          "FixedInputMetadataValue": {
            "index": 0,
            "metadataKey": "state",
            "metadataValue": {
              "Literal": "acceptedB"
            }
          }
        }
      },
      { "op": "Or" },
      { "op": "Or" },
      { "op": "And" },
      {
        "restriction": {
          "SenderHasInputRole": {
            "index": 0,
            "roleKey": "MemberA"
          }
        }
      },
      {
        "restriction": {
          "SenderHasInputRole": {
            "index": 0,
            "roleKey": "MemberB"
          }
        }
      },
      {
        "restriction": {
          "SenderHasInputRole": {
            "index": 0,
            "roleKey": "Optimiser"
          }
        }
      },
      { "op": "Or" },
      { "op": "Or" },
      { "op": "And" }
    ]
  }
]


const polkadotOptions = { API_HOST: 'localhost', API_PORT: 9944, USER_URI: '//Alice' }


describe('Process creation and deletion, listing', () => {
  describe('Happy path', () => {
    describe('Multiple processes', () => {
      it('skips already created processes and creates new ones', async () => {
        await createProcess('existing-process-test', 1, simple2, false, polkadotOptions)
        const process2Name = 'process-to-be-created'
        const process2BumpedV = (await getVersionHelper(process2Name)) + 1
        // TODO multiple to take an array?, better assertation
        const newProcesses = await loadProcesses({
          options: polkadotOptions,
          data: multiple('existing-process-test', 1, process2Name, process2BumpedV),
        })
        expect(newProcesses['existing-process-test']).to.deep.contain({
          message: 'Process existing-process-test is already created.',
          process: {
            id: '0x6578697374696e672d70726f636573732d74657374',
            version: 1,
            status: 'Enabled',
            program: [{
              restriction: {
                senderHasInputRole: {
                  index: 0,
                  roleKey: 'Supplier',
                },
              },
            }],
          },
        })
        expect(newProcesses[process2Name].message).to.deep.equal(
          'Transaction for new process process-to-be-created has been successfully submitted'
        )
        expect(newProcesses[process2Name].process).to.deep.contain({
          version: process2BumpedV,
          status: 'Enabled',
        })
      })

      it.only('loads matchmaker\'s processes', async () => {
        const a = await loadProcesses({ options: polkadotOptions, data: JSON.stringify(aa) })
      }).timeout(60000)

      it('creates multiple processes', async () => {
        const process1Name = 'process-1'
        const process1BumpedV = (await getVersionHelper(process1Name)) + 1
        const process2Name = 'process-2'
        const process2BumpedV = (await getVersionHelper(process2Name)) + 1
        const newProcesses = await loadProcesses({
          options: polkadotOptions,
          data: multiple(process1Name, process1BumpedV, process2Name, process2BumpedV),
        })
        expect(newProcesses[process1Name].message).to.deep.equal(
          'Transaction for new process process-1 has been successfully submitted'
        )
        expect(newProcesses[process1Name].process).to.deep.contain({
          version: process1BumpedV,
          status: 'Enabled',
        })
        expect(newProcesses[process2Name].message).to.deep.equal(
          'Transaction for new process process-2 has been successfully submitted'
        )
        expect(newProcesses[process2Name].process).to.deep.contain({
          version: process2BumpedV,
          status: 'Enabled',
        })
      })
    })

    it('creates then disables a process', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, simple, false, polkadotOptions)
      expect(newProcess.process).to.deep.equal({
        id: processName,
        version: bumpedVersion,
        status: 'Enabled',
        program: simple,
      })

      const disabledProcess = await disableProcess(processName, bumpedVersion, false, polkadotOptions)
      expect(disabledProcess.message).to.equal('Process has been disabled')
      expect(disabledProcess.process).to.deep.equal({
        id: processName,
        version: bumpedVersion,
        status: 'Disabled',
      })
    })

    it('does not create process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, validAllRestrictions, true, polkadotOptions)
      expect(newProcess.process).to.equal(null)
    })

    it('does not disable process if dry run', async () => {
      const processName = '0'
      const currentVersion = await getVersionHelper(processName)
      const bumpedVersion = currentVersion + 1
      const newProcess = await createProcess(processName, bumpedVersion, validAllRestrictions, false, polkadotOptions)
      expect(newProcess.process).to.exist

      const disabledProcess = await disableProcess(processName, bumpedVersion, true, polkadotOptions)
      expect(disabledProcess.process).to.equal(undefined)
      expect(disabledProcess).to.deep.contain({
        message: `This will DISABLE the following process ${processName}`,
        name: processName,
      })
    })

    it('returns a list of raw processes', async () => {
      const res = await getAll(polkadotOptions)

      expect(res).to.be.an('array')
      expect(res[0])
        .to.be.an('object')
        .that.has.keys(['id', 'createdAtHash', 'initialU8aLength', 'program', 'status', 'version'])
    })
  })

  describe('Sad path', () => {
    const validProcessName = '0'
    let validVersionNumber: number

    before(async () => {
      const currentVersion = await getVersionHelper(validProcessName)
      validVersionNumber = currentVersion + 1
    })

    describe('If process already exists', () => {
      describe('Multiple uploads', () => {
        // TODO could prestage in before if more scenarios
        it('skips and notifies if process programs are different', async () => {
          await createProcess('existing-length', 1, validAllRestrictions, false, polkadotOptions)
          const process2Name = 'should-create-1'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-length', 1, process2Name, process2BumpedV),
          })

          expect(res['existing-length'].message).to.equal('existing: programs are different lengths')
          expect(res[process2Name].message).to.equal('Transaction for new process should-create-1 has been successfully submitted')

        })

        it('also fails if number of steps matches but POSTFIX does not', async () => {
          await createProcess('existing-steps', 1, simple, false, polkadotOptions)
          const process2Name = 'should-create-2'
          const process2BumpedV = (await getVersionHelper(process2Name)) + 1
          const res = await loadProcesses({
            options: polkadotOptions,
            data: multiple('existing-steps', 1, process2Name, process2BumpedV),
          })

          expect(res['existing-steps'].message).to.equal('Process existing-steps-single is already created.')
          expect(res[process2Name].message).to.equal('Transaction for new process should-create-2 has been successfully submitted')
        })
      })

      it('does not create new one and notifies if programs are different length', async () => {
        await createProcess('existing-single', 1, validAllRestrictions, false, polkadotOptions)
        const { message, process } = await createProcess('existing-single', 1, simple, false, polkadotOptions)

        expect(message).to.equal('existing: programs are different lengths')
        expect(process).to.deep.contain({
          id: '0x6578697374696e672d73696e676c65',
          version: 1,
          status: 'Enabled',
        })
      })

      it('does not create new one and notifies if programs same are length but do not match', async () => {
        await createProcess('existing-steps-single', 1, simple2, false, polkadotOptions)
        const { message, process } = await createProcess('existing-steps-single', 1, [{ restriction: { None: {} }}], false, polkadotOptions)

        expect(message).to.equal('Process existing-steps is already created.')
        expect(process).to.deep.contain({
          id: '0x6578697374696e672d73746570732d73696e676c65',
          version: 1,
          status: 'Enabled',
        })
      })
    })

    it('fails for invalid POSTFIX notation', async () => {
      const err = await createProcess(validProcessName, validVersionNumber, invalidPOSIX, false, polkadotOptions)
      expect(err).to.be.instanceOf(ProgramError)
      expect(err.message).to.equal('invalid program')
    })

    it('fails for invalid restriction key', async () => {
      const err = await createProcess(validProcessName, validVersionNumber, invalidRestrictionKey, false, polkadotOptions)
      expect(err).to.be.instanceOf(ZodError)
      expect(err).to.deep.contain({
        issues: [
        {
          code: "unrecognized_keys",
          keys: [
            "NotARestriction"
          ],
          path: [],
          message: "Unrecognized key(s) in object: 'NotARestriction'"
        }
      ]})
    })

    it('fails for invalid restriction value', async () => {
      const err = await createProcess(validProcessName, validVersionNumber, invalidRestrictionValue, false, polkadotOptions)
      expect(err).to.be.instanceOf(ZodError)
      expect(JSON.parse(err.message)).to.deep.include.members(errorExamples.restriction_value)
    })

    it('fails for invalid json', async () => {
      const err = await createProcess(
          validProcessName,
          validVersionNumber,
          'invalidJson' as unknown as Process.Program,
          false,
          polkadotOptions
        )
      expect(err.toString()).to.equal('TypeError: program.reduce is not a function')
      expect(err).to.be.instanceOf(TypeError)
    })

    it('fails to create for too low version', async () => {
        // - 2 because -1 would make current = valid
      const err = await createProcess(validProcessName, validVersionNumber - 2, validAllRestrictions, false, polkadotOptions)

      expect(err.message).to.equal(`Process version ${validVersionNumber - 2} is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`)
      expect(err).to.be.instanceOf(VersionError)
    })

    it('fails to create for too high version', async () => {
      const err = await createProcess(validProcessName, validVersionNumber + 1, validAllRestrictions, false, polkadotOptions)

      expect(err.message).to.equal(`Process version ${validVersionNumber + 1} is invalid. If you are trying to create a new version of process ${validProcessName} version should be ${validVersionNumber}`)
      expect(err).to.be.instanceOf(VersionError)
    })

    it('fails to create with too long process id', async () => {
      const processName = '0'.repeat(Constants.PROCESS_ID_LENGTH + 1)
      const { message } = await createProcess(processName, 1, validAllRestrictions, false, polkadotOptions)
      expect(message).to.equal('000000000000000000000000000000000 is too long. Max length: 32 bytes')
    })

    it('fails to disable process that does not exist', async () => {
      return assert.isRejected(disableProcess('incorrectProcessName', 1, false, polkadotOptions), DisableError)
    })

    it('fails to disable process a second time', async () => {
      const newProcess = await createProcess(validProcessName, validVersionNumber, simple, false, polkadotOptions)
      expect(newProcess.process).to.exist
      const firstDisable = await disableProcess(validProcessName, validVersionNumber, false, polkadotOptions)
      expect(firstDisable.process).to.exist

      return assert.isRejected(disableProcess(validProcessName, validVersionNumber, false, polkadotOptions), DisableError)
    })
  })
})
