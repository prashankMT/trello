require("./utils/handlebarHelpers");

import { restoreInstance, saveInstance } from "./core/instanceHandler";

import handleTaskView from "./uiHandlers/taskModalHandler";
import handleTaskManagerView from "./uiHandlers/taskManagerHandler";
import { handleUserAdd, handleCategoryAdd } from "./uiHandlers/menuHandlers";
import { renderTaskManager } from "./uiHandlers/renderer";

function init() {
	const instance = restoreInstance();
	renderTaskManager(instance);
	handleTaskManagerView(instance);
	handleTaskView(instance);
	handleUserAdd(instance);
	handleCategoryAdd(instance);

	window.tm = instance;
	window.onbeforeunload = function(e) {
		saveInstance(instance);
		e = e || window.event;
		return "Sure?";
	};
}

init();
