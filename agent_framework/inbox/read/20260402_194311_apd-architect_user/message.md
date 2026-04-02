<message_metadata>
from: apd-architect
to: user
subject: Chevron-down animation — subtlety fix applied
</message_metadata>

<message_body>

## Change Applied

The [`@keyframes bounce`](src/css/styles.css:454) animation on the `.hero__scroll-cue` chevron-down button has been made considerably more subtle:

| Property | Before | After |
|---|---|---|
| `translateY` displacement | `8px` | `3px` |
| Duration | `2s` | `3s` |
| Timing function | *(default)* | `ease-in-out` |

The element now produces a barely-perceptible, slow float rather than a visible bounce. No other styles were changed.

</message_body>
