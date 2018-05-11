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

function addTaskHandler(tm, categoryId) {
	const taskName = $(`#new-task-title-${categoryId}`).val();
	tm.createTask(taskName, categoryId);
	renderTaskManager(tm);
}

function handleTaskManagerView(tm) {
	$("#container").on("click", "[data-type='task']", function() {
		const taskId = $(this).data("id");
		const taskDetails = tm.getTaskDetailsById(taskId);
		renderTaskModal(taskDetails);
	});

	$("#container").on("click", "[data-type='add-new-task']", function() {
		const categoryId = $(this).data("id");
		toggleAddTaskForm(categoryId, true);
		$(`#add-label-${categoryId}`).on("click", () =>
			addTaskHandler(tm, categoryId)
		);
		$(`#cancel-label-creation-${categoryId}`).on("click", () =>
			toggleAddTaskForm(categoryId, false)
		);
	});
}

export function handleDragging() {
	$("[data-type='task']").sortable({
		connectWith: "[data-type='category']"
	});
}

export default handleTaskManagerView;
