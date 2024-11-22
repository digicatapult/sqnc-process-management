import { GenericContainer, Wait, type StartedTestContainer } from 'testcontainers'
import { resetLastSubmittedNonce } from '../../src/lib/process/api.js'

export const withSubstrateNode = (
  config: { manualSeal: boolean },
  context: { nodeContainer?: StartedTestContainer; polkadotOptions: Polkadot.Options }
) => {
  before(async function () {
    this.timeout(60000)
    resetLastSubmittedNonce()
    context.nodeContainer = await new GenericContainer('digicatapult/sqnc-node')
      .withName('sqnc-node')
      .withExposedPorts(30333, 9944, 9933)
      .withCommand([
        '--base-path',
        '/data/',
        '--dev',
        '--unsafe-rpc-external',
        '--rpc-cors',
        'all',
        ...(config.manualSeal ? ['--manual-seal'] : []),
      ])
      .withWaitStrategy(Wait.forHealthCheck())
      .withReuse()
      .start()

    context.polkadotOptions.API_PORT = context.nodeContainer.getMappedPort(9944)
  })

  after(async () => {
    await context.nodeContainer?.stop({ remove: true })
    resetLastSubmittedNonce()
  })
}
