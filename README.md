<div align="center">

<img src="assets/sew-logo.png" alt="Surya Engineering Works logo" width="160">

# Surya Engineering Works

**Website for an ISO 9001:2015 precision machining company in Viralimalai, Tamil Nadu, India.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No dependencies](https://img.shields.io/badge/dependencies-none-1f5fae)

</div>

---

## About the project

Surya Engineering Works machines valve bodies, housings, shafts and heavy rotating parts up to 3.6 m in diameter for valve, power, foundry and heavy-equipment manufacturers. This site presents the company to buyers in India, Canada and abroad: what they machine, the machines they run, how they inspect, and how to request a quote.

It is a hand-written static site with no frameworks, no build step and no server, so it can be hosted for free on GitHub Pages and edited by anyone who knows basic HTML.

## Features

- **Five pages**: Home, About, Capabilities, Machines and Contact, plus a custom 404 page
- **Responsive layout** that works from phones up to wide desktop screens
- **Client logo wall** ("Our happy clients") and a **why choose us** section
- **Highlights for Canadian and international buyers**
- **Machining capacity chart** drawn to scale, and full machine and inspection-instrument spec tables
- **Photo gallery** with a keyboard-accessible lightbox
- **Live "Open now / Closed now" badge** calculated in India Standard Time from the business hours
- **Quote request form** with validation that prepares a ready-to-send email
- **Embedded maps** for both manufacturing units
- **Accessibility basics**: semantic HTML, skip link, visible focus states, alt text and reduced-motion support
- **SEO basics**: page titles, meta descriptions, Open Graph tags and `robots.txt`

## Built with

| | |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | Plain CSS with custom properties (no framework) |
| Scripts | Vanilla JavaScript, under 200 lines |
| Fonts | Montserrat and Lato from Google Fonts |
| Hosting | GitHub Pages |

## Project structure

```
surya-engineering-works/
├── index.html            Home
├── about.html            Company, people, facilities, certification
├── capabilities.html     Industries, component families, capacity chart, gallery
├── machines.html         Machine and inspection-instrument specifications
├── contact.html          Phone, email, hours, quote form, maps
├── 404.html              Page-not-found
├── css/
│   └── style.css         All styles; colours and fonts are defined at the top
├── js/
│   └── main.js           Menu, lightbox, open/closed badge, quote form
├── assets/
│   ├── sew-logo.png
│   ├── favicon.png
│   ├── img/              Product and machine photos
│   └── clients/          Client logos
└── robots.txt
```

## Run it locally

No installation needed. Open `index.html` in a browser, or start a small local server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Editing the content

| To change | Edit |
| --- | --- |
| Phone, email, hours or addresses | The footer of each `.html` file and `contact.html` (find and replace across files) |
| Email and hours used by the form and the open/closed badge | The settings at the top of `js/main.js` |
| Colours and fonts | The variables at the top of `css/style.css` |
| A photo | Replace the file in `assets/img/` with a new one of the same name |

## Quote form

Because the site has no server, the form opens the visitor's email app with their details filled in, ready to send with a drawing attached. To send enquiries directly from the page instead, connect a form service such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com): set the form's `action` to the URL they provide and remove the form handler in `js/main.js`.

## Deployment

The site is deployed with GitHub Pages:

1. **Settings → Pages → Build and deployment**
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Save. The site is published at `https://carlprischus.github.io/surya-engineering-works/`

A custom domain can be added on the same settings page once one is registered.

## Credits

Designed and developed by [Carl](https://github.com/Carlprischus) for Surya Engineering Works.
Company content, photographs and logos are provided by Surya Engineering Works. Client logos belong to their respective companies.

## License

© 2026 Surya Engineering Works. All rights reserved. See [LICENSE](LICENSE).
