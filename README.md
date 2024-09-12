# Chromastery

A tailwind color palette generator app with realtime site preview. [Live version](https://chromastery.vercel.app/) hosted on vercel.

## Main goals
- Let developers using tailwind
  - generate color palettes for tailwind sites
    - without having to know any color theory
    - quickly - under 5 minutes
    - using colors that work well together
  - preview how their project might look with different color palettes
  - export the color palette to their app as a tailwind config snippet

## What I learned while building this app
- I should have taken more time to think about the scope of the project, by trying to do too much I rewrote significant parts of the app before deciding on the current MVP.
  - Next time when building a MVP
    - Think about the target audience, main goals (keep it under 3 for the MVP) and only then think about the implementation. Don't try to do too many things in the MVP, try to solve the core problem for the core audience and then ship and iterate as quickly as possible.
- Creating custom color palettes that look good, work with different layouts and are accessible is a big task so you need to think about the trade-offs in letting users pick whatever colors they want (can result in a mess if they don't have good design skills) or limiting the options (the resulting color palette can lack creativity and uniqueness).
  - In the end, for the MVP, I went for the simplest option of only using tailwind colors which are handpicked by the tailwind design team. But in the next iteration, I could let users pick between different modes like easy (pre-made palettes based on different design systems), medium (creating a palette using tailwind default colors) and hard (creating your own palette using OKLCH colors).
- OKLCH colors seem to be the best way to work with colors on the web so far but creating your own OKLCH color picker can be pretty tricky because of how the 3 values work together.
- [Chroma.js](https://gka.github.io/chroma.js/) seems to be the best documented color manipulation JS library. 
- Creating a color scale from a base color can also be pretty tricky, an automated scale is unlikely to work with every color and can have some accessibility issues too.

## Roadmap
- Make the app responsive
- Add color contrast checks for accessibility
- Remove unused components from previous versions of the app
- Add some automated testing
- Add more common blocks for the site preview
- Add other template layouts for site preview (blog, dashboard, portfolio, etc)
- Save color palette state in the URL to create share links
- Add premade tailwind palettes based on popular design systems
- Figure out how to let users create their own color palettes from OKLCH colors
- Add non-tailwind export options
- Add support for dark mode and different theme exports



## Useful resources

### Learning resources

- https://darekkay.com/blog/accessible-color-palette/
- https://accessibility.psu.edu/color/colorvisiondetails/
- https://stripe.com/blog/accessible-color-systems
- https://www.naildrivin5.com/blog/2024/01/24/web-components-in-earnest.html
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
- https://kvyn.medium.com/introducing-the-new-colorbox-e0109c021729
- https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems
- https://design.lyft.com/re-approaching-color-9e604ba22c88
- https://developer.mozilla.org/en-US/docs/Glossary/Color_space
- OKLCH post: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- oklch palette generation https://publishing-project.rivendellweb.net/creating-an-oklch-generator-tool/
- dynamic tailwind colors with OKLCH: https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic

### inspiration

- HN thread: https://news.ycombinator.com/item?id=39227831&utm_source=wondercraft_ai
- tailwind color scale generator: https://www.tints.dev/purple/A855F7
- radix color pallette generator: https://www.radix-ui.com/colors
- simple random color pallette generator: https://adevade.github.io/color-scheme-generator/
- color tint editing tool: https://colorcolor.in/ (in svelte)
- tailwind color pallette generator: https://uicolors.app/create
- color space util library: http://awesome-colour.org/#javascript
- color palette generator with machine learning to generate colors for brands, websites and graphics https://huemint.com/
- site with list of color palettes: https://www.colourlovers.com/palettes
- chatGPT color palette generator: https://huehive.co/
- another palette generator with color space and a11y checks: https://medialab.github.io/iwanthue/
- a11y color pallette generator https://accessiblepalette.com/
- github’s HSL palette generator https://primer.style/prism/
- a11y color palette explorer based on the stripe system https://huetone.ardov.me/
- color palette generator from the base color: https://ghola.dev/about.html

### top pickers

- color palette generator based on easings: https://colorcolor.in/
- accessible color palette generator based on LCH https://accessiblepalette.com/
- tailwind color palette generator https://www.tints.dev/
- HSL based color palette scale generator https://primer.style/
- OKLCH color palette generator based on stripe https://huetone.ardov.me/
- Color palette generator based on primary color https://ghola.dev/
- preview color and fonts in a real site: https://www.realtimecolors.com/