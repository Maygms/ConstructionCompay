<routing_table>

## Workflow Routing
This table defines the sequence of transitions for the team.

Message templates are located at `agent_framework/inbox/templates/`.

| Trigger Condition | From (Origin) | To (Destination) | Message Template |
|---|---|---|---|
| Frontend task assigned | apd-architect | apd-frontend-dev | message_task.md |
| Website ready for user review | apd-architect | user | message_report.md |
| Input or decision needed | apd-architect | user | message_report.md |
| Project complete | apd-architect | user | message_report.md |
| Frontend implementation done | apd-frontend-dev | apd-frontend-tester | message_report.md |
| Frontend tests passed | apd-frontend-tester | apd-architect | message_report.md |
| Frontend bug found | apd-frontend-tester | apd-architect | message_report.md |
| Input Needed | [any] | user | message_briefing.md |
| No matching trigger condition found | [any] | user | message_report.md |

</routing_table>
