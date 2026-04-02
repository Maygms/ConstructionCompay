<message_metadata>
from: apd-architect
to: user
subject: Chevron-down now static
</message_metadata>

<message_body>

**Change applied directly to [`src/css/styles.css`](src/css/styles.css:431):**

- Removed `animation: bounce 4s ease-in-out infinite` from [`.hero__scroll-cue`](src/css/styles.css:431)
- Removed `will-change: transform` from [`.hero__scroll-cue`](src/css/styles.css:431)
- Deleted the [`@keyframes bounce`](src/css/styles.css:454) block entirely

The chevron-down button is now fully static — no movement, no animation.

</message_body>
