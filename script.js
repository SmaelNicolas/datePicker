import {
	format,
	getUnixTime,
	fromUnixTime,
	addMonths,
	subMonths,
	startOfMonth,
	startOfWeek,
	endOfWeek,
	endOfMonth,
	eachDayOfInterval,
	isSameMonth,
	isSameDay,
} from "date-fns";

let dayPickerButton = document.querySelector(".date-picker-button");

let datePickerPanel = document.querySelector(".date-picker");

let currentMonth = document.querySelector(".current-month");

let previousMonthButton = document.querySelector(".prev-month-button");
let nextMonthButton = document.querySelector(".next-month-button");

let datesGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

dayPickerButton.addEventListener("click", () => {
	datePickerPanel.classList.toggle("show");
	let selectedDate = fromUnixTime(dayPickerButton.dataset.selectedDate);
	currentDate = selectedDate;
	setUpDatePicker(selectedDate);
});

function setDate(date) {
	dayPickerButton.innerText = format(date, "MMMM do yyyy");

	dayPickerButton.dataset.selectedDate = getUnixTime(date);
}

function setUpDatePicker(selectedDate) {
	currentMonth.innerText = format(currentDate, "MMMM - yyyy");
	setUpDates(selectedDate);
}

function setUpDates(selectedDate) {
	let firstWeekStart = startOfWeek(startOfMonth(currentDate));

	let lastWeekEnd = endOfWeek(endOfMonth(currentDate));

	const daysInterval = eachDayOfInterval({
		start: firstWeekStart,
		end: lastWeekEnd,
	});
	datesGrid.innerHTML = "";

	daysInterval.forEach((date) => {
		let dateElement = document.createElement("button");
		dateElement.classList.add("date");
		dateElement.innerHTML = date.getDate();
		if (!isSameMonth(date, currentDate)) {
			dateElement.classList.add("date-picker-other-month-date");
		}
		if (isSameDay(date, selectedDate)) {
			dateElement.classList.add("selected");
		}

		dateElement.addEventListener("click", () => {
			setDate(date);
			datePickerPanel.classList.remove("show");
		});
		datesGrid.appendChild(dateElement);
	});
}

nextMonthButton.addEventListener("click", () => {
	let selectedDate = fromUnixTime(dayPickerButton.dataset.selectedDate);
	currentDate = addMonths(currentDate, 1);
	setUpDatePicker(selectedDate);
});

previousMonthButton.addEventListener("click", () => {
	let selectedDate = fromUnixTime(dayPickerButton.dataset.selectedDate);
	currentDate = subMonths(currentDate, 1);
	setUpDatePicker(selectedDate);
});

setDate(new Date());
