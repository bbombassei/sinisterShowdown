$(document).ready(function() {
    let questions = [
        {
            question: "Name something people associate with Halloween",
            answers: [
                {answer: "Pumpkin", points: 40, synonyms: ["Jack-O-Lantern", "Pumpkins"]},
                {answer: "Costume", points: 30, synonyms: ["Costumes", "Outfit"]},
                {answer: "Candy", points: 20, synonyms: ["Sweets", "Treats"]},
                {answer: "Ghost", points: 10, synonyms: ["Spirits", "Phantoms"]},
                {answer: "Witch", points: 5, synonyms: ["Witches"]},
                {answer: "Haunted House", points: 5, synonyms: ["Haunt"]},
            ]
        },
        {
            question: "Name a popular Halloween movie",
            answers: [
                {answer: "Hocus Pocus", points: 50, synonyms: ["Hocus Pocus 2"]},
                {answer: "Halloween", points: 30, synonyms: ["Michael Myers"]},
                {answer: "Beetlejuice", points: 10, synonyms: []},
                {answer: "Nightmare Before Christmas", points: 5, synonyms: ["Tim Burton"]},
                {answer: "Scream", points: 3, synonyms: []},
                {answer: "The Addams Family", points: 2, synonyms: ["Addams Family"]},
            ]
        }
    ];

    let currentRound = 0;
    let currentQuestion = 0;
    let teamBoysPoints = 0;
    let teamGirlsPoints = 0;

    function loadQuestion(round) {
        $('#question').text(questions[round].question);
        for (let i = 1; i <= 6; i++) {
            $('#answer' + i).text('______');
            $('#points' + i).text('');
        }
    }
    
    function submitAnswer() {
        let userAnswer = $('#answer-input').val().toLowerCase();
        let question = questions[currentRound];
        
        for (let i = 0; i < question.answers.length; i++) {
            let possibleAnswers = [question.answers[i].answer.toLowerCase()].concat(question.answers[i].synonyms.map(s => s.toLowerCase()));
            
            if (possibleAnswers.includes(userAnswer)) {
                $('#answer' + (i + 1)).text(question.answers[i].answer);
                $('#points' + (i + 1)).text(question.answers[i].points);
                break;
            }
        }

    $('#submit-answer').click(function() {
        submitAnswer();
    });

    
    // Submit answer when "Enter" key is pressed
    $('#answer-input').keypress(function(event) {
        if (event.which == 13) {  // 13 is the key code for Enter
            event.preventDefault(); // Prevent form submission
            submitAnswer();  // Trigger the answer submission
        }
    });


        $('#answer-input').val('');  // Clear input field
    };

    $('#end-round').click(function() {
        let winner = prompt("Who won the round? Type 'Boys' or 'Girls'");
        let roundPoints = 0;

        for (let i = 1; i <= 6; i++) {
            let points = parseInt($('#points' + i).text());
            if (!isNaN(points)) {
                roundPoints += points;
            }
        }

        if (winner.toLowerCase() === 'boys') {
            teamBoysPoints += roundPoints;
            $('#team-boys-points').text(teamBoysPoints);
        } else if (winner.toLowerCase() === 'girls') {
            teamGirlsPoints += roundPoints;
            $('#team-girls-points').text(teamGirlsPoints);
        }

        currentRound++;
        if (currentRound < questions.length) {
            loadQuestion(currentRound);
        } else {
            alert("Fast Money Round is next!");
        }
    });

    // Initialize game with first question
    loadQuestion(currentRound);
});
