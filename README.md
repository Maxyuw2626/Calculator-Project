# Premium Calculator

A modern, beautifully designed calculator web application — built as a portfolio-grade project with a focus on UI polish, smooth interactions, clean architecture, and accessibility.

Inspired by the design language of **Apple**, **Linear**, and **Vercel**.

![Calculator Preview](https://via.placeholder.com/800x500/0a0a0f/f59e0b?text=Calculator+Preview)

---

## Features

### Core Calculator
- Addition, subtraction, multiplication, division
- Decimal number support
- Percentage calculations
- Positive/negative toggle
- Continuous chained calculations
- Clear (AC) and delete (backspace)

### UI / UX
- Dark mode by default with a premium aesthetic
- Glassmorphism effect with backdrop blur
- Smooth entrance animation
- Button press ripple feedback
- Auto-resizing display for long numbers
- Comma-separated large number formatting
- Result pop animation on calculation

### Keyboard Support
| Key            | Action         |
| -------------- | -------------- |
| `0-9`          | Number input   |
| `.`            | Decimal point  |
| `+` `-` `*` `/`| Operations     |
| `Enter` / `=`  | Calculate      |
| `Backspace`    | Delete last    |
| `Escape`       | Clear all      |
| `%`            | Percent        |

### Accessibility
- ARIA labels on all interactive elements
- `aria-live` region for dynamic display updates
- Visible keyboard focus states via `:focus-visible`
- Semantic button elements with proper roles
- Reduced-motion support via `prefers-reduced-motion`

### Responsive Design
- Fluid layout adapting from 360px to desktop
- Touch-friendly button sizes
- Optimized for mobile, tablet, and desktop

---

## Technologies

- **HTML5** — Semantic markup with ARIA accessibility
- **CSS3** — Custom properties, grid layout, glassmorphism, keyframe animations, media queries
- **Vanilla JavaScript (ES6+)** — Class-based architecture, event delegation, keyboard handling
- **Google Fonts** — Inter typeface for clean, modern typography

No frameworks, no libraries — just the web platform.

---

## Folder Structure

```
premium-calculator/
├── index.html          # Main HTML document
├── style.css           # All styles (variables, layout, components, responsive)
├── script.js           # Calculator class (logic, display, events)
└── README.md           # Project documentation
```

---

## How to Run

Since this is a static web application, any HTTP server will work.

### Option 1 — Live Server (VS Code)

Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

### Option 2 — Python

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3 — Node.js

```bash
npx serve .
```

Then open the URL printed in the terminal.

### Option 4 — Just open the file

Double-click `index.html` to open it directly in your browser (note that some features like fonts may require an internet connection).

---

## Design Decisions

### Color Palette
- **Background:** Near-black (`#0a0a0f`) with subtle radial gradients to add depth
- **Calculator body:** Semi-transparent dark surface with blur for glassmorphism
- **Numbers:** Light text on subtle dark buttons
- **Operators:** Amber (`#f59e0b`) accents for visual hierarchy
- **Equals:** Filled amber button with a soft glow shadow

### Typography
- **Inter** — chosen for its clean, legible, and highly readable character at both small and large sizes
- Display uses a light weight (`300`) for a airy feel, while buttons use medium weight (`500`)

### Interactions
- Buttons scale down on press (`transform: scale(0.94)`) for tactile feedback
- A JavaScript-driven ripple class provides animation on both click and keyboard input
- The result display animates with a subtle pop when `=` is pressed
- Display font size adapts dynamically to fit the current number

---

## Future Improvements

- [ ] **History panel** — Show a scrollable list of past calculations
- [ ] **Scientific mode** — Add trigonometric, logarithmic, and power functions
- [ ] **Theme toggle** — Switch between dark and light modes
- [ ] **Memory functions** — MC, MR, M+, M-
- [ ] **Unit converter** — Length, weight, temperature alongside calculator
- [ ] **Local storage** — Persist last value or history on refresh
- [ ] **PWA support** — Service worker for offline use and installable on mobile
- [ ] **Sound effects** — Subtle audio feedback on button press
- [ ] **Customizable accent color** — Let users pick their own theme color

---

## License

MIT — free to use, modify, and distribute.

Built as a portfolio project.
