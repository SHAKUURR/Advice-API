const paragraph = document.querySelector(".paragraph");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const submit = document.querySelector(".submit");
const heading = document.querySelector(".heading");

const init = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};
const openModal = function () {
	const query = document.querySelector(".input").value;
	init();
	fetch(`https://api.adviceslip.com/advice/search/${query}`)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Advice not found for this category (error ${response.status})`
				);
			return response.json();
		})
		.then((advices) => {
			// const { advice } = advices.slip;
			if (!advices.slips || advices.slips.length === 0) {
				heading.textContent = "Say Cheese! 😎";
				throw new Error("No advice found for this search.");
			}
			const randomIndex = Math.floor(Math.random() * advices.slips.length);
			const randomAdvis = advices.slips[randomIndex];
			modalText.textContent = `${randomAdvis.advice}`;
		})
		.catch((err) => {
			modalText.textContent = err.message;
			heading.textContent = "Say Cheese! 😎";
		});
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

//Adding event handler to each buttons
submit.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
	if (!modal.classList.contains("hidden") && e.key === "Escape") {
		closeModal();
	}
});
