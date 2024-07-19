import { convertEpoch } from "./util/helper-functions.js";
import { generateComments } from "./comments.js";
import { pageRender } from "./pageRender.js";

const savedSubList = document.getElementsByClassName('saved-sub-item').item


//FIX
for (let i = 0; i < savedSubList.length; i++) {
    savedSubList[i].addEventListener('click', async () => {
        async function loadRedditSub() {
            try {
                const response = await fetch(`https://www.reddit.com/r/${savedSubList[i].innerText}.json?limit=25`);
                const json = await response.json();
                return json.data.children;
            } catch {
                contentBox.style.color = 'red'
                contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
            }
        }

        const fetchedSub = await loadRedditSub();

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
    })
}