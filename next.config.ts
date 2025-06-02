import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

/**
 * Configuration object for Next.js.
 * https://nextjs.org/docs/app/api-reference/config/next-config-js
 *
 * @property {boolean} reactStrictMode - Enables React's Strict Mode, which highlights potential problems in an application.
 * @property {object} turbopack - Configuration for Turbopack (via `next dev --turbo`), an incremental bundler for JavaScript and TypeScript.
 * @property {object} turbopack.rules - Defines rules for how Turbopack should process different file types.
 * @property {object} turbopack.rules["*.svg"] - Specifies how SVG files should be handled by Turbopack.
 * @property {string[]} turbopack.rules["*.svg"].loaders - An array of loaders to be used for SVG files. In this case, "@svgr/webpack" is used to transform SVGs into React components.
 * @property {string} turbopack.rules["*.svg"].as - Specifies the output file extension for processed SVG files. Here, they are transformed into JavaScript modules with the extension "*.js".
 * @property {function} webpack - A function to customize the Webpack configuration.
 */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	// Updated Turbopack configuration location
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	webpack(config, { isServer }) {
		// Add @svgr/webpack rule to the beginning of the module rules.
		// This allows it to handle SVG imports from JS/TSX files first.
		config.module.rules.unshift({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/, // Apply only to SVGs imported from JS/TSX files.
			resourceQuery: { not: [/url$/] }, // Do not apply if *.svg?url is used.
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						// You can add SVGR options here if needed
						// For example:
						// icon: true, // to use width/height from props if not specified
						// svgoConfig: { plugins: [{ name: 'removeViewBox', active: false }] }
					},
				},
			],
		});

		// SVGs imported with `?url` (e.g., import iconUrl from './icon.svg?url';)
		// or from other contexts (like CSS, if applicable) will not match the `issuer` or `resourceQuery`
		// of the rule above. They will fall through to Next.js's default SVG loader
		// (which typically uses 'asset/resource' type, providing a URL).

		return config;
	},
	// ... any other existing configurations
};

export default nextConfig;
