// calculates post time
export const convertEpoch = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
};

// saves a subreddit to local storage
export function saveSubreddit(subList) {
    localStorage.setItem('subList', JSON.stringify(subList));
}

// loads subreddit list from local storage
export function loadSubreddits() {
    const list = localStorage.getItem('subList')
    if (list == null) return [];
    return JSON.parse(list);
}