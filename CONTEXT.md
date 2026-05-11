# Project Context: Chibi Fluff Frontend

## 1. System Status
*   **Current Phase:** Phase 2: Core Component Execution
*   **Last Global Sync:** 2026-05-05
*   **Active Sprint:** Custom Builder & 3D Asset Integration
*   **Health:** High-Performance (M5 Optimized)

## 2. Active Development Goal
> **Current Task:** Finalizing the 3D interactive pipeline and completing the "Custom Budget Box" state machine.

## 3. Frontend Technology Stack
*   **Primary Framework:** React Native (Expo SDK)
*   **Animation Engine:** Anime.js (Targeting 60fps for high-fidelity brand movement)
*   **UI/UX:** NativeWind (Tailwind CSS for React Native)
*   **Iconography:** Lucide-react-native
*   **State Management:** [To be decided during Architect phase]

## 4. Environment & Constraints
*   **Hardware:** Apple Silicon (M5) Optimized
*   **Local AI Orchestration:** Antigravity IDE
*   **Configuration Standard:** YAML-only (Strictly no JSON for system configs)
*   **Visual Target:** "Chibi Fluff" hand-drawn aesthetic (Non-standard borders, playful easing functions).

## 5. Implementation Roadmap
*   [x] Initial `GEMINI.md` Constitution defined.
*   [x] Agentic OS Scaffolding.
*   [x] Phase 1: Technical Architecture Planning.
*   [x] Phase 2: Core Component Execution (In Progress).
    *   [x] Design Token Extraction (Colors/Borders).
    *   [x] Atom: SketchyBorder (Triple-Stroke & Dashed).
    *   [x] Layout Overhaul: Standardized fixed header and 80% centered footer.
    *   [x] Feature: Custom Budget Builder (app/budget-box/index.tsx).
    *   [x] Feature: "Our Reviews" Masonry Grid (app/reviews/index.tsx).
    *   [x] Asset Upgrade: Animated 3D Chibi Puppy (Home, Our Story).
    *   [x] Fix: ScallopedHeader ReferenceError & Feather Icon attributes.
    *   [/] Logic: "Pork Series" category filtering and product hydration.
    *   [ ] Verification: Final Playwright audit for safe-area compliance.

## 6. Tomorrow's Hook
*   **Pork Series Logic:** Finalize the hydration logic for the Pork Series products in the treats listing.
*   **Asset Audit:** Verify that all 3D images have correct explicit dimensions for web/native parity.
*   **Budget Box Polish:** Refine the "Empty State" for the budget builder when a user enters $0.