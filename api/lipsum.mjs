/** @format */

// import express and & init
import express from 'express';
const app = express();

// import source
import source from './lorem.source.mjs';

// implenting a simple rate limiting of one request per second
// on server start, a last request variable is initalized
// on every request, this variable is timestamped.
let lastRequest = Date.now();
const limitTimeInMS = 100;

/**
 *   @param {number} timeStamp - timestamp to check against
 *
 *      implementing rate limit at 10 requests per second
 *
 *      TODO: Once we start hitting this reliably, implementing a rate limiting idea on api key might be smart.
 *
 */

const rateLimiter = timestamp => {
	if (timestamp - lastRequest > limitTimeInMS) {
		// if difference is bigger then the set timelimit, return true and set last Request to current Timestamp

		lastRequest = timestamp;
		return true;
	} else {
		// write limit to the console

		console.log('Rate limit hit. Timeout!');

		// if the rate limit is hit, return false and set last Request to current Timestamp
		lastRequest = timestamp;
		return false;
	}
};

/**
 *
 * @param { object } request -  the object that holds the request type (Paragraphs, Sentences, Words or Characters) and
 *                              the amount that has been requested and extracted from the query string
 *
 */

const createLoremIpsumText = request => {
	// initalize response variable

	let textFormatted = '';
	let textRaw = '';

	// check for the requested type.
	// build return sentence accordingly.

	// paragraph
	if (request.paragraphs) {
		// extract string into paragraphs
		let paragraphs = source.loremIpsum.split(/\n\t\n\t/gim);

		for (let i = 0; i < request.paragraphs; i++) {
			textFormatted += `<p>${paragraphs[i % 5]}</p>`;
			textRaw += paragraphs[i % 5];
		}
	}

	// sentence
	if (request.sentences) {
		// split text at "." character, remove whitespace
		let sentences = source.loremIpsum.replace(/\n|\t/gim, '').split('.');

		for (let i = 0; i < request.sentences; i++) {
			textFormatted += `${i % 15 === 0 ? '<p>' : ''}${
				sentences[i % (sentences.length - 1)]
			}.${i % 15 === 14 ? '</p>' : ''}`;
			textRaw += sentences[i % (sentences.length - 1)];
		}

		// add closing p tag if necessary
		textFormatted[textFormatted.length - 1] != '>'
			? (textFormatted += '</p>')
			: textFormatted;
	}

	// words

	if (request.words) {
		// split text on /n, remove white space
		let words = source.loremIpsum.replace(/\n|\t/gim, '').split(/\ /gim);

		for (let i = 0; i < request.words; i++) {
			textFormatted += `${words[i]} `;
			textRaw += `${words[i]}`;
		}

		textFormatted = `<p>${textFormatted}.</p>`.replace(/ \./gim, '.');
	}

	// characters

	if (request.characters) {
		let character = source.loremIpsum
			.replace(/\n|\t/gim, '')
			.replace(' ', '@');

		for (let i = 0; i < request.characters; i++) {
			textFormatted += character[i];
			textRaw += character[i];
		}

		textRaw = textRaw.replace('@', ' ');
		textFormatted = `<p>${textFormatted}</p>`.replace('@', ' ');
	}

	// return text;
	return { textFormatted, textRaw };
};

const lorem = (req, res) => {
	// initalize response Object
	// if no changes happen, this is what will be returned
	let resObj = {
		status: {
			code: 400,
			text: 'no or wrong Parameters',
			timeStamp: Date.now()
		}
	};

	// check against rate limiter on time for request

	if (!rateLimiter(Date.now())) {
		resObj.status = {
			code: 429,
			text: 'to many request',
			timeStamp: Date.now()
		};
	}

	// check if the request has correct parameters
	let request = req.query;

	if (
		request.paragraphs ||
		request.sentences ||
		request.words ||
		request.characters
	) {
		// if one of the parameters is existing, create the parameter object and call the function
		resObj.status = {
			code: 200,
			text: 'ok',
			timeStamp: Date.now()
		};

		// check if there are multiple request paramters
		// and strip all but one.
		let params = Object.entries(request);

		if (params.length > 1) {
			request = {};
			request[params[0][0]] = params[0][1];
		}

		// call the function that will generate the lorem ipsum text
		let text = createLoremIpsumText(request);

		// populate the resObj request answer
		resObj.req = request;

		resObj.text = text.textFormatted;
		resObj.textRaw = text.textRaw;
	}

	// send response
	res.status(resObj.status.code);
	res.send(resObj);
};

export { lorem };
