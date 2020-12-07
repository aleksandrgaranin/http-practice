const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const xhr = new XMLHttpRequest();


xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

xhr.responseType = 'json' // automaticly parsing JSON in to JavaScript Object

xhr.onload = function () {
    // console.log(xhr.response)
    // const listOfPosts = JSON.parse(xhr.response) // transform JSON in to JavaScript Object
    const listOfPosts = xhr.response
    console.log(listOfPosts)

    for (const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl)
    }
};

xhr.send()



