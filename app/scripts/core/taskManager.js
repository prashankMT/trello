import Base from "./base";
import Task from "./task";
import User from "./user";
import Category from "./category";

import { isEmpty, isString, isNumber, isArray, isObject } from "../utils";

const usersMap = Symbol("usersMap");
const categoriesMap = Symbol("categoriesMap");
const tasksMap = Symbol("tasksMap");

class TaskManager extends Base {
	static props = {
		title: isString
	};

	constructor(title = {}) {
		super({ title }, TaskManager.props);
		this[usersMap] = {};
		this[categoriesMap] = {};
		this[tasksMap] = {};
	}

	get users() {
		return Object.values(this[usersMap]);
	}

	get categories() {
		return Object.values(this[categoriesMap]);
	}

	get tasks() {
		return Object.values(this[tasksMap]);
	}

	getDetails() {
		const details = super.getDetails();
		details.users = this.users;
		details.categories = this.categories;
		details.tasks = this.tasks;
		return details;
	}

	getTaskByCategories() {
		const result = {};
		this.categories.forEach(({id, name, index}) => {
			result[id] = { tasks: [], id, name, index };
		});

		this.tasks.forEach(task => {
			const categoryId = task.category;
			result[categoryId].tasks.push(task);
		});

		return result;
	}

	getTaskDetailsById(id) {
		if (!id) return {};
		return this[tasksMap][id];
	}

	createUser(name) {
		const newUser = new User(name);
		this[usersMap][newUser.id] = newUser;
		return newUser;
	}

	createCategory(name, index) {
		const newCategory = new Category({ name, index });
		this[categoriesMap][newCategory.id] = newCategory;
		return newCategory;
	}

	createTask(title, category, description, labels = [], assignees = []) {
		const newTask = new Task({
			title,
			description,
			labels,
			assignees,
			category
		});
		this[tasksMap][newTask.id] = newTask;
		return newTask;
	}

	deleteUser(id) {
		if (!id) return;
		delete this[usersMap][id];
	}

	deleteCategory(id) {
		if (!id) return;
		const mappedTaskIds = [];
		for (const [taskId, { category: categoryId }] of Object.entries(
			this[tasksMap]
		)) {
			if (categoryId == id) mappedTaskIds[taskId];
		}
		mappedTaskIds.forEach(taskId => delete this[tasksMap][taskId]);
		delete this[categoriesMap][id];
	}

	deleteTask(id) {
		if (!id) return;
		delete this[tasksMap][id];
	}
}

export default TaskManager;
