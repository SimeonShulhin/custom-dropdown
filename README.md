# Custom Dropdown

Small React app demonstrating a flexible custom dropdown component.

## Quick start

Install deps and start development server:

```sh
npm install
npm start
```

The app entry is `src/index.js` and the demo page is rendered from `src/components/DropDownDemo.jsx`.

## Project structure

```
.
├─ [`package.json`](package.json )
├─ public/
│  └─ [`public/index.html`](public/index.html )
└─ src/
	├─ [`src/index.js`](src/index.js )              # app entry (imports compiled Tailwind css: src/output.css)
	├─ [`src/output.css`](src/output.css )            # compiled Tailwind CSS shipped with the project
	├─ [`src/index.css`](src/index.css )             # original Tailwind import (not used at runtime here)
	├─ [`src/App.js`](src/App.js )
	├─ components/
	│  ├─ [`src/components/CustomDropdown.jsx`](src/components/CustomDropdown.jsx )   # main reusable component ([`CustomDropdown`](src/components/CustomDropdown.jsx ))
	│  ├─ [`src/components/DropDownDemo.jsx`](src/components/DropDownDemo.jsx )     # demo page that uses [`CustomDropdown`](src/components/CustomDropdown.jsx )
	│  └─ [`src/components/DropdownRenderers.js`](src/components/DropdownRenderers.js )  # option render helpers
	├─ utils/
	│  └─ [`src/utils/dropdownUtils.js`](src/utils/dropdownUtils.js )     # helper functions ([`dropdownUtils`](src/utils/dropDownUtils.js ))
	└─ data/
		└─ [`src/data/mockData.js`](src/data/mockData.js )         # sample options, users, countries
```

Key files and symbols
- Component: [`CustomDropdown`](src/components/CustomDropdown.jsx) — dropdown implementation and keyboard/accessibility handling.
- Demo: [src/components/DropDownDemo.jsx](src/components/DropDownDemo.jsx) — showcases variants (async search, custom renderers, multiple dropdowns).
- Utils: [`dropdownUtils`](src/utils/dropdownUtils.js) — value/label helpers and search helpers.
- CSS: [src/output.css](src/output.css) — compiled Tailwind output used by the app (imported in [src/index.js](src/index.js)). If you change Tailwind sources, regenerate this file or switch your build to use a PostCSS/Tailwind pipeline.

## Notes

- This repo ships with a precompiled Tailwind file at [src/output.css](src/output.css). If you prefer to build Tailwind locally, replace the import in [src/index.js](src/index.js) with [src/index.css](src/index.css) and configure PostCSS/Tailwind accordingly.
- Run the tests with `npm test` (see [src/App.test.js](src/App.test.js)).
- For styling helpers and example renderers see [src/components/DropdownRenderers.js](src/components/DropdownRenderers.js).

