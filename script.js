class PageManager {
    constructor() {
        this.pages = {
            menu: { title: "Menu", content: "..." },
            about: { title: "About", content: "..." }
        };
    }

    addPage(name, page) {
        this.pages[name] = page;
    }

    loadPage(pageName) {
        // loading logic here
    }
}

const app = new PageManager();