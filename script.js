const links = document.querySelectorAll('nav a');
const contentDiv = document.getElementById('page-content');
const pageContent = document.getElementById("page-content");
const titleDiv = pageContent.querySelector(".window-title");

titleDiv.textContent = "Menu"; // change dynamically

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // stop full page reload
        const page = link.getAttribute('data-page');

        fetch(page)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('#page-content').innerHTML;

                contentDiv.innerHTML = newContent;

                // update browser history so back/forward works
                history.pushState({ page }, "", page);
            })
            .catch(err => {
                contentDiv.innerHTML = `<p style="color:red;">Error loading page: ${err.message}</p>`;
            });
    });
});

// Handle back/forward buttons
window.addEventListener('popstate', e => {
    if (e.state && e.state.page) {
        fetch(e.state.page)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                contentDiv.innerHTML = doc.querySelector('#page-content').innerHTML;
            });
    }
});
