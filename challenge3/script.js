function rpsGame(yourChoice) {
	console.log(yourChoice);

	let humanChoice, botChoice;
	humanChoice = yourChoice.id;
	botChoice = numberToChoice(randToRpsInt());
	console.log("Computer choice:", botChoice);
	results = decideWinner(humanChoice, botChoice);
	console.log(results);
	message = finalMessage(results);
	console.log(message);
	rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
	return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
	return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
	let rpsDatabase = {
		rock: { scissors: 1, rock: 0.5, paper: 0 },
		paper: { rock: 1, paper: 0.5, scissors: 0 },
		scissors: { paper: 1, scissors: 0.5, rock: 0 },
	};
	let yourScore = rpsDatabase[yourChoice][computerChoice];
	let computerScore = rpsDatabase[computerChoice][yourChoice];

	return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
	if (yourScore === 0) {
		return { message: "You Lost!", color: "maroon" };
	} else if (yourScore === 0.5) {
		return { message: "You Tied!", color: "gold" };
	} else {
		return { message: "You Won!", color: "green" };
	}
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
	let imagesDatabase = {
		rock: document.getElementById("rock").src,
		paper: document.getElementById("paper").src,
		scissors: document.getElementById("scissors").src,
	};
	// remove all the images after clicked
	document.getElementById("rock").remove();
	document.getElementById("paper").remove();
	document.getElementById("scissors").remove();

	let humanDiv = document.createElement("div");
	let botDiv = document.createElement("div");
	let messageDiv = document.createElement("div");

	humanDiv.innerHTML =
		"<img src='" +
		imagesDatabase[humanImageChoice] +
		"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
	botDiv.innerHTML =
		"<img src='" +
		imagesDatabase[botImageChoice] +
		"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
	messageDiv.innerHTML =
		"<h1 style='color: " +
		finalMessage["color"] +
		"; font-size: 60px; padding: 30px;'>" +
		finalMessage["message"] +
		"</h1>";

	document.getElementById("flex-rps").appendChild(humanDiv);
	document.getElementById("flex-rps").appendChild(botDiv);
	document.getElementById("flex-rps").appendChild(messageDiv);
}
