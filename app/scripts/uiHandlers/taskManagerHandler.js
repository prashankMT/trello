import { renderTaskManager, renderTaskModal } from "./renderer";

function toggleAddTaskForm(categoryId, show = true) {
	if (show) {
		$(`#add-new-task-${categoryId}`).addClass("hide");
		$(`#new-task-form-${categoryId}`).removeClass("hide");
	} else {
		$(`#add-new-task-${categoryId}`).removeClass("hide");
		$(`#new-task-form-${categoryId}`).addClass("hide");
	}
}

function addTask(tm, categoryId) {
	const taskName = $(`#new-task-title-${categoryId}`).val();
	tm.createTask(taskName, categoryId);
	renderTaskManager(tm);
}

function handleAddNewTask(tm) {
	$("#container").on("click", "[data-type='add-new-task']", function() {
		const categoryId = $(this).data("id");
		toggleAddTaskForm(categoryId, true);
		$(`#add-label-${categoryId}`)
			.off()
			.on("click", () => addTask(tm, categoryId));
		$(`#cancel-label-creation-${categoryId}`)
			.off()
			.on("click", () => toggleAddTaskForm(categoryId, false));
	});
}

function handleTaskEdit(tm) {
	$("#container").on("click", "[data-type='task']", function() {
		const taskId = $(this).data("id");
		const taskDetails = tm.getTaskDetailsById(taskId);
		renderTaskModal({ ...taskDetails, users: tm.users });
	});
}

function handleDeleteCategory(tm) {
	$("#container").on("click", "[data-delete-category]", function() {
		const categoryId = $(this).data("id");
		tm.deleteCategory(categoryId);
		renderTaskManager(tm);
	});
}

export default function handleTaskManagerView(tm) {
	handleTaskEdit(tm);
	handleAddNewTask(tm);
	handleDeleteCategory(tm);
}
