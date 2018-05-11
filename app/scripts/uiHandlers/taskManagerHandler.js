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
		$(`#add-label-${categoryId}`).off().on("click", () =>
			addTaskHandler(tm, categoryId)
		);
		$(`#cancel-label-creation-${categoryId}`).off().on("click", () =>
			toggleAddTaskForm(categoryId, false)
		);
	});
}

export function handleDragging(tm) {
	$("[data-droppable]").sortable({
		connectWith: "[data-droppable]",
		forceHelperSize: true,
		receive: (event, ui)=>{
			const taskId = ui.item.find("[data-type='task']").data("id")
			const currentCategoryId = ui.item.closest("[data-category]").data("category");
			tm.getTaskDetailsById(taskId).update({category: currentCategoryId});
		}
	});
}

export default handleTaskManagerView;
