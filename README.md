# The whole fig tree

A scroll-controlled digital field note for Diptyque Philosykos. The visitor travels through a painted Mediterranean fig grove; the final exported Magnific video is scrubbed directly by page scroll, forward or backward. Short chapter copy introduces the fruit, leaves and wood before the perfume reveal.

## Run locally

This is a static site with no build step. From the project folder, run:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Project plan

The concept, audience, visual direction, technical plan, chapter map and reference research are in [`docs/creative-brief.md`](docs/creative-brief.md).

## Scroll experience

- One 1920 × 1080 Magnific export (`public/media/philosykos-journey.mp4`) holds the continuous video journey.
- Scroll progress maps to video time. The same mapping works in reverse when scrolling upward.
- A poster remains behind the video during loading. The story keeps its chapter copy and still artwork if video playback is unavailable.
- With reduced motion enabled, the story uses four stills instead of scroll-scrubbing video. A visitor can choose to play the film.
- Chapter labels sit in HTML, outside the video.

## Media

The MP4 is the user-provided Magnific export `pikaso-untitled-project-2026-10-05.mp4`. Four user-generated oil-painting images are used for the opening, poster, still fallback and closing image. The export is kept as provided; the video editor project metadata reports a 1920 × 1080, 19.39-second composition.

## Research

The brief records five references: the required Scroll World skill plus four other interactive or scroll-led experiences. The site also uses Diptyque’s official Philosykos Eau de Parfum description for the product language and scent cues.

## Publish

Repository: not created yet.  
Live site: not published yet.

The local Git repository and GitHub Pages deployment workflow are ready. To publish, add a dedicated GitHub repository as the `origin` remote and push `main`; the workflow will deploy the static site to GitHub Pages. The current GitHub CLI login is invalid, so repository creation and publishing could not be completed from this workspace.
