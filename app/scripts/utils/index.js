import isPlainObject from "is-plain-object";

export const isUndefined = value => {
	return typeof value === "undefined";
};

export const isFunction = fn => {
	return typeof fn === "function";
};

export const isString = value => {
	return typeof value === "string";
};

export const isNumber = value => {
	return Number.isInteger(value);
};

export const isArray = value => {
	return Array.isArray(value);
};

export function isObject(x) {
	return isPlainObject(x);
}

export const hasValue = elem => {
	return !(isUndefined(elem) || elem === null);
};

export function isEmpty(x) {
	if (isObject(x) && !Object.keys(x).length) return true;
	if (Array.isArray(x) && !x.length) return true;
	return false;
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomLabelType() {
	const types = [
		"primary",
		"secondary",
		"success",
		"danger",
		"warning",
		"info",
		"light",
		"dark"
	];
	return types[getRandomInt(0, types.length-1)]
}
