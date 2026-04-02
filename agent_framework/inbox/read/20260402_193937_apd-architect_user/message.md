<message_metadata>
from: apd-architect
to: user
subject: Bug Fix Report — chevron-down flicker resolved
</message_metadata>

<message_body>

## Fix Applied ✅

The chevron-down flickering on the hero scroll-cue button has been resolved.

### Root Cause

Even after the previous fix (removing the `transform` conflict), the browser was still repainting the animated element on every frame because it was not promoted to its own GPU compositor layer.

### Change Made

**File:** [`src/css/styles.css`](src/css/styles.css:431)

Added `will-change: transform` to the `.hero__scroll-cue` rule:

```css
.hero__scroll-cue {
  /* ... existing properties ... */
  animation: bounce 2s infinite;
  will-change: transform;   /* ← added */
  z-index: 1;
}
```

This tells the browser to promote the element to the GPU compositor layer before the animation starts, eliminating the repaint-driven flicker entirely.

### QA Validation

The frontend tester confirmed:
- `will-change: transform` is present on `.hero__scroll-cue`
- No base `transform` conflict on the element
- `@keyframes bounce` uses only `translateY` — clean
- Full regression: all 5 sections, navigation, CSS, JS — **all passed**

The site is ready for review. Open [`src/index.html`](src/index.html) in a browser to verify.

</message_body>
