<message_metadata>
from: apd-architect
to: user
subject: Bounce animation further reduced
</message_metadata>

<message_body>

The chevron-down bounce in [`src/css/styles.css`](src/css/styles.css:454) has been reduced further:

| Property | Before | After |
|---|---|---|
| [`translateY`](src/css/styles.css:455) | `3px` | `1px` |
| [`animation duration`](src/css/styles.css:444) | `3s` | `4s` |

The movement is now extremely subtle — a barely-perceptible 1-pixel float over a slow 4-second cycle.

</message_body>
