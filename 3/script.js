$(document).ready(function () {
    let currentRound = 1;
    let totalPoints = 0;
    const maxRounds = 3;
    const questions = [
        [
            {
                question: "Name something people do at a Halloween party", 
                answers: { 
                    "dance": 30, "dancing": 30, 
                    "drink": 25, "drinking": 25, 
                    "carve pumpkins": 20, "carving pumpkins": 20, 
                    "eat candy": 15, "eating candy": 15, 
                    "wear costumes": 10, "costumes": 10, "dressing up": 10 
                }
            },
            {
                question: "What scares people the most on Halloween?", 
                answers: { 
                    "ghosts": 40, "ghost": 40, 
                    "spiders": 20, "spider": 20, 
                    "zombies": 15, "zombie": 15, 
                    "darkness": 10, "dark": 10, 
                    "witches": 5, "witch": 5 
                }
            }
        ],
        // Add similar variations for other rounds
    ];
    let currentQuestionIndex = 0;
    let currentQuestion = questions[currentRound - 1][currentQuestionIndex];
    let correctAnswers = [];
    let wrongAnswerCount = 0;

    function loadNextQuestion() {
        $("#question-text").text(currentQuestion.question);
        correctAnswers = [];
        $("#answers-list").empty();
        $("#answer-input").val("").prop("disabled", false);
        $("#submit-answer").prop("disabled", false);
        wrongAnswerCount = 0;
        $(".wrong-answer").remove();
    }

    $("#start-game").click(function () {
        $(".game-header").hide();
        $(".game-area").show();
        loadNextQuestion();
    });

    $("#submit-answer").click(submitAnswer);
    
    $("#answer-input").keypress(function(event) {
        if (event.key === "Enter") {
            submitAnswer();
        }
    });

    function submitAnswer() {
        let userAnswer = $("#answer-input").val().toLowerCase().trim();
        if (currentQuestion.answers[userAnswer] !== undefined && !correctAnswers.includes(userAnswer)) {
            let points = currentQuestion.answers[userAnswer];
            totalPoints += points;
            correctAnswers.push(userAnswer);
            $("#answers-list").append(`<li>${userAnswer} - ${points} points</li>`);
            $("#answer-input").val("");
        } else {
            showWrongAnswer();
        }
    }

function showWrongAnswer() {
    wrongAnswerCount++;
    // Clear any previously appended red X's
    $(".wrong-answers").remove();

    let redXContainer = $('<div class="wrong-answers"></div>').css({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
    });

    // Add a red X for each wrong answer count
    for (let i = 0; i < wrongAnswerCount; i++) {
        let redX = $('<div class="wrong-answer">X</div>').css({
            color: 'red',
            fontSize: '50px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '3px solid red',
            display: 'inline-block',
            padding: '10px',
            marginLeft: '5px'
        });
        redXContainer.append(redX);
    }

    $(".game-area").append(redXContainer);

    // Fade out after 2 seconds, but keep the red X's visible if wrongAnswerCount > 0
    setTimeout(function() {
        redXContainer.fadeOut(function() {
            $(this).remove();
        });
    }, 2000);
}


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
