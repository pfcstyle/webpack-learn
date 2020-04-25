const presets = [//顺序是从下往上
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

const plugins = []

module.exports = { presets, plugins };