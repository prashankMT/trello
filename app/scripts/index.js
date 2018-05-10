require("bootstrap");

import Handlebars from "handlebars";
import $ from "jquery";

import View from "../views/taskManager.html";

import TaskManager from "./core/taskManager";

const template = Handlebars.compile(View);

function main() {
	const tm = new TaskManager("Trello");
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

	tm.createTask("Candidate1", "inbox mail", 1, ["Analytics"]);
	tm.createTask("Candidate2", "intro", 2, ["Analytics"]);
	tm.createTask("Candidate3", "Round 1", 3, ["Orchestration"]);
	tm.createTask("Candidate4", "Round 1", 3, ["Frontend"]);
	tm.createTask("Candidate5", "Round 1", 3);
	tm.createTask("Candidate6", "Round 2", 4);
	tm.createTask("Candidate7", "Face To Face", 5);
	return tm;
}

const tm = main();
window.tm = tm;
const taskManagerData = Object.values(tm.getTaskByCategories()).sort((a, b) => {
	return a.index - b.index;
});
$("#container").html(template({tasksByCategories:taskManagerData}));
