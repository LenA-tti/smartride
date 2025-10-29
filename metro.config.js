const { getDefaultConfig } = require('expo/metro-config');

let withNativeWind;
try {
	({ withNativeWind } = require('nativewind/metro'));
} catch (e) {
	// Fallback to identity if nativewind isn't installed yet
	withNativeWind = (c) => c;
}

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
