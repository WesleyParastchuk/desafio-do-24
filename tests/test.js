const readline = require("readline");
const solve24 = require("../solve24.js");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function generateRandomString() {
	let result = "";
	for (let i = 0; i < 4; i++) {
		result += Math.floor(Math.random() * 9) + 1;
	}
	return result;
}

rl.question("Informe o número de testes que quer fazer: ", answer => {
	for (let i = 0; i < answer; i++) {
		const testString = generateRandomString();
        console.log(`Teste ${i + 1}: ${testString}`);
        console.log(solve24(testString) + "\n");
	}
	rl.close();
});
