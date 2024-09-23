$(document).ready(function() {
    const rounds = [
        {
            question: "Name something adults do at Halloween parties.",
            answers: [
                { answer: "Drink alcohol", points: 40, variations: ["drinking", "booze", "party"] },
                { answer: "Wear sexy costumes", points: 30, variations: ["sexy outfit", "costumes"] },
                { answer: "Dance", points: 20, variations: ["dancing"] },
                { answer: "Carve pumpkins", points: 10, variations: ["pumpkin carving"] },
                { answer: "Tell scary stories", points: 5, variations: ["storytelling", "scary stories"] },
                { answer: "Play drinking games", points: 5, variations: ["drinking games"] }
            ],
            multiplier: 1
        },
        {
            question: "Name a popular Halloween costume for women.",
            answers: [
                { answer: "Sexy witch", points: 50, variations: ["witch", "sexy witch costume"] },
                { answer: "Catwoman", points: 40, variations: ["cat woman"] },
                { answer: "Vampire", points: 30, variations: ["vamp"] },
                { answer: "Nurse", points: 20, variations: ["sexy nurse"] },
                { answer: "Cheerleader", points: 10, variations: ["cheerleader costume"] },
                { answer: "Zombie", points: 5, variations: ["zombie costume"] }
            ],
            multiplier: 1
        },
        {
            question: "Name a classic Halloween horror movie.",
            answers: [
                { answer: "Halloween", points: 50, variations: [] },
                { answer: "Nightmare on Elm Street", points: 40, variations: ["nightmare on elm"] },
                { answer: "Friday the 13th", points: 30, variations: [] },
                { answer: "The Exorcist", points: 20, variations: [] },
                { answer: "Scream", points: 10, variations: [] },
                { answer: "The Shining", points: 5, variations: [] }
            ],
            multiplier: 1
        },
        {
            question: "Name a Halloween decoration you see everywhere.",
            answers: [
                { answer: "Pumpkins", points: 50, variations: [] },
                { answer: "Skeletons", points: 40, variations: [] },
                { answer: "Spiders/Webs", points: 30, variations: ["spider webs"] },
                { answer: "Gravestones", points: 20, variations: ["tombstones"] },
                { answer: "Ghosts", points: 10, variations: [] },
                { answer: "Bats", points: 5, variations: [] }
            ],
            multiplier: 2
        },
        {
            question: "Name a Halloween monster people dress up as.",
            answers: [
                { answer: "Vampire", points: 50, variations: [] },
                { answer: "Witch", points: 40, variations: [] },
                { answer: "Werewolf", points: 30, variations: [] },
                { answer: "Frankenstein", points: 20, variations: [] },
                { answer: "Zombie", points: 10, variations: [] },
                { answer: "Mummy", points: 5, variations: [] }
            ],
            multiplier: 2
        },
        {
            question: "Name a spooky sound you hear on Halloween.",
            answers: [
                { answer: "Screams", points: 50, variations: [] },
                { answer: "Wolf howls", points: 40, variations: ["wolf howl"] },
                { answer: "Creaking doors", points: 30, variations: [] },
                { answer: "Thunder", points: 20, variations: [] },
                { answer: "Chains rattling", points: 10, variations: [] },
                { answer: "Evil laughter", points: 5, variations: [] }
            ],
            multiplier: 2
        },
        {
            question: "Name something people fear about Halloween night.",
            answers: [
                { answer: "Ghosts", points: 50, variations: [] },
                { answer: "Darkness", points: 40, variations: [] },
                { answer: "Witches", points: 30, variations: [] },
                { answer: "Haunted houses", points: 20, variations: ["haunted house"] },
                { answer: "Vandalism", points: 10, variations: [] },
                { answer: "Getting pranked", points: 5, variations: [] }
            ],
            multiplier: 3
        },
        {
            question: "Name a reason adults dislike trick-or-treating.",
            answers: [
                { answer: "Too many kids", points: 50, variations: [] },
                { answer: "Too late at night", points: 40, variations: [] },
                { answer: "Don't like candy", points: 30, variations: [] },
                { answer: "Costumes are expensive", points: 20, variations: [] },
                { answer: "Answering the door repeatedly", points: 10, variations: [] },
                { answer: "Annoying parents", points: 5, variations: [] }
            ],
            multiplier: 3
        },
        {
            question: "Name a classic horror movie villain.",
            answers: [
                { answer: "Freddy Krueger", points: 50, variations: [] },
                { answer: "Michael Myers", points: 40, variations: [] },
                { answer: "Jason Voorhees", points: 30, variations: [] },
                { answer: "Chucky", points: 20, variations: [] },
                { answer: "Ghostface", points: 10, variations: [] },
                { answer: "Leatherface", points: 5, variations: [] }
            ],
            multiplier: 3
        },
        {
            question: "Name a Halloween prank people play.",
            answers: [
                { answer: "Egging houses", points: 50, variations: [] },
                { answer: "Toilet papering trees", points: 40, variations: [] },
                { answer: "Ding-dong ditch", points: 30, variations: [] },
                { answer: "Jump scares", points: 20, variations: [] },
                { answer: "Fake spiders", points: 10, variations: [] },
                { answer: "Switching candy with something gross", points: 5, variations: [] }
            ],
            multiplier: 3
        }
    ];

    let currentRound = 0;
    let boysScore = 0;
    let girlsScore = 0;

    function checkAnswer(userAnswer) {
        let correctAnswer = false;

        $('.answer').each(function(index) {
            const answerObj = rounds[currentRound].answers[index];
            const correctText = answerObj.answer.toLowerCase();
            const variations = answerObj.variations.map(v => v.toLowerCase());

            if (userAnswer === correctText || variations.includes(userAnswer)) {
                const points = answerObj.points * rounds[currentRound].multiplier;
                $(this).find('.answer-text').text(answerObj.answer);
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

        return correctAnswer;
    }

    function submitAnswer() {
        const userAnswer = $('#user-answer').val().toLowerCase();

        if (!checkAnswer(userAnswer)) {
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

    function updateRound() {
        $('#question').text(rounds[currentRound].question);
        $('#round-title').text('Round ' + (currentRound + 1));
        $('#multiplier').text('Points: ' + rounds[currentRound].multiplier + 'x');
        $('.answer-text').text('-');
        $('.points').text('');
        $('#user-answer').val('');
    }

    // Handle Enter key for submitting answers
    $(document).keydown(function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if wrapped in a form
            submitAnswer(); // Call the function to submit the answer
        }
    });

    // Initialize first round
    updateRound();
});
