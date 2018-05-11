import Handlebars from "handlebars";

import { getRandomLabelType } from "./index";

Handlebars.registerHelper("getRandomLabelType", function(items) {
	return getRandomLabelType();
});
