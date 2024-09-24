const questions = [
    {
        question: "What's a popular Halloween candy?",
        answers: [
            { answer: "Candy Corn", points: 18 },
            { answer: "Chocolate", points: 32 },
            { answer: "Gummy Bears", points: 15 },
            { answer: "Skittles", points: 10 },
            { answer: "Snickers", points: 12 },
            { answer: "Lollipops", points: 13 }
        ]
    },
    {
        question: "What do people carve on Halloween?",
        answers: [
            { answer: "Pumpkins", points: 45 },
            { answer: "Turnips", points: 5 },
            { answer: "Watermelons", points: 8 },
            { answer: "Squash", points: 6 },
            { answer: "Potatoes", points: 4 },
            { answer: "Cucumbers", points: 2 }
        ]
    },
    {
        question: "What Halloween costume is most common?",
        answers: [
            { answer: "Witch", points: 28 },
            { answer: "Vampire", points: 22 },
            { answer: "Zombie", points: 19 },
            { answer: "Ghost", points: 15 },
            { answer: "Pirate", points: 10 },
            { answer: "Skeleton", points: 8 }
        ]
    },
    {
        question: "What's a typical Halloween decoration?",
        answers: [
            { answer: "Spider Webs", points: 24 },
            { answer: "Pumpkins", points: 30 },
            { answer: "Skeletons", points: 12 },
            { answer: "Bats", points: 14 },
            { answer: "Ghosts", points: 18 },
            { answer: "Candles", points: 8 }
        ]
    },
    {
        question: "What do you say when trick-or-treating?",
        answers: [
            { answer: "Trick or Treat", points: 50 },
            { answer: "Happy Halloween", points: 12 },
            { answer: "Boo", points: 5 },
            { answer: "Give me candy", points: 10 },
            { answer: "Surprise", points: 7 },
            { answer: "Thank You", points: 8 }
        ]
    },
    {
        question: "What animal is commonly associated with Halloween?",
        answers: [
            { answer: "Black Cat", points: 35 },
            { answer: "Bat", points: 25 },
            { answer: "Owl", points: 20 },
            { answer: "Spider", points: 15 },
            { answer: "Rat", points: 10 },
            { answer: "Wolf", points: 5 }
        ]
    },
    {
        question: "What's a famous horror movie?",
        answers: [
            { answer: "Halloween", points: 40 },
            { answer: "The Shining", points: 25 },
            { answer: "It", points: 30 },
            { answer: "Psycho", points: 15 },
            { answer: "Scream", points: 10 },
            { answer: "A Nightmare on Elm Street", points: 20 }
        ]
    },
    {
        question: "What's a classic Halloween song?",
        answers: [
            { answer: "Monster Mash", points: 50 },
            { answer: "Thriller", points: 35 },
            { answer: "This Is Halloween", points: 15 },
            { answer: "Ghostbusters", points: 10 },
            { answer: "Somebody's Watching Me", points: 8 },
            { answer: "Spooky Scary Skeletons", points: 7 }
        ]
    },
    {
        question: "What is typically found in a haunted house?",
        answers: [
            { answer: "Ghosts", points: 40 },
            { answer: "Monsters", points: 25 },
            { answer: "Cobwebs", points: 30 },
            { answer: "Skeletons", points: 15 },
            { answer: "Spooky Sounds", points: 20 },
            { answer: "Jump Scares", points: 10 }
        ]
    },
    {
        question: "What do people commonly do on Halloween?",
        answers: [
            { answer: "Trick or Treat", points: 60 },
            { answer: "Attend Parties", points: 20 },
            { answer: "Decorate", points: 15 },
            { answer: "Watch Horror Movies", points: 10 },
            { answer: "Haunted Houses", points: 12 },
            { answer: "Dress Up", points: 8 }
        ]
    }
];

let currentQuestionIndex = 0;
let boysPoints = 0;
let girlsPoints = 0;
let round = 1;

$(document).ready(function () {
    $("#start-game").click(startGame);
    $("#next-question").click(nextQuestion);
    $("#play-team").click(playForBoys);
    $("#play-team-girls").click(playForGirls);
    $("#steal-points").click(stealPoints);
});

function startGame() {
    $("#welcome-screen").addClass("hidden");
    $("#game-screen").removeClass("hidden");
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    $("#question-text").text(question.question);
    const answersDiv = $("#answers");
    answersDiv.empty(); // Clear previous answers

    question.answers.forEach(answer => {
        const answerElement = $("<div>").addClass("answer").text(`${answer.answer} (${answer.points} points)`);
        answersDiv.append(answerElement);
    });

    $("#round-number").text(round);
    $("#boys-points").text(boysPoints);
    $("#girls-points").text(girlsPoints);

    $("#question-container").removeClass("hidden");
    $("#next-question").addClass("hidden");
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
    const question = questions[currentQuestionIndex];
    boysPoints += question.answers.reduce((sum, answer) => sum + answer.points, 0);
