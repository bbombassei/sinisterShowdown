$(document).ready(function() {
    const rounds = [
        {
            question: "Name a popular Halloween costume.",
            answers: [
                { answer: "Witch", points: 10, variations: ["Sorceress"] },
                { answer: "Vampire", points: 20, variations: ["Dracula"] },
                { answer: "Ghost", points: 30, variations: ["Spirit"] },
                { answer: "Zombie", points: 40, variations: ["Undead"] },
                { answer: "Mummy", points: 50, variations: [] },
                { answer: "Pirate", points: 60, variations: [] },
            ],
            multiplier: 1,
        },
        {
            question: "What candy is most popular on Halloween?",
            answers: [
                { answer: "Chocolate", points: 10, variations: [] },
                { answer: "Candy Corn", points: 20, variations: [] },
                { answer: "Skittles", points: 30, variations: [] },
                { answer: "Snickers", points: 40, variations: [] },
                { answer: "M&M's", points: 50, variations: [] },
                { answer: "Reese's", points: 60, variations: [] },
            ],
            multiplier: 2,
        },
        {
            question: "Name a Halloween-themed movie.",
            answers: [
                { answer: "Halloween", points: 10, variations: ["Halloween II"] },
                { answer: "Hocus Pocus", points: 20, variations: [] },
                { answer: "Ghostbusters", points: 30, variations: [] },
                { answer: "The Exorcist", points: 40, variations: [] },
                { answer: "It", points: 50, variations: [] },
                { answer: "Scream", points: 60, variations: [] },
            ],
            multiplier: 3,
        },
        {
            question: "Name something you carve for Halloween.",
            answers: [
                { answer: "Pumpkin", points: 10, variations: [] },
                { answer: "Turnip", points: 20, variations: [] },
                { answer: "Gourd", points: 30, variations: [] },
                { answer: "Watermelon", points: 40, variations: [] },
                { answer: "Potato", points: 50, variations: [] },
                { answer: "Apple", points: 60, variations: [] },
            ],
            multiplier: 1,
        },
        {
            question: "What is a common Halloween decoration?",
            answers: [
                { answer: "Skeleton", points: 10, variations: [] },
                { answer: "Cobweb", points: 20, variations: [] },
                { answer: "Pumpkin", points: 30, variations: [] },
                { answer: "Bat", points: 40, variations: [] },
                { answer: "Ghost", points: 50, variations: [] },
                { answer: "Witch", points: 60, variations: [] },
            ],
            multiplier: 2,
        },
        {
            question: "What do you say when you knock on someone's door on Halloween?",
            answers: [
                { answer: "Trick or Treat", points: 10, variations: [] },
                { answer: "Boo!", points: 20, variations: [] },
                { answer: "Happy Halloween", points: 30, variations: [] },
                { answer: "Give me candy", points: 40, variations: [] },
                { answer: "Surprise!", points: 50, variations: [] },
                { answer: "Is anyone home?", points: 60, variations: [] },
            ],
            multiplier: 3,
        },
        {
            question: "Name a famous witch.",
            answers: [
                { answer: "Winnie Sanderson", points: 10, variations: [] },
                { answer: "Elphaba", points: 20, variations: [] },
                { answer: "Sabrina", points: 30, variations: [] },
                { answer: "Hermione", points: 40, variations: [] },
                { answer: "Glinda", points: 50, variations: [] },
                { answer: "Samantha", points: 60, variations: [] },
            ],
            multiplier: 1,
        },
        {
            question: "What is a common Halloween party game?",
            answers: [
                { answer: "Bob for Apples", points: 10, variations: [] },
                { answer: "Haunted House", points: 20, variations: [] },
                { answer: "Costume Contest", points: 30, variations: [] },
                { answer: "Pin the Hat on the Witch", points: 40, variations: [] },
                { answer: "Mummy Wrap", points: 50, variations: [] },
                { answer: "Pumpkin Bowling", points: 60, variations: [] },
            ],
            multiplier: 2,
        },
        {
            question: "What type of monster is Dracula?",
            answers: [
                { answer: "Vampire", points: 10, variations: [] },
                { answer: "Zombie", points: 20, variations: [] },
                { answer: "Werewolf", points: 30, variations: [] },
                { answer: "Ghost", points: 40, variations: [] },
                { answer: "Mummy", points: 50, variations: [] },
                { answer: "Frankenstein", points: 60, variations: [] },
            ],
            multiplier: 3,
        },
        {
            question: "Name something you might see in a haunted house.",
            answers: [
                { answer: "Ghost", points: 10, variations: [] },
                { answer: "Skeleton", points: 20, variations: [] },
                { answer: "Zombie", points: 30, variations: [] },
                { answer: "Spider", points: 40, variations: [] },
                { answer: "Cobweb", points: 50, variations: [] },
                { answer: "Pumpkin", points: 60, variations: [] },
            ],
            multiplier: 1,
        },
    ];

    let currentRound = 0;
    let boysScore = 0;
    let girlsScore = 0;
    let submittedAnswers = new Set(); // Store submitted answers
    let currentTeam = 'boys'; // Track current team

    // Function to randomly choose the starting team
    function randomizeStartingTeam() {
        const teams = ['boys', 'girls'];
        const randomIndex = Math.floor(Math.random() * teams.length);
        return teams[randomIndex];
    }

    // Start Game button handler
    $('#start-button').click(function() {
        // Randomly select starting team
        currentTeam = randomizeStartingTeam();
        $('#current-team').text('Current Turn: ' + (currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)));
        
        // Hide the start button and show the game content
        $('#start-game').hide();
        $('#game-content').show();

        // Initialize the first round
        updateRound();
    });

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
                if (currentTeam === 'boys') {
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

        // Check if the answer has already been submitted
        if (submittedAnswers.has(userAnswer)) {
            alert('This answer has already been submitted. Try a different answer.');
            $('#user-answer').val(''); // Clear the input field
            return; // Exit the function if the answer is a duplicate
        }

        // Mark the answer as submitted
        submittedAnswers.add(userAnswer);

        if (!checkAnswer(userAnswer)) {
            alert('Wrong answer! Try again.');
        }

        $('#user-answer').val(''); // Clear the input field after submission
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
        submittedAnswers.clear(); // Reset submitted answers for the new round

        // Switch turns
        currentTeam = currentRound % 2 === 0 ? 'boys' : 'girls';
        $('#current-team').text('Current Turn: ' + (currentTeam.charAt(0).toUpperCase() + currentTeam.slice(1)));
    }

    // Handle Enter key for submitting answers
    $(document).keydown(function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if wrapped in a form
            submitAnswer(); // Call the function to submit the answer
        }
    });

    // Hide game content initially
    $('#game-content').hide();
});
