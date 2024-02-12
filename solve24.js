function factorial(n) {
	if (n === 0) return 1;
	return n * factorial(n - 1);
}

function numOfdifferentNumbers(arr) {
	return new Set(arr).size;
}

function isValid(string) {
	return Array.from(string).filter(x => x >= 1 && x <= 9).length === 4;
}

function sumOfAll(arr) {
	return arr.reduce((acc, cur) => acc + cur, 0);
}

//Gerador que retorna a permutação do Array, impedindo repetições
function* getPermutations(array) {
	if (array.length === 1) {
		yield array;
		return;
	}

	for (let i = 0; i < array.length; i++) {
		const subArray = array.slice(0, i).concat(array.slice(i + 1));
		for (let subPermutation of getPermutations(subArray)) {
			yield [array[i]].concat(subPermutation);
		}
	}
}

function calc(a, b, operator){
	return eval(`${a} ${operator} ${b}`);
}

function solve24(string) {
	if (isValid(string)) {
		stats.originalString = string;
		stats.numbers = Array.from(string).map(x => parseInt(x));
		stats.result = sumOfAll(stats.numbers);
		permute.setMaxPermutations();
		let permutation = null; 

		//Enquanto houver permutações a serem feitas, realiza 
		while (permute.can()) {
			const [a, b, c, d] = permutation || stats.numbers;
			for (let i = 0; i < 4; i++) {
				const op1 = operators[i];
				for (let j = 0; j < 4; j++) {
					const op2 = operators[j];
					for (let k = 0; k < 4; k++) {
						const op3 = operators[k];
						stats.result = calc(calc(calc(a, b, op1), c, op2), d, op3);
						if (stats.result === valueToSearch) {
							return `((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d} = ${valueToSearch}`;
						}
						stats.result = calc(calc(a, b, op1), calc(c, d, op3), op2);
						if (stats.result === valueToSearch) {
							return `(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d}) = ${valueToSearch}`;
						}
						stats.result = calc(calc(a, calc(b, c, op2), op1), d, op3);
						if (stats.result === valueToSearch) {
							return `(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d} = ${valueToSearch}`;
						}
						stats.result = calc(a, calc(calc(b, c, op2), d, op3), op1);
					}
				}
			}
			permutation = permute.realize();
		}
		return "Sem solução!";
	} else {
		return "Entrada inválida!";
	}
}

const valueToSearch = 24;

//Responsável por armazenar os dados temporários
const stats = {
	originalString: "",
	result: 0,
	numbers: [0, 0, 0, 0],
};

const operators = ["+", "-", "*", "/"];

//Responsável por gerenciar as permutações
const permute = {
	permutations: 0,
	maxPermutations: factorial(numOfdifferentNumbers(stats.numbers)),
	setMaxPermutations: () => {
		permute.maxPermutations = factorial(
			numOfdifferentNumbers(stats.numbers)
		);
	},
	permutationGenerator: null,
	can: () => {
		return permute.permutations < permute.maxPermutations;
	},
	add: () => {
		permute.permutations++;
	},
	realize: () => {
		if (!permute.permutationGenerator) {
			permute.permutationGenerator = getPermutations(stats.numbers);
		}
		const nextPermutation = permute.permutationGenerator.next().value;
		if (nextPermutation) {
			permute.add();
			return nextPermutation;
		}
		return null;
	},
};

module.exports = solve24;
