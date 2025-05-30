import type { NextConfig } from "next";

/**
 * Configuration object for Next.js.
 * https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
 *
 * @property {boolean} reactStrictMode - Enables React's Strict Mode, which highlights potential problems in an application.
 * @property {object} turbopack - Configuration for Turbopack, an incremental bundler for JavaScript and TypeScript.
 * @property {object} turbopack.rules - Defines rules for how Turbopack should process different file types.
 * @property {object} turbopack.rules["*.svg"] - Specifies how SVG files should be handled.
 * @property {string[]} turbopack.rules["*.svg"].loaders - An array of loaders to be used for SVG files. In this case, "@svgr/webpack" is used to transform SVGs into React components.
 * @property {string} turbopack.rules["*.svg"].as - Specifies the output file extension for processed SVG files. Here, they are transformed into JavaScript modules with the extension "*.js".
 * @property {string} turbopack.rules["*.svg"].as - Specifies the output file extension for processed SVG files. Here, they are treated as JavaScript files ("*.js").
 */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

export default nextConfig;
