export const listHelper = async (res: Process.RawPayload[], processes: Process.RawPayload[], options: Process.CLIOptions) => {
    const { dir } = console
    if (options.active) {
      processes = res.filter(({ status }) => status === 'Enabled')
    } else if (options.disabled) {
      processes = res.filter(({ status }) => status === 'Disabled')
    } else {
      processes = res
    }

    if (options.raw) {
      dir(processes, { depth: null })
    } else{
      dir(
        processes.map((p) => {
          return {
            id: p.id,
            version: p.version,
            status: p.status,
            ...options.verbose ? { program: p.program } : { }
          }
        }),
        { depth: null }
      )
    }
}