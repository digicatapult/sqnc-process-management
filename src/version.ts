const packageJson = await import('../package.json', { with: { type: 'json' }})
const { version } = packageJson.default 
export default version
