const presets = [
	[
		"@babel/preset-env", {
			targets: {
				chrome: "67",
			},
			useBuiltIns: 'usage'
		}
	],
	"@babel/preset-react"
]
const plugins = ["@babel/plugin-syntax-dynamic-import"]

module.exports = {presets, plugins}