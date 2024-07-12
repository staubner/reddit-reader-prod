import { convertEpoch } from "./src/util/helper-functions.js";
import { generateComments } from "./src/comments.js";
import { pageRender } from "./src/pageRender.js";
import { saveSubreddit, loadSubreddits } from "./src/util/helper-functions.js";

const contentBox = document.getElementById('content');

// manage local storage of saved subreddits
let subList = loadSubreddits();
renderSubs(subList);

// TODO: fix this render saved subreddits
function renderSubs(list) {
    list.forEach(() => {
        const savedSubs = document.getElementById('list-content')
        const sub = document.createElement('span')
        sub.setAttribute('class', 'saved-list-item')
        savedSubs.append(sub);
    })
}

renderSubs(subList);

// loading reddit/r/all on page load
console.log('Hi, this is a student project. Feel free to look around.')

async function fetchReddit () {
    try {
        const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
        const json = await response.json();
        return json.data.children;
    } catch {
        contentBox.style.color = 'red'
        contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
    };
}

const redditDataAll = await fetchReddit();

// handle r/all data
const rAll = redditDataAll.map(obj => obj.data);

const page = [];

rAll.forEach((obj) => {
    const post = pageRender(obj, convertEpoch, generateComments);
    page.push(post);
});

document.getElementById('all-button').style.backgroundColor = 'gray'

contentBox.innerText = '';

contentBox.append(...page);

// add event listener to subreddit names and add clicked sub names to local storage
const subredditList = document.getElementsByClassName('subreddit')
for (let i = 0; i < subredditList.length; i++) {
    subredditList[i].addEventListener('click', () => {
        const newSubName = subredditList[i].getAttribute('data-subname')
        if (subList.length > 9) window.alert("You can save a maximum of 10 subreddits")
        if (subList.indexOf(newSubName) === -1) {
            subList.push(newSubName);
            saveSubreddit(subList);
        } else {
            window.alert("You can't save duplicate subreddits")
        }
    })
}

//-----------------------------------------------------------

// r/all button
document.getElementById('all-button').addEventListener('click', async () => {

  const contentBox = document.getElementById('content');
  contentBox.innerHTML = '<br>Loading...'

  const redditAll = async () => {
      try {
          const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
          const json = await response.json();
          return json.data.children;
      } catch {
          contentBox.style.color = 'red'
          contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
      }
  };

  const redditDataAll = await redditAll();

  const rAll = redditDataAll.map(obj => obj.data);

  const page = [];

  rAll.forEach((obj) => {
      const post = pageRender(obj, convertEpoch, generateComments);
      page.push(post);
  });

  contentBox.innerText = '';

  document.getElementById('content-header').innerText = 'r/all';
  document.getElementById('all-button').style.backgroundColor = 'gray';
  document.getElementById('all-button').style.border = 'gray';
  document.getElementById('popular-button').style.backgroundColor = '';
  document.getElementById('popular-button').style.border = '';

  contentBox.append(...page);
});

//-----------------------------------------------------------

// r/popular button
document.getElementById('popular-button').addEventListener('click', async () => {

  const contentBox = document.getElementById('content');
  contentBox.innerHTML = '<br>Loading...'

  const redditPopular = async () => {
      try {
          const response = await fetch(`https://www.reddit.com/r/popular.json?limit=25`);
          const json = await response.json();
          return json.data.children;
      } catch {
          contentBox.style.color = 'red'
          contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
      }
  };

  const redditDataPopular = await redditPopular();

  const rPopular = redditDataPopular.map(obj => obj.data);

  const page = [];

  rPopular.forEach((obj) => {
      const post = pageRender(obj, convertEpoch, generateComments);
      page.push(post);
  });

  contentBox.innerText = '';

  document.getElementById('content-header').innerText = 'r/popular';
  document.getElementById('all-button').style.backgroundColor = '';
  document.getElementById('all-button').style.border = '';
  document.getElementById('popular-button').style.backgroundColor = 'gray';
  document.getElementById('popular-button').style.border = 'gray';

  contentBox.append(...page);
});

//-----------------------------------------------------------

// search form
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const contentBox = document.getElementById('content');
    contentBox.innerHTML = '<br>Loading...'

    //send search terms
    const getSearch = async () => {
        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${event.target[0].value}`);
            const json = await response.json();
            return json.data.children;
        } catch {
            contentBox.style.color = 'red'
            contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
        }
    }

    const searchResults = await getSearch();

    const searchData = searchResults.map(obj => obj.data);

    const page = [];

    searchData.forEach((obj) => {
        const post = pageRender(obj, convertEpoch, generateComments);
        page.push(post);
    })

    contentBox.innerText = '';

    document.getElementById('content-header').innerText = `Search Results for "${event.target[0].value}"`

    document.getElementById('search-text').value = '';

    document.getElementById('all-button').style.backgroundColor = '';
    document.getElementById('all-button').style.border = '';
    document.getElementById('popular-button').style.backgroundColor = '';
    document.getElementById('popular-button').style.border = '';

    contentBox.append(...page);
});