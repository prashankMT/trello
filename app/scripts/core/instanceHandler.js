import TaskManager from "./taskManager";
import { isEmpty } from "../utils";
const storeKey = "taskManagerInstance";

function createInstance({ tasks = [], categories = [], users = [] }) {
	const instance = new TaskManager("Trello");
	users.forEach(({ name }) => {
		instance.createUser(name);
	});
	categories.forEach(({ name, index }) => {
		instance.createCategory(name, index);
	});
	tasks.forEach(({ title, description, category, labels, assignees }) => {
		instance.createTask(title, category, description, labels, assignees);
	});

	if (isEmpty(instance.tasks)) {
		createDummyTasks(instance);
	}

	return instance;
}

function createDummyTasks(tm) {
	tm.createCategory("Inbox", 0);
	tm.createCategory("Intro Call", 1);
	tm.createCategory("Round 1", 2);
	tm.createCategory("Round 2", 3);
	tm.createCategory("Face To Face", 4);
	tm.createCategory("Offered", 5);
	tm.createCategory("Rejected", 6);

	tm.createUser("Prashank");
	tm.createUser("Afroz");
	tm.createUser("Vasas");
	tm.createUser("Zeel");
	tm.createUser("Sandeep");
	tm.createUser("Vikalp");

	tm.createTask("Candidate1", 1, "inbox mail", [
		"Analytics",
		"Orchestration",
		"Frontend"
	]);
	tm.createTask("Candidate2", 2, "intro", ["Analytics"]);
	tm.createTask("Candidate3", 3, "Round 1", ["Orchestration"]);
	tm.createTask("Candidate4", 3, "Round 1", ["Frontend"]);
	tm.createTask("Candidate5", 3, "Round 1");
	tm.createTask("Candidate6", 4, "Round 2");
	tm.createTask("Candidate7", 5, "Face To Face");
}

export function restoreInstance() {
	const { tasks = [], categories = [], users = [] } =
		JSON.parse(window.localStorage.getItem(storeKey)) || {};
	return createInstance({ tasks, categories, users });
}

export function saveInstance(instance = {}) {
	const { tasks, categories, users } = instance;
	window.localStorage.setItem(
		storeKey,
		JSON.stringify({ tasks, categories, users })
	);
}
