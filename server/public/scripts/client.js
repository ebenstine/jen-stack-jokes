console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');

    //put getJokes here
    getJokes();
    console.log('addJokeButton', $('#addJokeButton'));
    $('#addJokeButton').on('click', addJoke);
    
}

function addJoke() {
    console.log('inside addJoke');

    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    };
    console.log('newJoke is:', newJoke);

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke
    }).then((response)=> {
        console.log('POST /jokes', response);
        getJokes();

    })

}

function getJokes() {
    console.log('making a request');

    $.ajax({
        method: 'GET',
        url: '/jokes'
    }).then(function(response){
        console.log('GET /quotes response', response)
        let jokeList = $('#outputDiv')
        console.log('LOL here are the jokes:', jokeList);
        jokeList.empty();
        for (let joke of response) {
            console.log('joke is', joke);
            jokeList.append(`
            <li>
            ${joke.whoseJoke}
            ${joke.jokeQuestion}
            ${joke.punchLine}
            </li>
            `);
        }
    });
}
/*function clearInputs(){
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}*/
