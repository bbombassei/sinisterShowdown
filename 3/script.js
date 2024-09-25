$(document).ready(function () {
    let currentRound = 1;
    let totalPoints = 0;
    const maxRounds = 3;
    const questions = [
        [
            {
                question: "Name something people do at a Halloween party", 
                answers: { 
                    "drink alcohol": 25, // The original answer
                    "drinking": "drink alcohol", // Variations mapping to the original answer
                    "get drunk": "drink alcohol", // Another variation
                    "dance": 30, 
                    "dancing": "dance", // Variation
                    "carve pumpkins": 20, 
                    "carving pumpkins": "carve pumpkins", // Variation
                    "eat candy": 15, 
                    "eating candy": "eat candy", // Variation
                    "wear costumes": 10, 
                    "dressing up": "wear costumes", // Variation
                    "costumes": "wear costumes" // Variation
                }
            },
            {
                question: "What scares people the most on Halloween?", 
                answers: { 
                    "ghosts": 40, 
                    "ghost": "ghosts", 
                    "spiders": 20, 
                    "spider": "spiders", 
                    "zombies": 15, 
                    "zombie": "zombies", 
                    "darkness": 10, 
                    "dark": "darkness", 
                    "witches": 5, 
                    "witch": "witches" 
                }
            }
        ],
        // Add similar structure for other rounds and questions
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
        
        // Map the user answer to the original answer, if it's a variation
        if (currentQuestion.answers[userAnswer] !== undefined) {
            let mappedAnswer = currentQuestion.answers[userAnswer];
            // If the mappedAnswer is a string (meaning it's a variation), map it to the original answer
            if (typeof mappedAnswer === "string") {
                userAnswer = mappedAnswer;
            }

            // Check if the original answer has been guessed already
            if (!correctAnswers.includes(userAnswer)) {
                let points = currentQuestion.answers[userAnswer];
                totalPoints += points;
                correctAnswers.push(userAnswer);
                $("#answers-list").append(`<li>${userAnswer} - ${points} points</li>`);
                $("#answer-input").val("");
            }
        } else {
            showWrongAnswer();
        }
    }

    function showWrongAnswer() {
        wrongAnswerCount++;
        let redX = $('<div class="wrong-answer">X</div>').css({
            color: 'red',
            fontSize: '50px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '3px solid red',
            display: 'inline-block',
            padding: '10px',
            marginTop: '10px'
        });
        $(".game-area").append(redX);
        setTimeout(function() {
            redX.fadeOut(function() {
                $(this).remove();
            });
        }, 2000); // Display for 2 seconds
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
