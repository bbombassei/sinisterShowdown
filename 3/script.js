$(document).ready(function () {
    let currentRound = 1;
    let totalPoints = 0;
    const maxRounds = 3;
    const questions = [
        [
            { question: "Name something people do at a Halloween party", answers: { "dance": 30, "drink": 25, "carve pumpkins": 20, "eat candy": 15, "wear costumes": 10 } },
            { question: "What scares people the most on Halloween?", answers: { "ghosts": 40, "spiders": 20, "zombies": 15, "darkness": 10, "witches": 5 } }
        ],
        [
            { question: "Name a popular Halloween candy", answers: { "Snickers": 35, "Candy Corn": 25, "Kit Kat": 20, "Reese's": 15, "M&Ms": 5 } },
            { question: "What do kids do on Halloween?", answers: { "trick or treat": 50, "scare people": 20, "wear costumes": 15, "tell ghost stories": 10, "eat candy": 5 } }
        ],
        [
            { question: "Name a popular Halloween costume", answers: { "witch": 30, "vampire": 25, "ghost": 20, "zombie": 15, "skeleton": 10 } },
            { question: "What do people decorate their houses with on Halloween?", answers: { "pumpkins": 40, "spiders": 20, "skeletons": 15, "ghosts": 10, "cobwebs": 5 } }
        ]
    ];
    let currentQuestionIndex = 0;
    let currentQuestion = questions[currentRound - 1][currentQuestionIndex];
    let correctAnswers = [];

    function loadNextQuestion() {
        $("#question-text").text(currentQuestion.question);
        correctAnswers = [];
        $("#answers-list").empty();
        $("#answer-input").val("").prop("disabled", false);
        $("#submit-answer").prop("disabled", false);
    }

    $("#start-game").click(function () {
        $(".game-header").hide();
        $(".game-area").show();
        loadNextQuestion();
    });

    $("#submit-answer").click(function () {
        let userAnswer = $("#answer-input").val().toLowerCase();
        if (currentQuestion.answers[userAnswer] !== undefined && !correctAnswers.includes(userAnswer)) {
            let points = currentQuestion.answers[userAnswer];
            totalPoints += points;
            correctAnswers.push(userAnswer);
            $("#answers-list").append(`<li>${userAnswer} - ${points} points</li>`);
            $("#answer-input").val("");
        }
    });

    $(".give-points").click(function () {
        let team = $(this).attr("id") === "give-to-boys" ? "#boys-score" : "#girls-score";
        let currentScore = parseInt($(team).text());
        $(team).text(currentScore + totalPoints);
        totalPoints = 0;
        nextRound();
    });

    function nextRound() {
        currentQuestionIndex++;
        if (currentQuestionIndex < 2) {
            currentQuestion = questions[currentRound - 1][currentQuestionIndex];
            loadNextQuestion();
        } else {
            currentRound++;
            if (currentRound <= maxRounds) {
                $("#round-number").text(currentRound);
                currentQuestionIndex = 0;
                currentQuestion = questions[currentRound - 1][currentQuestionIndex];
                loadNextQuestion();
            } else {
                endGame();
            }
        }
    }

    function endGame() {
        alert("Game Over! See the final scores.");
        $("#answer-input").prop("disabled", true);
        $("#submit-answer").prop("disabled", true);
        $(".give-points").prop("disabled", true);
    }
});
