let favClose = document.querySelector('.jokes__span-top-fav');
let burger = document.querySelector('.burger-icon');
let likes = document.querySelectorAll('.fa-heart');
let favSection = document.querySelector('.jokes__favourite');
let categoriesChecks = document.querySelector('.jokes__radio-wrapper');
let categoriesButton = document.querySelector('.jokes__radio-categories');
let searchButton = document.querySelector('.jokes__radio-search');
let randomButton = document.querySelector('.jokes__radio-random');
let searchInput = document.querySelector('.jokes__input-search');
let getJokeButton = document.querySelector('.jokes__get-button');
let categoriesRadio = document.querySelectorAll('.jokes__inner-categories-radio');
let animalRadio = document.querySelector('.jokes__inner-categories-radio--animal');
let celebrityRadio = document.querySelector('.jokes__inner-categories-radio--celebrity');
let careerRadio = document.querySelector('.jokes__inner-categories-radio--career');
let devRadio = document.querySelector('.jokes__inner-categories-radio--dev');

let category;
let query;
let randomSearchJoke;
let jokesCopy = [];

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        renderFav(JSON.parse(localStorage.getItem(key)));
    }
    setLike(likes);

});

function setLike(likes) {
    likes.forEach(elem => {
        elem.addEventListener('click', () => {
            elem.classList.toggle('fas');
            let jokesCopyId;
            let closestElem = elem.closest('li');
            let closestElemId = closestElem.id.replace(/^id__/, '');
            debugger
            if (elem.classList.contains('fas')) {
                for (let i = 0; i < jokesCopy.length; i++) {
                    if (jokesCopy[i].id == closestElemId) {
                        renderFav(jokesCopy[i]);
                        console.log('Liked and moved to fav');
                        localStorage.setItem(jokesCopy[i].id, JSON.stringify(jokesCopy[i]))
                        break;
                    }
                }
            } else {
                if (closestElem.id == closestElemId) {
                    closestElem.remove();
                    try {
                        let heart = document.querySelector(`#id__${closestElem.id}`);
                        heart.querySelector('.fa-heart').classList.toggle('fas');
                    } catch (e) {
                        console.log(e)
                    }
                    console.log('after try/catch');

                } else {
                    document.querySelector(`#${closestElemId}`).remove();

                    closestElem.querySelector('.fa-heart').classList.remove('fas');
                }

            }

        });
    })
}


favClose.addEventListener('click', () => {
    favSection.classList.toggle('active');
    burger.classList.toggle('close-icon')
    console.log('Section closed');
});

function render(joke) {
    let updatedAtText = Date.parse(joke.updated_at);
    let today = Date.parse(new Date());
    let roundHours = Math.round((today - updatedAtText) / 3600000);
    console.log(roundHours);

    let textLi = document.createElement('li');
    let textList = document.querySelector('ul');
    textLi.className = "jokes__founded-joke";
    textLi.id = 'id__' + joke.id;
    textLi.innerHTML = `
     <div class="jokes__founded-joke-inner">
        <span class="jokes__found-item-icon--message">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="white" />
                <path
                    d="M27.2504 11H12.7496C11.2335 11 10 12.2333 10 13.7496V22.6238C10 24.1367 11.2281 25.368 12.7399 
                    25.3734V29.4004L18.5271 25.3734H27.2504C28.7665 25.3734 30 24.1399 30 22.6238V13.7496C30 12.2333 
                    28.7665 11 27.2504 11ZM28.8281 22.6238C28.8281 23.4937 28.1204 24.2015 27.2504 
                    24.2015H18.1594L13.9117 27.1573V24.2015H12.7496C11.8796 24.2015 11.1719 23.4937 
                    11.1719 22.6238V13.7496C11.1719 12.8795 11.8796 12.1719 12.7496 12.1719H27.2504C28.1204 
                    12.1719 28.8281 12.8795 28.8281 13.7496V22.6238Z"
                    fill="#ABABAB" />
                <path d="M15.3529 15.1407H24.6471V16.3126H15.3529V15.1407Z" fill="#ABABAB" />
                <path d="M15.3529 17.6407H24.6471V18.8126H15.3529V17.6407Z" fill="#ABABAB" />
                <path d="M15.3529 20.1407H24.6471V21.3126H15.3529V20.1407Z" fill="#ABABAB" />
            </svg>
        </span>
        <span class="jokes__like">
            <i class="far fa-heart"></i>

        </span>
        <div class="jokes__id-wrapper">
            <span class="jokes__id">ID: <a class="jokes__id-number"
                    href="#">${joke.id}  <i class="fas fa-external-link-alt"></i></a>
            </span>
        </div>
        <div class="jokes__text-wrapper">
        <span class="jokes__text jokes__text--tablet-width jokes__text--mobile-width">${joke.value}
        </span>
        </div>
        <div class="jokes__bottom-wrapper jokes__bottom-wrapper--tablet-width">
            <span class="jokes__time">Last update: <strong>${roundHours} hours ago</strong></span>
            ${joke.categories[0] ? '<div class="jokes__founded-category"><span>' + joke.categories[0] + '</span></div>' : ''}
        </div>
    </div>
    `;
    textList.prepend(textLi);
    const like = textList.querySelector('.fa-heart');
    setLike([like]);
}

