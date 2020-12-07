const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');


function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url); // 'https://jsonplaceholder.typicode.com/posts'
        xhr.responseType = 'json' // automaticly parsing JSON in to JavaScript Object
        xhr.onload = function () {
            resolve(xhr.response)
        };
        xhr.send(JSON.stringify(data));
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

async function cretePost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}



// cretePost('Dummy', 'Dummy Data');

fetchButton.addEventListener('click', fetchPosts)
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value
    const enteredContent = event.currentTarget.querySelector('#content').value

    cretePost(enteredTitle, enteredContent)
})
