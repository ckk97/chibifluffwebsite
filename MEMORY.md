<!-- # Long-Term Memory: Chibi Fluff Frontend -->

## 1. The "Golden Rules" (The 5-Step Loop)
*   **Retrieve:** Before every task, scan this file for existing Design Tokens and Learned Lessons.
*   **Extract:** After every successful module build, identify "Golden Code" and move it to Section 5.
*   **Evaluate/Refine:** Use the "Refine Benchmarks" in Section 3 to audit all developer output.

## 2. Chibi Fluff Design Tokens (Brand Soul)
*   **Visual Style:** "Perfectly Imperfect" (Hand-drawn, organic, non-corporate).
*   **Border Radii:** Variable ranges (e.g., `tl: 25px, tr: 15px, bl: 10px, br: 30px`) to avoid perfect geometric shapes.
*   **Animation Easing:** Strictly use **organic easing** (elastic, bounce, or custom bezier curves). Avoid linear or standard "ease-in-out."
*   **Color Palette:**
    - `chibi-pink`: `#F9D6D8` (Header/Accents)
    - `chibi-cream`: `#FFFDF6` (Page Background)
    - `chibi-sage`: `#D4E3A9` (Badges/Nature)
    - `chibi-brown`: `#4A423E` (Primary Text/Icons)
    - `chibi-orange`: `#FBC02D` (Highlight/Protein)
    - `chibi-tan`: `#B5A49D` (Secondary Backgrounds)
*   **Iconography:** Hand-drawn style overlays or Lucide-react-native with softened stroke widths.

## 3. The "Refine" Benchmarks (Evaluation Suite)
Before code is considered "Final," it must be **Evaluated** against these three pillars:
1.  **Performance:** Must maintain **60fps** during Anime.js sequences on high-end mobile devices.
2.  **Aesthetic:** Does it feel like "Chibi Fluff"? If it looks like a standard Material Design or Bootstrap component, it requires a **Refine** pass.
3.  **Efficiency:** Does it leverage Gemini 3.1’s context window effectively? Is the code modular enough to be "Extracted" later?

## 4. Learned Lessons & Anti-Patterns
*   **Animation:** Never trigger `Anime.js` on high-level state changes that cause the entire React Native tree to re-render. Keep animations localized to "Leaf" components.
*   **Asset Pipeline:** React Native web requires explicit `width`/`height` for images. If assets fail to load via `require()`, use the hardcoded test paths in `MEMORY.md` to verify the pipeline.
*   **Sticky Headers:** Avoid `paddingTop` for header offsets if the header animates away. However, for a fixed high-fidelity header, a static `paddingTop` (e.g., `120px`) on the scroll content is the preferred structural standard for Chibi Fluff to prevent component overlap.
*   **Footer Triggers:** Use `(currentY + viewportHeight) > totalHeight * 0.8` for a reliable 80% scroll trigger on long pages.
*   **Image Rendering (0px Bug):** React Native Web requires explicit `width`/`height` for images. If an image renders at 0px despite `flex: 1`, verify that the parent container has a defined height or use absolute pixel dimensions.

## 5. Extracted "Golden Code" Repository
> *This section acts as a library of perfected logic. When a component is **Extracted** as "Brand-Perfect," it lives here for future **Retrieval**.*
*   `[snippet_id: 001]` - **The Bouncy Container:** A React Native View with randomized border-radius logic.
*   `[snippet_id: 002]` - **Smart Header Hook:** `useSmartHeaderScroll` logic for hide-on-scroll behavior.
*   `[snippet_id: 003]` - **Scalloped Edge SVG:** The exact path coordinates for the "Perfectly Imperfect" header bottom.
*   `[snippet_id: 004]` - **HeaderSpacer Molecule:** Animated height spacer to sync content with sticky header transitions.
*   `[snippet_id: 005]` - **Masonry Logic:** Staggered 2-column distribution for "Perfectly Imperfect" grids.

## 6. Technical Debt Archive (Archived May 2026)
*   `[debt: 001]` - Resolved "White Box" image issue by forcing 60x60 dimensions.
*   `[debt: 002]` - Resolved "Phantom Space" by standardizing on `paddingTop: 120` for all fixed-header pages.
*   `[debt: 003]` - Fixed Anime.js `keyframes` crash by animating plain objects via `ref.current` and `setNativeProps`.
*   `[debt: 004]` - Standardized 3D Animated Assets: Replaced hero videos with looping Animated 3D images (Home, Our Story) for better load performance.
*   `[debt: 005]` - Resolved `ReferenceError: isVisible is not defined` in ScallopedHeader by fixing initialization order during the fixed-header refactor.
*   `[debt: 006]` - Cleaned up invalid `className` and `fill` attributes on `Feather` icons to prevent potential crashes on native platforms.

---
**Status:** 
*   [x] Feature: Custom Budget Builder (app/budget-box/index.tsx).
*   [x] Asset Upgrade: Animated 3D Chibi Puppy (Home, Our Story).
*   [x] Fix: ScallopedHeader ReferenceError & Feather Icon attributes.
*   [/] Logic: "Pork Series" category filtering and product hydration.
*   [ ] Verification: Final Playwright audit for safe-area compliance.

Core layout stabilized. 3D animated asset pipeline established. Budget Builder module functional. Ready for "Pork Series" logic and final edge-case verification.