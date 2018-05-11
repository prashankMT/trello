import Base from "./base";

import { isString } from "../utils";
import { getNewUserId } from "../utils/generateUniqueIds";

const getInitials = Symbol("getInitials");

class User extends Base {
	static props = {
		name: isString,
		initials: isString
	};

	constructor(name, initials) {
		super({ name }, User.props);
		this.id = getNewUserId();
		this.initial = initials || this[getInitials]();
	}

	[getInitials]() {
		const nameArray = this.name.split(" ");
		const initial =
			nameArray.length > 1
				? `${nameArray[0][0]}${nameArray[1][0]}`
				: `${nameArray[0][0]}${nameArray[0][1]}`;
		return initial.toUpperCase();
	}

	getDetails() {
		const details = super.getDetails();
		details.initials = this.initials;
		details.id = this.id;
		return details;
	}

	update = (details = {}) => {
		super.update(details);
		this.initials = this[getInitials]();
	};
}

export default User;
