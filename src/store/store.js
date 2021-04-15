import { homePageReducer } from "./homePageReducer";

export const store = {
    state: {
        feed: '',
        feeds: [],
        feedNameTextArea: '',
        feedUrlTextArea: '',
    },

    setSelectedFeed(feed) {
        this.state.feed = feed;
        this.subscriber(this.state);
    },

    subscribe(observer) {
        this.subscriber = observer;
    },

    dispatch(action) {
        this.state = homePageReducer(this.state, action);
        this.subscriber(this.state);
    }
}

