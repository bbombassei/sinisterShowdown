const questions = [
    {
        question: "What's a popular Halloween candy?",
        answers: [
            "Candy Corn",
            "Chocolate",
            "Gummy Bears",
            "Snickers",
            "Lollipops",
            "Skittles"
        ]
    },
    {
        question: "What do people carve on Halloween?",
        answers: [
            "Pumpkins",
            "Turnips",
            "Watermelons",
            "Potatoes",
            "Squash",
            "Cucumbers"
        ]
    },
    {
        question: "What Halloween costume is most common?",
        answers: [
            "Witch",
            "Vampire",
            "Ghost",
            "Zombie",
            "Skeleton",
            "Pirate"
        ]
    },
    {
        question: "What's a typical Halloween decoration?",
        answers: [
            "Spider Webs",
            "Pumpkins",
            "Bats",
            "Skeletons",
            "Ghosts",
            "Candles"
        ]
    },
    {
        question: "What do you say when trick-or-treating?",
        answers: [
            "Trick or Treat",
            "Happy Halloween",
            "Boo",
            "Thank You",
            "Give me candy",
            "Surprise"
        ]
    },
    {
        question: "What animal is commonly associated with Halloween?",
        answers: [
            "Black Cat",
            "Bat",
            "Owl",
            "Spider",
            "Rat",
            "Wolf"
        ]
    },
    {
        question: "What's a famous horror movie?",
        answers: [
            "Halloween",
            "The Shining",
            "Psycho",
            "It",
            "A Nightmare on Elm Street",
            "Scream"
        ]
    },
    {
        question: "What's a classic Halloween song?",
        answers: [
            "Monster Mash",
            "Thriller",
            "Ghostbusters",
            "Somebody's Watching Me",
            "This Is Halloween",
            "Spooky Scary Skeletons"
        ]
    },
    {
        question: "What is typically found in a haunted house?",
        answers: [
            "Ghosts",
            "Monsters",
            "Cobwebs",
            "Skeletons",
            "Spooky Sounds",
            "Jump Scares"
        ]
    },
    {
        question: "What do people commonly do on Halloween?",
        answers: [
            "Trick or Treat",
            "Attend Parties",
            "Haunted Houses",
            "Watch Horror Movies",
            "Decorate",
            "Dress Up"
        ]
    }
];

let currentQuestionIndex = 0;
let boysPoints = 0;
let girlsPoints = 0;
let round = 1;

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("next-question").addEventListener("click", nextQuestion);
document.getElementById("play-team").addEventListener("click", playForBoys);
document.getElementById("play-team-girls").addEventListener("click", playForGirls);
document.getElementById("steal-points").addEventListener("click", stealPoints);

function startGame() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = ""; // Clear previous answers

    question.answers.forEach(answer => {
        const answerElement = document.createElement("div");
        answerElement.classList.add("answer");
        answerElement.innerText = answer;
        answersDiv.appendChild(answerElement);
    });

    document.getElementById("round-number").innerText = round;
    document.getElementById("boys-points").innerText = boysPoints;
    document.getElementById("girls-points").innerText = girlsPoints;

    document.getElementById("question-container").classList.remove("hidden");
    document.getElementById("next-question").classList.add("hidden");
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endGame();
    }
}

function playForBoys() {
    // Logic for boys playing
    const points = round === 1 ? 1 : round === 2 ? 2 : 3; // Point multiplier
    boysPoints += points; // Add points to boys
    document.getElementById("next-question").classList.remove("hidden");
}

function playForGirls() {
    // Logic for girls playing
    const points = round === 1 ? 1 : round === 2 ? 2 : 3; // Point multiplier
    girlsPoints += points; // Add points to girls
    document.getElementById("next-question").classList.remove("hidden");
}

function stealPoints() {
    // Logic for stealing points
    const points = round === 1 ? 1 : round === 2 ? 2 : 3; // Point multiplier
    const stealingTeam = confirm("Should girls steal the points?") ? 'girls' : 'boys';
    if (stealingTeam === 'girls') {
        girlsPoints += points;
    } else {
        boysPoints += points;
    }
    document.getElementById("next-question").classList.remove("hidden");
}

function endGame() {
    // Logic to end the game
    alert(`Game Over! Final Scores - Boys: ${boysPoints}, Girls: ${girlsPoints}`);
}
