const ids = {
	userId: 0,
	categoryId: 0,
	taskId: 0
};

export const getNewUserId = () => {
	return ++ids.userId;
};
export const getNewCategoryId = () => {
	return ++ids.categoryId;
};
export const getNewTaskId = () => {
	return ++ids.taskId;
};
