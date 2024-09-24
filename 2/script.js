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
let correctAnswers = []; // Store correct answers for current question

$(document).ready(function () {
    $("#start-game").click(startGame);
    $("#next-question").click(nextQuestion);
    $("#play-team").click(playForBoys);
    $("#play-team-girls").click(playForGirls);
    $("#steal-points").click(stealPoints);
    $("#submit-guess").click(checkGuess); // Bind guess check function
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

    // Store correct answers for checking
    correctAnswers = question.answers.map(answer => answer.answer.toLowerCase());

    $("#round-number").text(round);
    $("#boys-points").text(boysPoints);
    $("#girls-points").text(girlsPoints);
    
    $("#user-guess").val(''); // Clear previous input
    $("#question-container").removeClass("hidden");
    $("#next-question").addClass("hidden");
    $("#play-team").addClass("hidden");
    $("#play-team-girls").addClass("hidden");
    $("#submit-guess").removeClass("hidden"); // Show the guess button
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function checkGuess() {
    const userGuess = $("#user-guess").val().trim().toLowerCase();
    
    if (!userGuess) return; // Ignore empty input
    $("#user-guess").val(''); // Clear input field after submission

    // Check if the guess is correct
    if (correctAnswers.includes(userGuess)) {
        const points = questions[currentQuestionIndex].answers.find(answer => answer.answer.toLowerCase() === userGuess).points;
        
        // Add points to the playing team
        if ($("#play-team").is(":visible")) {
            boysPoints += points;
            $("#boys-points").text(boysPoints);
        } else {
            girlsPoints += points;
            $("#girls-points").text(girlsPoints);
        }

        // Display correct answers after a correct guess
        displayAnswers();
        $("#next-question").removeClass("hidden");
        $("#submit-guess").addClass("hidden"); // Hide guess button
    } else {
        // Notify user if guess is incorrect
        alert("Incorrect guess, try again!");
    }
}

function displayAnswers() {
    const answersDiv = $("#answers");
    answersDiv.empty(); // Clear previous answers

    questions[currentQuestionIndex].answers.forEach(answer => {
        const answerElement = $("<div>")
            .addClass("answer")
            .text(answer.answer);
        answersDiv.append(answerElement);
    });
}

function playForBoys() {
    const question = questions[currentQuestionIndex];
    boysPoints += question.answers.reduce((sum, answer) => sum + answer.points, 0);
    $("#boys-points").text(boysPoints);
    $("#next-question").removeClass("hidden");
    $("#play-team").addClass("hidden");
    $("#play-team-girls").addClass("hidden");
}

function playForGirls() {
    const question = questions[currentQuestionIndex];
    girlsPoints += question.answers.reduce((sum, answer) => sum + answer.points, 0);
    $("#girls-points").text(girlsPoints);
    $("#next-question").removeClass("hidden");
    $("#play-team").addClass("hidden");
    $("#play-team-girls").addClass("hidden");
}

function stealPoints() {
    const question = questions[currentQuestionIndex];
    // Add logic for the stealing team
    const stealPointsValue = Math.floor(Math.random() * 50) + 1; // Random steal points for demonstration
    boysPoints += stealPointsValue;
    $("#boys-points").text(boysPoints);
    $("#next-question").removeClass("hidden");
    $("#play-team").addClass("hidden");
    $("#play-team-girls").addClass("hidden");
}

function endGame() {
    $("#question-container").addClass("hidden");
    const winner = boysPoints > girlsPoints ? "Boys" : "Girls";
    alert(`Game Over! The winner is: ${winner}`);
}
