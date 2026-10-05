# Creative brief — The whole fig tree

**Project:** A scroll world for Diptyque Philosykos Eau de Parfum  
**Audience:** Fragrance-curious visitors and people drawn to Mediterranean summer landscapes  
**Purpose:** Make the fragrance legible as a portrait of an entire fig tree rather than a single sweet fruit. The user travels from grove to leaf, fruit, bark and bottle.  
**Core message:** Philosykos holds the green freshness of fig leaves, the milky character of the fruit and the woody strength of the tree in one scent.

## Story map

| Beat | Visual moment | On-page copy | Scroll position |
| --- | --- | --- | --- |
| 01 · The grove | Sunlit path and wide fig grove | “A green world, held in light.” | Opening of the exported film |
| 02 · The fruit | Close fig and leaves | “A fig, still warm from the sun.” | First transition / fig passage |
| 03 · The tree | Branches, bark and descent | “Stay close to the bark.” | Middle connector; coconut remains a visual cue only |
| 04 · The scent | Perfume reveal | “The whole tree, held in a scent.” | Final transition and bottle reveal |

The word “coconut” is not presented as an official Eau de Parfum note. Diptyque describes Philosykos through the fig tree, its leaves, fruit and wood, and notes white cedar in the Eau de Parfum. The coconut in the supplied video is treated as a visual/sensory cue, not a product claim.

## Visual direction

- **Palette:** Deep olive-black, warm parchment, sunlit cream, muted leaf green and bark brown.
- **Light:** Late-summer Mediterranean sun, softly diffused through a dense canopy.
- **Materials:** Oil-painted foliage, dry limestone, deeply textured bark, glass and paper.
- **Typography:** High-contrast editorial serif for image-led headlines; restrained sans-serif for navigation and small labels.
- **Camera:** One forward journey through the grove, then a descent along the trunk toward the bottle. Scroll scrubs the supplied export in either direction.
- **Mood:** Quiet, botanical, tactile and slightly archival. The interface behaves like a small field journal rather than a conventional product grid.
- **Text treatment:** All copy is HTML layered over the video, never baked into footage.

## Technical plan

- **Stack:** Static HTML, CSS and vanilla JavaScript; no framework or build step.
- **Playback:** A single local MP4 is paused and sought to `duration × scrollProgress`. `requestAnimationFrame` coalesces scroll updates; chapter copy and progress follow the same normalized position. The browser’s native video seek handles backward movement.
- **Media loading:** Local MP4, `preload="auto"`, a compressed still poster behind the video, and a chapter image sequence for still-only contexts. Keep a poster visible until the video has decoded a frame; handle media errors by retaining the still page.
- **Connected-scene workflow:** The supplied final export is used as delivered. Browser media inspection confirms a 1920 × 1080 H.264 video stream, 30 fps and a 19.48-second duration. The film decodes in Chrome, and manual forward/backward scroll checks confirmed timeline seeking. Frame-by-frame join inspection remains a separate visual-quality check.
- **Target resolution:** 1920 × 1080 landscape master, shown with `object-fit: cover` in a responsive 16:9 stage. On phones, the same landscape film is art-directed inside a taller viewport; chapter copy moves low on the frame.
- **Reduced motion:** Show still illustrations for the chapter beats, do not seek video while scrolling, and offer a clearly labeled, user-initiated play button.
- **Accessibility:** Semantic sections, visible keyboard focus, skip link, descriptive video label, chapter buttons with accessible names, and no scroll hijacking.
- **Performance:** Keep the video as the only long-form motion asset. Stills are resized JPEG derivatives. Avoid competing autoplay media and sound.

## Reference study

Reviewed 5 October 2026. These references informed pacing, scene continuity and the balance between imagery and concise copy; this project uses its own painting, narrative and layout.

### Required reference: Scroll World skill

