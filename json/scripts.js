// let jsonhttprequest = new XMLHttpRequest();
// jsonhttprequest.onreadystatechange = () => {
//     if (jsonhttprequest.readyState == XMLHttpRequest.DONE) {
//         let responseAsJavascriptObject = JSON.parse(jsonhttprequest.response);
//         let data = responseAsJavascriptObject.data;
//         console.log(data);
//     }
// };
// jsonhttprequest.open('GET', 'data/test.json');
// jsonhttprequest.send();
//
// $.ajax({
//     url: 'http://www.publiccourses.com/courses/?lat=40.2338438&lng=-111.65853370000002&range=10&type=public',
//     type: 'GET',
//     success: (response, status) => {
//         console.log(response.data);
//     }
// });


let promise = new Promise((resolve, reject) => {
    $.ajax({
        url: 'https://www.publiccourses.com/courses/?lat=40.2338438&lng=-111.65853370000002&range=10&type=public/',
        type: 'GET',
        success: (response) => {
            resolve(response);
        },
        error: (response) => {
            reject(response);
        }
    })
});

promise.then((theResponse) => {
    console.log('.then', theResponse);
});

promise.catch((theError) => {
   console.log('.catch', theError.status + ' ' + theError.statusText);
});