window.addEventListener("load", solve);

function solve() {
    const previewList = document.getElementById('review-list');
    const publishedList = document.getElementById('published-list');

    const publishBtn = document.getElementById('publish-btn');

    const titleInput = document.getElementById('task-title');
    const categoryInput = document.getElementById('task-category');
    const contentInput = document.getElementById('task-content');

    publishBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const title = titleInput.value;
        const category = categoryInput.value;
        const content = contentInput.value;

        if (title == '' || category == '' || content == '') {
            return
        };

        clearInputs();

        const li = createElement(title, category, content);
        li.classList.add('rpost');

        previewList.appendChild(li);
    });

    function createElement(title, category, content) {

        const h4TitleElement = document.createElement('h4');
        h4TitleElement.textContent = title;

        const pCategoryElement = document.createElement('p');
        pCategoryElement.textContent = `Category: ${category}`;

        const pContentElement = document.createElement('p');
        pContentElement.textContent = `Content: ${content}`;

        const articleElement = document.createElement('article');

        articleElement.appendChild(h4TitleElement);
        articleElement.appendChild(pCategoryElement);
        articleElement.appendChild(pContentElement);

        const editBtn = document.createElement('button');
        editBtn.classList.add('action-btn');
        editBtn.classList.add('edit');
        editBtn.textContent = 'Edit'

        const postBtn = document.createElement('button');
        postBtn.classList.add('action-btn');
        postBtn.classList.add('post');
        postBtn.textContent = 'Post'

        const liElement = document.createElement('li');

        liElement.appendChild(articleElement);
        liElement.appendChild(editBtn);
        liElement.appendChild(postBtn);

        const liPublish = articleElement;

        editBtn.addEventListener('click', () => {

            titleInput.value = title;
            categoryInput.value = category;
            contentInput.value = content;


            liElement.remove();
        });

        postBtn.addEventListener('click', () => {

            liElement.remove();

            liPublish.remove(editBtn);
            liPublish.remove(postBtn);

            publishedList.appendChild(liPublish);
        });

        return liElement;
    }

    function clearInputs() {
        titleInput.value = '';
        categoryInput.value = '';
        contentInput.value = '';
    }
}