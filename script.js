$(document).ready(function() {
    const rounds = [
        {
            question: "Name something adults do at Halloween parties.",
            answers: [
                { answer: "Drink alcohol", points: 40 },
                { answer: "Wear sexy costumes", points: 30 },
                { answer: "Dance", points: 20 },
                { answer: "Carve pumpkins", points: 10 },
                { answer: "Tell scary stories", points: 5 },
                { answer: "Play drinking games", points: 5 }
            ],
            multiplier: 1
        },
        {
            question: "Name a popular Halloween costume for women.",
            answers: [
                { answer: "Sexy witch", points: 50 },
                { answer: "Catwoman", points: 40 },
                { answer: "Vampire", points: 30 },
                { answer: "Nurse", points: 20 },
                { answer: "Cheerleader", points: 10 },
                { answer: "Zombie", points: 5 }
            ],
            multiplier: 2
        },
        {
            question: "Name a Halloween-themed drink.",
            answers: [
                { answer: "Bloody Mary", points: 50 },
                { answer: "Pumpkin spice cocktail", points: 40 },
                { answer: "Witches' brew", points: 30 },
                { answer: "Vampire's kiss", points: 20 },
                { answer: "Jello shots", points: 10 },
                { answer: "Spider venom shots", points: 5 }
            ],
            multiplier: 3
        }
    ];

    let currentRound = 0;
    let boysScore = 0;
    let girlsScore = 0;

    function updateRound() {
        $('#question').text(rounds[currentRound].question);
        $('#round-title').text('Round ' + (currentRound + 1));
        $('#multiplier').text('Points: ' + rounds[currentRound].multiplier + 'x');
        $('.answer-text').text('-');
        $('.points').text('');
        $('#user-answer').val('');
    }

    function submitAnswer() {
        const userAnswer = $('#user-answer').val().toLowerCase();
        let correctAnswer = false;

        $('.answer').each(function(index) {
            const answerText = rounds[currentRound].answers[index].answer.toLowerCase();
            if (userAnswer === answerText && $(this).find('.answer-text').text() === '-') {
                const points = rounds[currentRound].answers[index].points * rounds[currentRound].multiplier;
                $(this).find('.answer-text').text(rounds[currentRound].answers[index].answer);
                $(this).find('.points').text(points);
                
                // Alternate scoring between teams
                if (currentRound % 2 === 0) {
                    boysScore += points;
                    $('#boys-score').text(boysScore);
                } else {
                    girlsScore += points;
                    $('#girls-score').text(girlsScore);
                }

                correctAnswer = true;
            }
       
