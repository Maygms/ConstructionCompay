<architecture_decisions>

## Record of Significant Decisions
| Date | Decision | Rationale | Impact | Status |
|---|---|---|---|---|
| 2026-04-02 | Initial Team Provisioning | Setup of APD environment for ConstructionCompany website project | Global | ✅ Active |
| 2026-04-02 | Lean 3-agent team (architect, frontend-dev, frontend-tester) | Project is a static frontend website with no backend requirements; a lean team avoids unnecessary complexity | Team structure | ✅ Active |
| 2026-04-02 | Static HTML/CSS/JS approach | No backend or database needed for a company showcase website; keeps the stack simple and deployable anywhere | Tech stack | ✅ Active |
| 2026-04-02 | Single-page layout (index.html) | All sections on one page with smooth scroll navigation; reduces complexity and improves UX for a showcase site | Architecture | ✅ Active |
| 2026-04-02 | Color palette: navy (#1A1A2E) + amber (#E8A020) | Navy conveys authority/trust; amber reflects construction energy; combination is professional and distinctive | Design | ✅ Active |
| 2026-04-02 | Vanilla CSS with custom properties (no framework) | Keeps dependencies at zero; custom properties enable consistent theming; sufficient for a static showcase site | Tech stack | ✅ Active |
| 2026-04-02 | Full website assigned as single task to frontend-dev | All 5 sections are tightly coupled in a single-page design; splitting into multiple tasks would cause integration overhead | Task planning | ✅ Active |

| 2026-04-02 | Fixed navbar with scroll-triggered background | Navbar starts transparent over hero, transitions to navy on scroll — avoids visual clash with hero gradient while maintaining readability on all sections | UX/Design | ✅ Active |
| 2026-04-02 | CSS custom properties for all design tokens | All colors, spacing, typography, shadows defined as CSS variables in `:root` — enables consistent theming and easy future updates | CSS architecture | ✅ Active |
| 2026-04-02 | IntersectionObserver for scroll-triggered fade-in | Lightweight, performant alternative to scroll event listeners for entrance animations; respects `prefers-reduced-motion` | JavaScript | ✅ Active |
| 2026-04-02 | Placeholder treatment for project image | No real images available; used CSS gradient + grid pattern + icon as a professional placeholder that matches brand colors | Design | ✅ Active |
| 2026-04-02 | Avatar initials for team members | No photos available; used colored gradient backgrounds with large initials — professional fallback consistent with brand palette | Design | ✅ Active |
| 2026-04-02 | Client-side form validation with simulated submission | Static site has no backend; form validates required fields (name, email, message) and simulates async submission with spinner + success state | JavaScript | ✅ Active |

### Design Patterns
- Architect-led coordination: all task assignments and status tracking flow through the architect
- Frontend-first delivery: developer implements, tester validates, architect reviews before user handoff
- Single-page application pattern: all sections in `src/index.html` with anchor-based navigation

</architecture_decisions>
