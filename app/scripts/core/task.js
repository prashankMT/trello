import Base from "./base";
import { isEmpty, isString, isNumber, isArray } from "../utils";
import { getNewTaskId } from "../utils/generateUniqueIds";

class Task extends Base {
	static props = {
		title: isString,
		description: isString,
		duedate: isNumber,
		label: isArray,
		category: isNumber,
		assignees: isArray
	};

	constructor(props = {}) {
		super(props, Task.props);
		this.id = getNewTaskId();
	}

	getDetails() {
		const details = super.getDetails();
		details.id = this.id;
		return details;
	}
}

export default Task;
