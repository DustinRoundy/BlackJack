let deckId;
let user = [];
let house = [];
let playerScore = 0;
let houseScore = 0;
function setup(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == XMLHttpRequest.DONE){
            let response = JSON.parse(httpRequest.response);
            if (response.success){
                deckId = response.deck_id;
                console.log(deckId);
            }
            getCards(user, 2);
            getCards(house, 2);
        }
    };
    httpRequest.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    httpRequest.send();
}





function getCards(usrtype, count){
    let cardHttpRequest = new XMLHttpRequest();
    cardHttpRequest.onreadystatechange = () => {
        if (cardHttpRequest.readyState == XMLHttpRequest.DONE){
            console.log("message");
            let response = JSON.parse(cardHttpRequest.response);
            console.log(response);
            if (response.success){
                //display to html
                for (let i = 0; i < response.cards.length; i++){
                    usrtype.push(response.cards[i]);
                    if (usrtype == user) {
                        console.log("display the users cards!");
                        $('.player').append(`<img src="${response.cards[i].image}" />`);
                        if (response.cards[i].value === "KING" || response.cards[i].value === "QUEEN" || response.cards[i].value === "JACK"){
                            console.log("this card is a King, queen or jack")
                            playerScore = playerScore + 10;
                            $('#playerScore').html(playerScore);
                        }
                        else if (response.cards[i].value === "ACE"){
                            console.log("Ace");
                        }
                        else{
                            playerScore = playerScore + Number(response.cards[i].value);
                            $('#playerScore').html(playerScore);
                        }
                        if (playerScore > 21){
                            $('#hit').attr('disabled', true);
                            alert("House wins!")
                        }
                    }
                }



            }
            console.log(deckId);
        }
    };

    cardHttpRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    cardHttpRequest.send();
}

function stay(){
    $('#hit').attr('disabled', true);
    $('#stay').attr('disabled', true);
    $('#house').html('');
    for (let i = 0; i < house.length; i++){
        $('#house').append(`<img src="${house[0].image}"/>`);
        if (house[i].value === "KING" || house[i].value === "QUEEN" || house[i].value === "JACK"){
            console.log("this card is a King, queen or jack");
            houseScore = houseScore + 10;
            $('#houseScore').html(houseScore);
        }
        else if (house[i].value === "ACE"){
            console.log("Ace");
        }
        else{
            houseScore = houseScore + Number(house[i].value);
            $('#houseScore').html(houseScore);
        }
    }

    if (houseScore > playerScore && houseScore <= 21){
        alert("House Wins!")
    }
    if (houseScore < playerScore){
        if (houseScore < 16){
            getCards(house, 1);
            stay();
        }
        else{
            alert("Player Wins!")
        }
    }

}
setup();
// function getDeck() {
//     return new Promise((reject, resolve) => {
//         $.ajax({
//             url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
//             type: 'GET',
//             success: (response) => {
//                 resolve(response);
//             },
//             error: (response) => {
//                 reject(response);
//             }
//         })
//     });
// }
//
// function getCards(deckId, cardAmount) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardAmount}`,
//             type: 'GET',
//             success: (response) => {
//                 resolve(response);
//             },
//             error: (error) => {
//                 reject(error);
//             }
//         })
//     })
// }
//
// function hit(){
//     deckPromise.then((data) => {
//         getCards(data.deckId, 1).then((cardData => {
//             //append card to player hand
//
//         }))
//     })
// }
//
// let deckPromise = getDeck();
// deckPromise.then((data) => {
//     getCards(data.deck_id, 2).then((cardData) => {
//         for (let i = 0; i < cardData.cards.length; i++){
//
//         }
//     });
// });