function renderFav(joke) {
    let updatedAtText = Date.parse(joke.updated_at);
    let today = Date.parse(new Date());
    let roundHours = Math.round((today - updatedAtText) / 3600000);
    console.log(roundHours);

    let textLi = document.createElement('li');
    textLi.className = "jokes__favourite-list-item";
    let textList = document.querySelector('.jokes__favourite-list');
    textLi.id = joke.id;
    textLi.innerHTML = ` <div class="jokes__fav-joke-inner">
                    <span class="jokes__fav-item-icon--message">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#F8F8F8"/>
                            <path d="M27.2504 11H12.7496C11.2335 11 10 12.2333 10 13.7496V22.6238C10 24.1367 11.2281 25.368 12.7399 25.3734V29.4004L18.5271 25.3734H27.2504C28.7665 25.3734 30 24.1399 30 22.6238V13.7496C30 12.2333 28.7665 11 27.2504 11ZM28.8281 22.6238C28.8281 23.4937 28.1204 24.2015 27.2504 24.2015H18.1594L13.9117 27.1573V24.2015H12.7496C11.8796 24.2015 11.1719 23.4937 11.1719 22.6238V13.7496C11.1719 12.8795 11.8796 12.1719 12.7496 12.1719H27.2504C28.1204 12.1719 28.8281 12.8795 28.8281 13.7496V22.6238Z" fill="#ABABAB"/>
                            <path d="M15.3529 15.1407H24.6471V16.3126H15.3529V15.1407Z" fill="#ABABAB"/>
                            <path d="M15.3529 17.6407H24.6471V18.8126H15.3529V17.6407Z" fill="#ABABAB"/>
                            <path d="M15.3529 20.1407H24.6471V21.3126H15.3529V20.1407Z" fill="#ABABAB"/>
                            </svg>

                    </span>
                    <span class="jokes__like--fav jokes__like--tablet">
                        <i class="fas fa-heart"></i>
                    </span>
                    <div class="jokes__id-wrapper">
                  <span class="jokes__id">ID: <a class="jokes__id-number"
                                                 href="#">${joke.id}  <i class="fas fa-external-link-alt"></i></a>
                        </span>

                    </div>
                    <span class="jokes__text jokes__fav-text">${joke.value}
                    </span>
                    <div class="jokes__bottom-wrapper">
                        <span class="jokes__time">Last update: <strong>${roundHours} hours ago</strong></span>
                    </div>
                </div>
    `;
    textList.prepend(textLi);
    const like = textList.querySelector('.fa-heart');
    setLike([like]);

}



randomButton.addEventListener('change', () => {
    let target = event.target;
    searchInput.classList.remove('active');
    categoriesChecks.classList.remove('active');
    target.setAttribute('checked', true);
    searchButton.removeAttribute('checked');
    categoriesButton.removeAttribute('checked');

});


categoriesButton.addEventListener('change', () => {
    let target = event.target;
    categoriesChecks.classList.add('active');
    searchInput.classList.remove('active');
    target.setAttribute('checked', true);
    randomButton.removeAttribute('checked');
    searchButton.removeAttribute('checked');


    console.log('Active categories');
});

animalRadio.addEventListener('change', () => {
    animalRadio.setAttribute('checked', true);
    celebrityRadio.removeAttribute('checked');
    careerRadio.removeAttribute('checked');
    devRadio.removeAttribute('checked');
    console.log('Active categories');
});

celebrityRadio.addEventListener('change', () => {
    celebrityRadio.setAttribute('checked', true);
    animalRadio.removeAttribute('checked');
    careerRadio.removeAttribute('checked');
    devRadio.removeAttribute('checked');


    console.log('Active categories');
})

careerRadio.addEventListener('change', () => {
    careerRadio.setAttribute('checked', true);
    animalRadio.removeAttribute('checked');
    celebrityRadio.removeAttribute('checked');
    devRadio.removeAttribute('checked');
    console.log('Active categories');
})

devRadio.addEventListener('change', () => {
    devRadio.setAttribute('checked', true);
    animalRadio.removeAttribute('checked');
    celebrityRadio.removeAttribute('checked');
    careerRadio.removeAttribute('checked');

    console.log('Active categories');
})


searchButton.addEventListener('change', () => {
    searchInput.classList.add('active');
    categoriesChecks.classList.remove('active');
    searchButton.setAttribute('checked', true);
    randomButton.removeAttribute('checked');
    categoriesButton.removeAttribute('checked');
    console.log('Active search');
});

getJokeButton.addEventListener('click', qualifiedName => {

    console.log("checked");


    if (randomButton.hasAttribute('checked')) {
        getRandomJoke();
    }
    if (categoriesButton.hasAttribute('checked')) {
        getCategoryJoke();
    }
    if (searchButton.hasAttribute('checked')) {
        getSearchJoke();
    }
})

async function getRandomJoke() {
    let response = await fetch('https://api.chucknorris.io/jokes/random/');
    let joke = await response.json();
    jokesCopy.push(joke);
    console.log('Random joke : ', joke);
    console.log('Copy joke : ', jokesCopy);
    render(joke);
    return joke;

}

async function getCategoryJoke() {
    categoriesRadio.forEach(elem => {

        if (elem.hasAttribute('checked')) {
            category = elem.id;
        }
    });
    let response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
    let joke = await response.json();
    jokesCopy.push(joke);
    console.log('Category joke : ', joke);
    console.log('Copy joke : ', jokesCopy);
    render(joke);
    return joke;
}

async function getSearchJoke() {
    query = searchInput.value;
    // console.log(query);
    let response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
    let joke = await response.json();
    let randomNum = Math.floor(Math.random() * 6);
    randomSearchJoke = joke.result[randomNum];
    jokesCopy.push(randomSearchJoke);
    console.log('Search joke: ', randomSearchJoke);
    console.log('Copy joke : ', jokesCopy);
    render(randomSearchJoke);
    return randomSearchJoke;

}