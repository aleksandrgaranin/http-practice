const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul')


function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url); // 'https://jsonplaceholder.typicode.com/posts'
        xhr.responseType = 'json' // automaticly parsing JSON in to JavaScript Object
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error('something went wrong!'));
            }
            resolve(xhr.response)
        };

        xhr.onerror = function() {
            reject(new Error('Failed to send requests!'));
            console.log(xhr.response)
            console.log(xhr.status)
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
    try {
        const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/pos');    
        for (const post of responseData){
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            // postEl.querySelector('button').addEventListener('click', deletePost.bind(this, post.id))
            listElement.append(postEl)
        }  
    } catch (error) {
        alert(error.message);
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

// async function deletePost(id) {
//     sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${id}` )
// }



fetchButton.addEventListener('click', () => {
    fetchPosts()
})
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value
    const enteredContent = event.currentTarget.querySelector('#content').value

    cretePost(enteredTitle, enteredContent)
})

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id
        console.log("Clicked on button", postId)
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})