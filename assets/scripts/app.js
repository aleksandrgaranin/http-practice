const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url); // 'https://jsonplaceholder.typicode.com/posts'
        xhr.responseType = 'json' // automaticly parsing JSON in to JavaScript Object
        xhr.onload = function () {
            resolve(xhr.response)
        };
        xhr.send();
    });
    return promise;    
}

// function fetchPosts() {
//     sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//         .then(responseData => {
//             console.log(responseData)
//             const listOfPosts = responseData
//             for (const post of listOfPosts){
//                 const postEl = document.importNode(postTemplate.content, true);
//                 postEl.querySelector('h2').textContent = post.title.toUpperCase();
//                 postEl.querySelector('p').textContent = post.body;
//                 listElement.append(postEl)
//             }
//         }
//     )
// }

// OR

async function fetchPosts() {
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');    
    for (const post of responseData){
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl)
    }           
}

fetchPosts()