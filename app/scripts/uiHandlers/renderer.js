import Handlebars from "handlebars";

import TaskModal from "../../views/taskModal.html";
import UserModal from "../../views/userModal.html";
import CategoryModal from "../../views/categoryModal.html";
import MainView from "../../views/taskManager.html";

const TaskManagerView = Handlebars.compile(MainView);
const TaskModalView = Handlebars.compile(TaskModal);
const UserModalView = Handlebars.compile(UserModal);
const CategoryModalView = Handlebars.compile(CategoryModal);

let updateAssignees = function(tm) {
	const users = [];
	const taskId = $("#modal #task-title").data("id");
	const taskDetails = tm.getTaskDetailsById(taskId);

	const selectedUsers = $("#modal .dropdown-chose");
	$(selectedUsers).each((index, selected) => {
		users.push(parseInt($(selected).data("value")));
	});

	taskDetails.update({ assignees: users });
	renderTaskManager(tm);
};

function handleTaskAssignees(instance) {
	const contextualHandler = updateAssignees.bind(this, instance);
	$("#modal").on("hide.bs.modal", () => {
		$(document).off("click.dropdown", contextualHandler);
	});
	$("#modal").on("show.bs.modal", () => {
		$("#modal-content #user-options").dropdown({
			multipleMode: "label",
			searchable: false
		});
		$(document).on("click.dropdown", contextualHandler);
	});
}

export function updateTaskModalContent(data) {
	$("#modal-content").html(TaskModalView(data));
}

export function updateUserModalContent(data) {
	$("#modal-content").html(UserModalView(data));
}

export function updateCategoryModalContent(data) {
	$("#modal-content").html(CategoryModalView(data));
}

export function openModal() {
	$("#custom-modal").modal("show");
}
export function closeModal() {
	$("#custom-modal").modal("hide");
	$("#modal-content").html("");
}

export function renderTaskModal(data) {
	updateTaskModalContent(data);
	openModal();
}

export function renderTaskManager(instance) {
	const tasksByCategory = instance.getTaskByCategories();

	const taskManagerData = Object.values(tasksByCategory).sort((a, b) => {
		return a.index - b.index;
	});

	handleTaskAssignees(instance);

	$("#container").html(
		TaskManagerView({
			tasksByCategories: taskManagerData,
			users: instance.users
		})
	);
}
