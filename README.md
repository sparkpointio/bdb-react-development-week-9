# BDB React Development - Week 9 Final Exercise

For week 9 and your final exercise for this course, create a simple UI for Ropsten transactions. API will be provided in the instructions below. You may test using your address used earlier in the solidity course, making sure it’s not an address with empty transactions, else you may get some drip of eth on https://faucet.ropsten.be/

_This only applies to students enrolled in **SparkPoint Academy's** [Blockchain Developer Bootcamp 2021](https://sparkpoint.io/bootcamp)_

## Setup
1. Fork this repository, and clone it on your end.
2. Run `npm install` to generate your `node_modules` folder and download all necessary packages.
3. Ask for the `.env` file from BDB Mentor,  [Harvz](https://github.com/harveyjavier) via Slack DM.
4. Upon receiving the `.env` file, place it in the root folder of the project. Then you can now use `process.env.REACT_APP_ROPSTEN_API_KEY`. This will call the API key from the .env file.
5. Here's the API you're going to use for Ropsten:
	- For ETH / normal transactions: `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`
	- For ERC-20 token transactions: `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ROPSTEN_API_KEY}`

	_Default endpoint values were already provided except for the dynamic ones which are enclosed by `${}`._
6. You can either use `fetch()`, `axios`, or any other third-party API call libraries of your choice.
7. Once you've successfully fetched the API, return it on your console via `console.log()` to check the object properties.
9. Some jargons or confusions you may encounter with the returned object properties of the API:
	- `value` (_String_) - The value property by default is displayed in `gwei`. To convert it to `ether`, just divide it to `1e18`. 18 is the default and standard decimal place for ETH. Same as other ERC-20 tokens, but sometimes they have different decimals. Just double check the `tokenDecimal` property.

		Example:
	```
	let testGwei = "300000000000000000";
	let testEther = Number(testGwei) / 1e18 ;
	console.log(testEther); // output would be 0.3 in ether
	```
	_You'll learn more about this in the next course, Web3js._
	- `timestamp` (_String_) - A timestamp is a sequence of characters or encoded information identifying when a certain event occurred. To convert it to a readable date, use this basic JavaScript's `new Date().toISOString()` method. Make sure the timestamp being passed as argument in the Date function is a `number` data type.

		Example:
	```	
	let testTimestamp = "1628686135";
	let readableDate = new Date(Number(timestamp)).toISOString();
	console.log(readableDate); // output would be "1970-01-19T20:24:46.135Z"
	```
9. To run the project, make sure you're currently in your root folder of the project in your command line and run: `npm start`.
10. Apply all the things you've learned from Week 7 to 9, and create a beautiful UI for Ropsten transactions. Be creative, and happy coding!

## Sample Output

