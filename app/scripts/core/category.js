import Base from "./base";
import { isEmpty, isString, isNumber, isArray } from "../utils";
import { getNewCategoryId } from "../utils/generateUniqueIds";

class Category extends Base {
	static props = {
		name: isString,
		index: isNumber
	};

	constructor(props = {}) {
		super(props, Category.props);
		this.id = getNewCategoryId();
	}

	getDetails() {
		const details = super.getDetails();
		details.id = this.id;
		return details;
	}
}

export default Category;
