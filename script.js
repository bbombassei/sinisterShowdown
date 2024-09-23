$(document).ready(function() {
    const answers = [
        { answer: "Banana", points: 40 },
        { answer: "Orange", points: 30 },
        { answer: "Apple", points: 20 },
        { answer: "Grapefruit", points: 10 }
    ];

    let score = 0;

    $('#submit-answer').click(function() {
        const userAnswer = $('#user-answer').val().toLowerCase();
        let correctAnswer = false;

        $('.answer').each(function(index) {
            const answerText = answers[index].answer.toLowerCase();
            if (userAnswer === answerText && $(this).find('.answer-text').text() === '-') {
                $(this).find('.answer-text').text(answers[index].answer);
                $(this).find('.points').text(answers[index].points);
                score += answers[index].points;
                $('#score').text(score);
                correctAnswer = true;
            }
        });

        if (!correctAnswer) {
            alert('Wrong answer! Try again.');
        }

        $('#user-answer').val('');
    });
});
