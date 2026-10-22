# Arman Sendag’s portfolio

Plain HTML, CSS, and JavaScript for GitHub Pages. No build step or dependencies.

## Preview locally

From this folder, run `python -m http.server 8000`, then open `http://localhost:8000`.

## Project screenshots

Projects has two independent slideshows: seven supplied Aura Bot screenshots and three Bababooey Arena screenshots. Previous/Next buttons, numbered controls, and left/right arrow keys change the visible image. Images are uncropped and open in a modal viewer with an X button, Escape support, and focus restored to the opening link. No autoplay. Without JavaScript, the first image and links to all screenshots remain available.

Assets live in `images/projects/`. Each slide has an accurate caption, alt text, and intrinsic image dimensions. Add new slides and matching numbered buttons in `projects/index.html`; the shared script determines each gallery’s slide count automatically.

## Project copy sources

Bababooey Arena’s technologies and features were checked against its [README](https://github.com/armansendag/Bababooey-Arena/blob/main/README.md), [package.json](https://github.com/armansendag/Bababooey-Arena/blob/main/package.json), [WebSocket handling](https://github.com/armansendag/Bababooey-Arena/blob/main/src/websocket.js), and [PostgreSQL store](https://github.com/armansendag/Bababooey-Arena/blob/main/src/store/postgresStore.js). The technical challenge describes the implemented reconnect and persistence behavior, without claiming performance results or a personal debugging anecdote.

## Photos

The homepage uses the existing square solo portrait without cropping. About uses `armanAndZion2.jpg` and `armanWithGroup.jpg`; filenames are case-sensitive on GitHub Pages. Both About images load eagerly so full-page reviews do not depend on scrolling to trigger lazy loading.
