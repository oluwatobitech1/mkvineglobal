# MKVine: Page Background Images, Step by Step

Every page can have its own background picture behind its top banner (the hero). The closing "Have an Idea? Let's Build Something Meaningful." band at the bottom of many pages can have one too.

## How it works

- Put the picture in **`public/backgrounds/`** and name it exactly as shown below. **No code change is needed.**
- If a file is missing, that page keeps its plain dark background, so you can add them one at a time.
- A dark layer is added over every picture by the site so the white and blue text stays readable.
- Allowed formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. (JPG or WebP is best: smaller and faster.)
- File names: lowercase, no spaces, no capitals. Example: `about.jpg`, `start-project.webp`.

## Image size and style

- **Size:** 2400 x 1200 px is ideal (minimum 1920 x 1080). Wide landscape. The picture is cropped to fit, so keep the important part in the centre.
- **File weight:** under 400 KB each (use squoosh.app or tinypng.com to shrink). Big files slow the page.
- **Style:** darker, calm, low-detail pictures work best. Avoid very bright or busy pictures with lots of small text.

## The files

| File name (put in `public/backgrounds/`) | Page it appears on | Suggested theme |
| --- | --- | --- |
| `home.jpg` | Home page, top banner | Bold brand/tech mix: abstract gradient, creative workspace, or flowing blue and gold shapes |
| `about.jpg` | About page, top banner | Creative studio at work: desk, sketches, laptop, team collaborating |
| `services.jpg` | Services page and each service page | Design tools and devices: laptop, phone, colour swatches |
| `work.jpg` | Our Work page | Portfolio feel: mockups on a desk, brand boards |
| `pricing.jpg` | Pricing page | Clean and simple: abstract geometric shapes, calm gradient |
| `team.jpg` | Our Team page | Team workspace or abstract people/connection pattern |
| `insights.jpg` | Insights page and each article | Writing and ideas: notebook, light bulb concept, books |
| `contact.jpg` | Contact page | Communication: city skyline, phone and email, handshake |
| `faq.jpg` | FAQ page | Soft abstract question/help feel, minimal pattern |
| `reviews.jpg` | Client Reviews page | Warm, friendly: happy clients, stars, abstract glow |
| `start-project.jpg` | Start a Project page | Blueprint or launch feel: sketch to screen, rocket-style abstract |
| `legal.jpg` | Privacy, Terms and other legal pages | Very plain and dark: subtle texture or gradient |
| `cta.jpg` | The closing "Have an Idea?" band at the bottom of pages | Inspiring: light trails, horizon, abstract blue and gold |

That is 13 pictures. Start with `home`, `about`, `services`, `work` and `contact`, then add the rest.

## Upload step by step

1. **Pick or create the picture** with the theme above. Use your own designs or free, licence-safe photos (Unsplash, Pexels). Check the licence allows commercial use.
2. **Resize** it to 2400 x 1200 px and compress it to under 400 KB.
3. **Rename** it exactly as in the table (for example `about.jpg`).
4. **Add it to the project.** In VS Code open the `public` folder, then the `backgrounds` folder, and drag the file in.
5. **Preview.** Run `npm run dev` and open http://localhost:3000. Check the page. Restart `npm run dev` if a new picture does not show.
6. **Build.** Run `npm run build:static`. This creates the `out` folder with your pictures inside.
7. **Upload `out`** to your hosting as described in `docs/DEPLOYMENT.md` (Hostinger: everything inside `out` goes into `public_html`).
8. **Test the live site.** Open each page, on phone and computer, and make sure the text is easy to read. If a picture is too bright, choose a darker one.

## Make the picture stronger or softer

Open `src/app/globals.css` and find `.bg-photo::after` at the bottom. The numbers `0.74` and `0.84` control how dark the layer is. Lower them (for example `0.55` and `0.7`) to show more of the picture. Raise them (for example `0.85` and `0.92`) for better text readability.

## Add a background to another page or section later

1. Add the new name to `backgroundNames` in `src/lib/backgrounds.ts`.
2. For a page banner, give the banner the name: `<PageHero bg="your-name" ... />`.
3. For any other section, make the section `relative overflow-hidden`, put `<Backdrop name="your-name" />` as its first child, and add `relative` to the content after it.
4. Save the picture as `public/backgrounds/your-name.jpg`.
