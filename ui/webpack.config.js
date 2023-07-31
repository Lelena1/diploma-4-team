const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let devMode = process.env.NODE_ENV !== 'production';

const ENTRY_PATH = path.resolve(__dirname, 'src')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
	entry: [ 'babel-polyfill', path.resolve(ENTRY_PATH, 'index.js') ],
	output: {
		path: OUTPUT_PATH,
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 3000,
		compress: true,
		open: true,
		historyApiFallback: true
	},
	mode: "development",
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules|images/,
				use: ['babel-loader']
			},
			{
				test: /\.html/,
				use: ['html-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false,
							sourceMap: true
						}
					},
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				],
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: './public/manifest.json',
						to: './manifest.json'
					},
					{
						from: './public/favicon.ico',
						to: './favicon.ico'
					},
					{
						context: './',
						from: './src/vendor/font/*',
						to: './',
					},
					{
						context: './',
						from: './src/images/*',
						to: './',
					}
				]
			})
	]
};
