// calculates post time
export const convertEpoch = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
};

// saves a subreddit to local storage
// export function saveSubreddit(sub) {
//     if (localStorage.getItem('subList') == null) {
//         localStorage.setItem('subList', JSON.stringify(sub))
//     } else {
        
//     }    
// }