<message_metadata>
from: apd-architect
to: user
subject: Bug Fix — Chevron-down flickering resolved
</message_metadata>

<message_body>

## Bug Fix Applied

**Issue:** The `chevron-down` button (`.hero__scroll-cue`) was flickering during its bounce animation.

**Root Cause:** The element had `transform: translateX(-50%)` on its base CSS rule for horizontal centering, while the `@keyframes bounce` animation also set the `transform` property on every frame. Because CSS animations override the base `transform` entirely, the browser was alternating between the base value and the animated value on each frame — causing the visible flicker.

**Fix applied in [`src/css/styles.css`](src/css/styles.css:431):**

- Replaced `left: 50%` + `transform: translateX(-50%)` centering with `left: calc(50% - 22px)` (half of the element's 44px width), so centering no longer depends on `transform`
- Simplified `@keyframes bounce` to use only `translateY(0)` / `translateY(8px)` — the animation now has exclusive ownership of the `transform` property, eliminating the conflict and the flicker

</message_body>
