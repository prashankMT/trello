require("./utils/handlebarHelpers");

import { restoreInstance, saveInstance } from "./core/instanceHandler";

import handleTaskView from "./uiHandlers/taskModalHandler";
import handleTaskManagerView, {
	handleDragging
} from "./uiHandlers/taskManagerHandler";
import { renderTaskManager } from "./uiHandlers/renderer";

function init() {
	const instance = restoreInstance()
	renderTaskManager(instance);
	handleTaskManagerView(instance);
	handleTaskView(instance);
	handleDragging(instance);
	window.tm = instance;
	window.onbeforeunload = function(e) {
		saveInstance(instance);
		e = e || window.event;
		return "Sure?";
	};
}

init();
