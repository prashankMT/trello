import Handlebars from "handlebars";

import TaskModal from "../../views/taskModal.html";
import MainView from "../../views/taskManager.html";

const TaskManagerView = Handlebars.compile(MainView);
const TaskModalView = Handlebars.compile(TaskModal);

export function updateModalContent(data) {
	$("#modal-content").html(TaskModalView(data));
}

export function renderTaskModal(data) {
	updateModalContent(data);
	$("#viewTaskModal").modal("show");
}

export function closeTaskModal() {
	$("#viewTaskModal").modal("hide");
}

export function renderTaskManager(instance) {
	const tasksByCategory = instance.getTaskByCategories();

	const taskManagerData = Object.values(tasksByCategory).sort((a, b) => {
		return a.index - b.index;
	});
	$("#container").html(TaskManagerView({ tasksByCategories: taskManagerData }));
}
