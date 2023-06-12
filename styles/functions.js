import trim from 'lodash/trim'
import identity from 'lodash/identity'
import map from 'lodash/map'
import {
	default_danger, default_dark,
	default_info,
	default_light, default_primary,
	default_secondary,
	default_success,
	default_warning, themes
} from "./themes";

//https://gist.github.com/johanlef/518a511b2b2f6b96c4f429b3af2f169a?permalink_comment_id=4017395

export function getBoostrapTheme(colors){
	return getStyle({
		"bootstrap-primary":colors.primary || default_primary ,
		"bootstrap-secondary":colors?.secondary || default_secondary,
		"bootstrap-success":colors?.success || default_success,
		"bootstrap-info":colors?.info || default_info,
		"bootstrap-warning":colors?.warning || default_warning,
		"bootstrap-danger":colors?.danger || default_danger,
		"bootstrap-light":colors?.light || default_light,
		"bootstrap-dark":colors?.dark || default_dark,
	})
}

export function getColorFromBS(name){
	const style = getComputedStyle(document.body)
	return style.getPropertyValue(`--${name}-hex`)
}

export function getPrimaryColor(){
	return getColorFromBS("iotcat-bs-primary")
}

export function getHSLCssVar(color){
	const vars = []
	vars.push(			printCss('', color => {
		const hsl = colorToHsl(color)
		return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
	}))
	vars.push(printCss('h', color => {
		const hsl = colorToHsl(color)
		return hsl[0]
	}))
	vars.push(
		printCss('s', color => {
			const hsl = colorToHsl(color)
			return `${hsl[1]}%`
		})
	)
	vars.push(printCss('l', color => {
		const hsl = colorToHsl(color)
		return `${hsl[2]}%`
	}))
	return vars
}

export function colorToHsl(color){
	if (color.startsWith('#')) {
		if (color.length === 4) {
			const r = parseInt(color.substring(1, 2) + color.substring(1, 2), 16)
			const g = parseInt(color.substring(2, 3) + color.substring(2, 3), 16)
			const b = parseInt(color.substring(3, 4) + color.substring(3, 4), 16)
			//@ts-ignore
			return rgbToHsl(r, g, b)
		} else {
			const r = parseInt(color.substring(1, 3), 16)
			const g = parseInt(color.substring(3, 5), 16)
			const b = parseInt(color.substring(5, 7), 16)
			//@ts-ignore
			return rgbToHsl(r, g, b)
		}
	} else if (color.startsWith('rgba')) {
		const [r, g, b] = color.slice(5, -1).split(',')
		return rgbToHsl(r, g, b).slice(0, 3)
	} else if (color.startsWith('rgb')) {
		const [r, g, b] = color.slice(4, -1).split(',')
		return rgbToHsl(r, g, b)
	} else if (color.startsWith('hsla')) {
		return color.slice(5, -1).split(',').slice(0, 3)
	} else if (color.startsWith('hsl')) {
		return color.slice(4, -1).split(',')
	} else {
		// named color values are not yet supported
		console.error('Named color values are not supported in the config. Convert it manually using this chart: https://htmlcolorcodes.com/color-names/')
		return [0, 0, 16] // defaults to dark gray
	}
}

export function rgbToHsl(red, green, blue){
	const r = Number(trim(red)) / 255
	const g = Number(trim(green)) / 255
	const b = Number(trim(blue)) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h,
		s,
		l = (max + min) / 2

	if (max === min) {
		h = s = 0 // achromatic
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
			default:
				break
		}
		if(typeof h === "number"){
			h /= 6
		}

	}

	h = Math.round(360 * (h || 0))
	s = Math.round(100 * s)
	l = Math.round(100 * l)

	return [h, s, l]
}

export function printCss(suffix, convert) {
	if (suffix === void 0) { suffix = ''; }
	if (convert === void 0) { convert = identity; }
	return function (value, property) { return "--" + property + (suffix ? '-' + suffix : '') + ": " + convert?.(value) + ";"; };
}

const THEME_STYLE_ID = "custom_theme"

export function getThemeFromURL(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const theme_name = urlParams.get('theme')
	return themes[theme_name] || themes.default
}

export function setTheme(){
	const theme = getThemeFromURL()
	if(!theme) return
	const sheet = document.createElement("style")
	sheet.id = THEME_STYLE_ID
	sheet.innerHTML = getBoostrapTheme(theme.colors)
	document.body.appendChild(sheet);
}

export function getImageFromTheme(imageName){
	const theme =getThemeFromURL()
	return theme?.images?.[imageName]
}

export function unsetTheme(){
	document.body.removeChild(document.getElementById(THEME_STYLE_ID))
}

export function getStyle(colors){
	return (
		`:root {
             ${colors &&
		map(
			colors,
			printCss('hex', color => {
				return color
			})
		).join("")}
            ${colors &&
		map(
			colors,
			printCss('', color => {
				const hsl = colorToHsl(color)
				return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
			})
		).join("")}
            ${colors &&
		map(
			colors,
			printCss('h', color => {
				const hsl = colorToHsl(color)
				return hsl[0]
			})
		).join("")}
            ${colors &&
		map(
			colors,
			printCss('s', color => {
				const hsl = colorToHsl(color)
				return `${hsl[1]}%`
			})
		).join("")}
            ${colors &&
		map(
			colors,
			printCss('l', color => {
				const hsl = colorToHsl(color)
				return `${hsl[2]}%`
			})
		).join("")}
        }`
	)
}
