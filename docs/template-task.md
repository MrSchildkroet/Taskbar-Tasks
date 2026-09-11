<!-- Frontmatter defines the project. One file = one project. -->

---

id: <uuid> #Is created in the code. Db holds exact UUID as frontmatter
project: <project-name> #Project-name
color: <color> #Color of the project in ui

---

<!-- Template Task -->

---

## Task-Titel

- id: <uuid>
- status: open|done <!-- Toggle button in ui -->
- prio: high|medium|low
- due: 2026-09-10 <!-- ISO-String -->
- type: feature|bug|documentation

This is the description of the Task. Seperated from the props because props are list-elements that begin with: `-`. The description is a paragraph.

---
