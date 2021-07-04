import animate from 'animate-prop';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
window.addEventListener('popstate', event => {
	const showMenu = location.hash === '#menu';
	$('.nav').hidden = !showMenu;
	$('main').hidden = showMenu;

	if (showMenu) {
		window.scrollTo(0, 0);
	} else {
		$(location.hash).scrollIntoView();
	}
});

function easeOutQuint(x) {
	return 1 - Math.pow(1 - x, 5);
	}

function zoomOnClick({currentTarget: button}) {
	button.disabled = true;
	const image = button.firstChild;
	try {
		const initialHeight = getComputedStyle(image).height;
		image.style.height = 'auto';
		const openHeight = getComputedStyle(image).height;
		const {top} = image.getBoundingClientRect();
		image.animate([
			{height: initialHeight},
			{height: openHeight}
		], {
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			duration: 500
		}).finished.then(() => {
			image.style.height = 'auto';
		});
		animate(
			document.documentElement,
			'scrollTop',
			document.documentElement.scrollTop + top - 100,
			500,
			easeOutQuint,
		);
	} catch (error) {
		image.style.height = 'auto';
		throw error;
	}
}

$$('.dish-image').forEach(button => {
	button.addEventListener('click', zoomOnClick);
});

const allergenToggle = $('.toggle-allergens');
allergenToggle.addEventListener('click', () => {
	localStorage.showAllergens = Number(
		document.body.classList.toggle('show-allergens')
	);
});

document.body.classList.toggle(
	'show-allergens',
	Number(localStorage.showAllergens)
);