[oso95/scroll-world](https://github.com/oso95/scroll-world) describes a scroll-scrubbed continuous camera journey built from connected pre-rendered video clips, with scene planning, frame continuity, a portable scrub engine and mobile/reduced-motion considerations. Its process foregrounds frame-matched connectors. This project adapts the continuous journey and scroll-to-time mapping, but uses Magnific exports, one assembled video, an editorial fig-grove story and a static HTML implementation.

### Four other interactive or scroll-led experiences

1. **[The Boat — SBS](https://www.sbs.com.au/theboat/)** — Interactive graphic-novel storytelling. The [SBS learning resource](https://www.sbs.com.au/learn/resources/a-refugee-story-the-boat/) describes a journey through the story; the related production uses illustration, text and sound. Takeaway: let the reader set the pace and let text remain short enough to read while the image carries atmosphere.
2. **[AirPods Pro — Apple](https://www.apple.com/airpods-pro/)** — A long-form product story with staged feature moments and image-led sections. Takeaway: each chapter needs one clear message, and the ending should make the product’s role explicit.
3. **[Emons Logistics](https://www.emons.de/en)** — A reference named in the Scroll World README for continuous world-like product storytelling. The current site moves through service areas with large imagery and concise labels. Takeaway: use a journey to turn separate information into one connected place; this project applies that principle to a grove rather than logistics.
4. **[Firestorm: how we did it — The Guardian](https://www.theguardian.com/guardian-masterclasses/firestorm-john-henley-journalism-course)** — The Guardian’s account of its interactive bushfire story describes a blend of long-form writing, documentary video and interactive elements. Takeaway: vary media and pacing while keeping one narrative thread; here the video is the continuous thread and the notes provide brief pauses.

### Product language source

[Diptyque Philosykos Eau de Parfum](https://us.diptyqueparis.com/en-us/products/eau-de-parfum-philosykos-philop75cv1) describes the fragrance as an ode to the fig tree and calls out white cedar and the tree’s woody strength. Product copy in the site paraphrases that description.

## Generation and transition note

The Magnific video was treated as a finished user-authored export. The transition was iterated in Magnific: early attempts barely changed the scene or mismatched at the join; later attempts were adjusted for the descending camera, coconut rolling down the trunk and bottle reveal. The user approved the final stitched editor export for this site. The web implementation does not regenerate or alter its frames. The four page chapter positions are mapped onto the delivered timeline.

Browser review confirmed that the export decodes and that forward/backward scrolling changes the video time and chapter copy. Representative frames showed grove, valley, trunk and bottle beats; every frame at each clip join was not inspected, so a no-pop seam check remains incomplete. For a later media revision, compare each clip’s last frame with the next clip’s first frame before assembly; prompt text alone cannot guarantee a pixel-identical join.


## Magnific MCP notes

The connected Magnific MCP catalog was inspected on 5 October 2026 using `video_models_list`; this is a snapshot of the account-visible catalog, which may change. The final video is user-authored and kept unchanged.

- **Seedance 2.5** (`bytedance-seedance-pro-2.5`) supports 16:9, 1080p, 4–30 seconds, image start and end keyframes, image/video references, and prompt/camera-motion controls. The catalog labels it the top overall video recommendation. Image keyframes cannot be combined with its reference pool in the same request.
- **MiniMax H3 Max** (`minimax-video-3_0-max`) supports 480p/768p, 5–15 seconds, start/end keyframes, and up to 9 image references. Use it for draft staging; its listed output is below the 1080p project target.
- **Wan 3.0** (`wan-3-0`) lists 480p/720p/1080p, 2–30 seconds and start/end keyframes, but the current catalog marks it private/beta. Access may depend on account availability.
- The generation tool accepts model slugs, duration, aspect ratio, resolution, prompt, camera motion, references, and optional keyframes. The MCP session supplies account access; no credentials are stored in this repository. Generation responses expose credit usage, but exact per-model cost and this account’s balance were not recorded here. The student-facing brief warns that credits are shared, so no further generation was run during this audit.
