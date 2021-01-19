const path = require('path');

module.exports = {
	entry: './jsx/script.jsx',
	output: {
		path: path.join(__dirname, '/js/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
                    {
                        loader: 'file-loader?name=./css/font/Open_Sans/[name].[ext]'
                    }
                ]
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}