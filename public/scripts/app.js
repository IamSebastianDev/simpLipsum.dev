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
	if (event.target.matches('.generator-GenerateButton')) {
		// get values to construct fetch data
		let amout = document.querySelector(
			".generator-Controls input[type='number']"
		).value;

		let type = document.querySelector('.generator-Controls select').value;

		// fetch data and append to output
		fetch(`https://simplipsum.now.sh/api?${type}=${amout}`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'no-cors' // no-cors, *cors, same-origin
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}
};

// add event listener
window.addEventListener('click', generate);
