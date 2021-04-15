import axios from "axios";
import _ from 'lodash';

export const rssParser = (data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const rss = xml.querySelector('rss');
    if (!rss) {
        throw new Error('notContain');
    }
    const feedTitleElement = rss.querySelector('channel > title');
    const feedDescriptionElement = rss.querySelector('channel > description');
    const feed = {
        title: feedTitleElement.textContent,
        description: feedDescriptionElement.textContent,
    };
    const items = rss.querySelectorAll('item');
    const posts = Array.from(items).map((item) => ({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
        id: _.uniqueId(),
    }));
    return { feed, posts };
};
const proxy = 'https://api.allorigins.win/get?url=';

export const getRss = async (url) => {
   const response = await axios.get(`${proxy}${url}`).then((r) => {
        const parsedRss = rssParser(r.data.contents);
        debugger;
        return parsedRss;
    });
    debugger;
    return response;
}
