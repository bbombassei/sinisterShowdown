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
        },
        {
            question: "Name a popular Halloween candy",
            answers: [
                {answer: "Snickers", points: 40, synonyms: []},
                {answer: "Reese's", points: 35, synonyms: ["Reese's Pieces"]},
                {answer: "Candy Corn", points: 20, synonyms: []},
                {answer: "M&M's", points: 15, synonyms: []},
                {answer: "Skittles", points: 10, synonyms: []},
                {answer: "Twix", points: 5, synonyms: []},
            ]
        },
        {
            question: "What do you dress up as for Halloween?",
            answers: [
                {answer: "Vampire", points: 50, synonyms: ["Dracula"]},
                {answer: "Zombie", points: 30, synonyms: []},
                {answer: "Ghost", points: 20, synonyms: []},
                {answer: "Pirate", points: 15, synonyms: []},
                {answer: "Princess", points: 10, synonyms: []},
                {answer: "Superhero", points: 5, synonyms: []},
            ]
        }
    ];

    let currentRound = 0;
    let currentQuestionIndex = 0;
    let teamBoysPoints = 0;
    let teamGirlsPoints = 0;

    function loadQuestion() {
        let question = questions[currentRound * 2 + currentQuestionIndex];
        $('#question').text(question.question);
        for (let i = 1; i <= 6; i++) {
            $('#answer' + i).text('______');
            $('#points' + i).text('');
        }
    }

    function submitAnswer() {
        let userAnswer = $('#answer-input').val().toLowerCase();
        let question = questions[currentRound * 2 + currentQuestionIndex];

        for (let i = 0; i < question.answers.length; i++) {
            let possibleAnswers = [question.answers[i].answer.toLowerCase()].concat(question.answers[i].synonyms.map(s => s.toLowerCase()));

            if (possibleAnswers.includes(userAnswer)) {
                $('#answer' + (i + 1)).text(question.answers[i].answer);
                $('#points' + (i + 1)).text(question.answers[i].points);
                $('#answer-input').val('');  // Clear input field after submission
                return;  // Exit after a match is found
            }
        }

        $('#answer-input').val('');  // Clear input field after checking answers
    }

    // Event listener for submitting answer
    $('#submit-answer').click(submitAnswer);

    // Submit answer when "Enter" key is pressed
    $('#answer-input').keypress(function(event) {
        if (event.which === 13) {  // 13 is the key code for Enter
            event.preventDefault(); // Prevent form submission
            submitAnswer();  // Trigger the answer submission
        }
    });

    $('#end-round').click(function() {
        let winner = prompt("Who won the round? Type 'Boys' or 'Girls'");
        let roundPoints = 0;

        for (let i = 1; i <= 6; i++) {
            let points = parseInt($('#points' + i).text());
            if (!isNaN(points)) {
                roundPoints += points;
            }
        }

        if (winner && winner.toLowerCase() === 'boys') {
            teamBoysPoints += roundPoints;
            $('#team-boys-points').text(teamBoysPoints);
        } else if (winner && winner.toLowerCase() === 'girls') {
            teamGirlsPoints += roundPoints;
            $('#team-girls-points').text(teamGirlsPoints);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < 2) {
            loadQuestion();  // Load next question in the same round
        } else {
            currentRound++;  // Move to next round
            currentQuestionIndex = 0;  // Reset question index for the new round
            if (currentRound < questions.length / 
