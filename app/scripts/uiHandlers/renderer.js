import Handlebars from "handlebars";

import TaskModal from "../../views/taskModal.html";
import UserModal from "../../views/userModal.html";
import CategoryModal from "../../views/categoryModal.html";
import MainView from "../../views/taskManager.html";

const TaskManagerView = Handlebars.compile(MainView);
const TaskModalView = Handlebars.compile(TaskModal);
const UserModalView = Handlebars.compile(UserModal);
const CategoryModalView = Handlebars.compile(CategoryModal);

export function updateTaskModalContent(data) {
	$("#modal-content").html(TaskModalView(data));
}

export function updateUserModalContent(data) {
	$("#modal-content").html(UserModalView(data));
}

export function updateCategoryModalContent(data) {
	$("#modal-content").html(CategoryModalView(data));
}

export function renderTaskModal(data) {
	updateTaskModalContent(data);
	openModal();
}

export function openModal() {
	$("#custom-modal").modal("show");
}
export function closeModal() {
	$("#custom-modal").modal("hide");
}

export function renderTaskManager(instance) {
	const tasksByCategory = instance.getTaskByCategories();

	const taskManagerData = Object.values(tasksByCategory).sort((a, b) => {
		return a.index - b.index;
	});
	$("#container").html(TaskManagerView({ tasksByCategories: taskManagerData }));
}
