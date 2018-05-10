import { isEmpty, isString, isNumber, isArray } from "../utils";

const supportedPropsMap = Symbol("supportedProps");
class Base {
	constructor(props = {}, propsMap = {}) {
		this[supportedPropsMap] = propsMap;
		this.update(props);
	}

	getDetails() {
		const properties = Object.keys(this[supportedPropsMap]);
		const details = {};
		properties.forEach(prop => {
			details[prop] = this[prop];
		});
		return details;
	}

	update(props = {}) {
		const supportedProps = Object.keys(this[supportedPropsMap]);

		Object.keys(props).forEach(prop => {
			const typeValidator = this[supportedPropsMap][prop];

			if (!supportedProps.includes(prop)) return;
			if (!typeValidator(props[prop])) {
				console.error(`${prop} is invalid`);
				return;
			}
			this[prop] = props[prop];
		});
	}
}

export default Base;
