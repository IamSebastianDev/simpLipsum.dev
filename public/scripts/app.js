/** @format */

/**
 *
 *  simplipsum - Simple Lorem Ipsum Generator
 *  @copyright Sebastian Heinz, 2020.
 *
 */

// fetching and displaying the lipsum data.

let output = document.querySelector('.generator-Output');

const generate = event => {
	// check if the generate button was clicked
	if (event.target.closest('.generator-GenerateButton')) {
		// get values to construct fetch data
		let amount = document.querySelector(
			".generator-Controls input[type='number']"
		).value;

		let type = document.querySelector('.generator-Controls select').value;

		// fetch data and append to output
		fetch(`https://simplipsum.now.sh/api?${type}=${amount}`)
			.then(res => res.json())
			.then(data => (output.innerHTML = data.text))
			.catch(err => console.log(err));
	}
};

// add event listener
window.addEventListener('click', generate);

// copy function

const copy = () => {
	// check if copy button was clicked
	if (event.target.closest('.generator-CopyButton')) {
		let src = output.innerHTML;

		console.log(src);

		if (navigator.clipboard) {
			let data = [
				new ClipboardItem({
					'text/plain': new Blob([src], {
						type: 'text/plain'
					})
				})
			];

			navigator.clipboard.write(data);
		} else {
			// fallback for Safari mostly, which doesn't support the clipboard api.
			// and obviouly IE, but who cares.

			let data = document.createElement('textarea');

			data.style =
				'display: hidden; position: fixed: top: 0; left: 0; z-index: -1000; visibilty: none;';
			document.querySelector('body').appendChild(data);
			data.value = src;

			data.focus();
			data.select();
			data.setSelectionRange(0, 99999); /*For mobile devices*/

			/* Copy the text inside the text field */
			document.execCommand('copy');

			data.remove();
		}
	}
};

// add event listener
window.addEventListener('click', copy);

// menu

let menu = document.querySelector('.nav-Bar ul');

window.addEventListener('click', event => {
	if (event.target.closest('.nav-MenuOpenBttn')) {
		menu.style.transform = 'translateY(0px)';
		document.querySelector('html').style.overflowY = 'hidden';
	}

	if (event.target.closest('.nav-MenuCloseBttn')) {
		menu.style.transform = 'translateY(-100%)';
		document.querySelector('html').style.overflowY = 'unset';
	}
});
