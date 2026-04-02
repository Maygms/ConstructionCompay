<lessons_learned>

## Technical Lessons
Errors related to code, dependencies, commands, and tooling.

| Date | Agent | Error | Solution | Status |
|---|---|---|---|---|
| {{date}} | {{agent_slug}} | {{error_description}} | {{solution_applied}} | ✅ Resolved |
| 2026-04-02 | apd-architect | `hero__scroll-cue` chevron-down flickering (cause 1): base `transform: translateX(-50%)` conflicted with `@keyframes bounce` which also sets `transform`, causing the browser to flicker between the two values | Replaced `left: 50% + transform: translateX(-50%)` with `left: calc(50% - 22px)` and simplified keyframes to only use `translateY`, giving the animation exclusive ownership of `transform` | ✅ Resolved |
| 2026-04-02 | apd-architect | `hero__scroll-cue` chevron-down flickering (cause 2): even after resolving the `transform` conflict, the browser was repainting the animated element on every frame because it was not promoted to its own compositor layer | Added `will-change: transform` to `.hero__scroll-cue` so the browser promotes the element to the GPU compositor layer, eliminating repaint-driven flicker | ✅ Resolved |
| 2026-04-02 | apd-architect | Chevron-down animation too aggressive/visible — user perceived it as flickering due to large displacement and fast cycle | Reduced `translateY` from `8px` → `3px`, duration from `2s` → `3s`, timing function to `ease-in-out` for a barely-perceptible, smooth float | ✅ Resolved |
| 2026-04-02 | apd-architect | Bounce still too visible after first reduction — user requested further reduction | Reduced `translateY` from `3px` → `1px`, duration from `3s` → `4s`; animation is now extremely subtle | ✅ Resolved |

## Behavioral Lessons
Errors related to APD protocol, message format, and operational rules.

| Date | Agent | Error | Solution | Status |
|---|---|---|---|---|
| {{date}} | {{agent_slug}} | {{error_description}} | {{solution_applied}} | ✅ Resolved |

</lessons_learned>
