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
            multiplier: 1
        },
        {
            question: "Name a classic Halloween horror movie.",
            answers: [
                { answer: "Halloween", points: 50 },
                { answer: "Nightmare on Elm Street", points: 40 },
                { answer: "Friday the 13th", points: 30 },
                { answer: "The Exorcist", points: 20 },
                { answer: "Scream", points: 10 },
                { answer: "The Shining", points: 5 }
            ],
            multiplier: 1
        },
        {
            question: "Name a Halloween decoration you see everywhere.",
            answers: [
                { answer: "Pumpkins", points: 50 },
                { answer: "Skeletons", points: 40 },
                { answer: "Spiders/Webs", points: 30 },
                { answer: "Gravestones", points: 20 },
                { answer: "Ghosts", points: 10 },
                { answer: "Bats", points: 5 }
            ],
            multiplier: 2
        },
        {
            question: "Name a Halloween monster people dress up as.",
            answers: [
                { answer: "Vampire", points: 50 },
                { answer: "Witch", points: 40 },
                { answer: "Werewolf", points: 30 },
                { answer: "Frankenstein", points: 20 },
                { answer: "Zombie", points: 10 },
                { answer: "Mummy", points: 5 }
            ],
            multiplier: 2
        },
        {
            question: "Name a spooky sound you hear on Halloween.",
            answers: [
                { answer: "Screams", points: 50 },
                { answer: "Wolf howls", points: 40 },
                { answer: "Creaking doors", points: 30 },
                { answer: "Thunder", points: 20 },
                { answer: "Chains rattling", points: 10 },
                { answer: "Evil laughter", points: 5 }
            ],
            multiplier: 2
        },
        {
            question: "Name something people fear about Halloween night.",
            answers: [
                { answer: "Ghosts", points: 50 },
                { answer: "Darkness", points: 40 },
                { answer: "Witches", points: 30 },
                { answer: "Haunted houses", points: 20 },
                { answer: "Vandalism", points: 10 },
                { answer: "Getting pranked", points: 5 }
            ],
            multiplier: 3
        },
        {
            question: "Name a reason adults dislike trick-or-treating.",
            answers: [
                { answer: "Too many kids", points: 50 },
                { answer: "Too late at night", points: 40 },
                { answer: "Don't like candy", points: 30 },
                { answer: "Costumes are expensive", points: 20 },
                { answer: "Answering the door repeatedly", points: 10 },
                { answer: "Annoying parents", points: 5 }
            ],
            multiplier: 3
        },
        {
            question: "Name a classic horror movie villain.",
            answers: [
                { answer: "Freddy Krueger", points: 50 },
                { answer: "Michael Myers", points: 40 },
                { answer: "Jason Voorhees", points: 30 },
                { answer: "Chucky", points: 20 },
                { answer: "Ghostface", points: 10 },
                { answer: "Leatherface", points: 5 }
            ],
            multiplier: 3
        },
        {
            question: "Name a Halloween prank people play.",
            answers: [
                { answer: "Egging houses", points: 50 },
                { answer: "Toilet papering trees", points: 40 },
                { answer: "Ding-dong ditch", points: 30 },
                { answer: "Jump scares", points: 20 },
                { answer: "Fake spiders", points: 10 },
                { answer: "Switching candy with something gross", points: 5 }
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
        });

        if (!correctAnswer) {
            alert('Wrong answer! Try again.');
        }

        $('#user-answer').val('');
    }

    $('#submit-answer').click(submitAnswer);

    $('#next-round').click(function() {
        if (currentRound < rounds.length - 1) {
            currentRound++;
            updateRound();
        } else {
            alert('Fast Money Round Coming Soon!');
        }
    });

    // Initialize first round
    updateRound();
});
