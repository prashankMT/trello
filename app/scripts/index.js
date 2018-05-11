require("./utils/handlebarHelpers");

import TaskManager from "./core/taskManager";
import handleTaskView from "./uiHandlers/taskModalHandler";
import handleTaskManagerView,{handleDragging} from "./uiHandlers/taskManagerHandler";
import { renderTaskManager } from "./uiHandlers/renderer";

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

	tm.createTask("Candidate1", 1, "inbox mail", ["Analytics"]);
	tm.createTask("Candidate2", 2, "intro", ["Analytics"]);
	tm.createTask("Candidate3", 3, "Round 1", ["Orchestration"]);
	tm.createTask("Candidate4", 3, "Round 1", ["Frontend"]);
	tm.createTask("Candidate5", 3, "Round 1");
	tm.createTask("Candidate6", 4, "Round 2");
	tm.createTask("Candidate7", 5, "Face To Face");
}

function init() {
	const instance = new TaskManager("Trello");
	createDummyTasks(instance);

	renderTaskManager(instance);
	handleTaskManagerView(instance);
	handleTaskView(instance);
	handleDragging();
	window.tm = instance;
}

init();
