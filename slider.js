class PhotoGalley {
	constructor(startFrom = 0) {
		startFrom = startFrom > this.maxPhoto ? 0 : startFrom;
		this.actualPhoto = startFrom;
		this.inits();

		this.setPhoto(startFrom);
	}
	switchPhoto(direction = "next") {
		if (direction === "next") {
			this.actualPhoto++;
			if (this.actualPhoto > this.maxPhoto) {
				this.actualPhoto = 0;
			}
		} else if (direction === "prev") {
			this.actualPhoto--;
			if (this.actualPhoto < 0) {
				this.actualPhoto = this.maxPhoto;
			}
		}
		this.setPhoto();
	}
	setPhoto(number = false) {
		if (number || number === 0) {
			this.actualPhoto = number;
		}
		this.photoListElement.style.transform = `translateX(-${
			this.actualPhoto * 800
		}px)`;

		this.icons.forEach((el, actual) => {
			if (actual == this.actualPhoto) {
				el.classList.add("navIcon--active");
			} else {
				el.classList.remove("navIcon--active");
			}
		});
	}
	inits() {
		this.photoListElement = document.querySelector(".sliderPhotos");
		this.maxPhoto = document.querySelectorAll(".sliderPhoto").length - 1;

		this.prevBtn = document.querySelector(".prevBtn");
		this.nextBtn = document.querySelector(".nextBtn");
		this.prevBtn.addEventListener("click", () => {
			this.switchPhoto("prev");
		});
		this.nextBtn.addEventListener("click", () => {
			this.switchPhoto("next");
		});

		this.navigator = document.querySelector(".navigation");
		this.setupNav();
		this.photos = document.querySelectorAll(".sliderPhoto");

		this.preloaders = document.querySelectorAll(".preloader");

		this.photos.forEach((el, actual) => {
			el.addEventListener("load", () => {
				this.preloaders[actual].style.opacity = "0";
			});
		});
	}
	setupNav() {
		this.navigator.style.width = `${this.maxPhoto * 40}px`;
		for (let i = 0; i <= this.maxPhoto; i++) {
			let icon = document.createElement("div");

			icon.classList.add("navIcon");
			if (this.actualPhoto == i) {
				icon.classList.add("navIcon--active");
			}
			this.navigator.appendChild(icon);
		}
		this.icons = document.querySelectorAll(".navIcon");
		this.icons.forEach((el, actual) => {
			el.addEventListener("click", () => {
				this.setPhoto(actual);
			});
		});
	}
}
let photoGallery = new PhotoGalley();
