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
		fetch(`https://simplipsum.now.sh/api?words=20`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			// no-cors, *cors, same-origin
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then(res => res.json())
			.then(data => (output.innerHTML = data.text))
			.catch(err => console.log(err));
	}
};

// add event listener
window.addEventListener('click', generate);
