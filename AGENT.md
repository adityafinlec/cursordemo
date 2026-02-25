## AGENT.md – Cursor AI Playbook

Welcome, agent. This repo is a **sandbox for Express + SQLite** experiments in Cursor. Keep changes **clean, minimal, and well-structured**.

---

### Project Mental Model

- **Entry point**: `server.js` (Express app)  
- **Database**: SQLite via the `sqlite3` package  
- **Package manifest**: `package.json` (scripts, deps, metadata)  
- **Docs**: `README.md` for humans, `AGENT.md` for AI behavior  

Think of this project as a **small API service** that can grow into more complex demos.

---

### Style and Aesthetic Rules

- Prefer **clarity over cleverness** in code.  
- Use **modern JS patterns** (for example, `const`/`let`, arrow functions where appropriate).  
- Keep files **short and focused**; extract helpers instead of creating god files.  
- Avoid noisy comments; only explain intent, trade-offs, or tricky logic.  

---

### Editing Guidelines for Agents

- **Before editing**, always:  
  - Read the relevant file(s) fully.  
  - Skim `package.json` and `README.md` if behavior depends on scripts or setup.  
- **When adding code**:  
  - Keep functions small and single-purpose.  
  - Handle errors explicitly (especially around DB and I/O).  
  - Prefer configuration via environment variables over hardcoding secrets.  
- **When refactoring**:  
  - Preserve public APIs unless explicitly asked to change them.  
  - Keep changes cohesive (one logical concern per edit/PR).  

---

### Documentation Expectations

- For **`README.md`**:  
  - Focus on humans: how to run, what it does, tech stack.  
  - Keep it short, modern, and visually clean.  
- For **`AGENT.md`**:  
  - Focus on you (the agent): how to behave, what to avoid, project rules.  
  - Update it when adding new conventions or patterns.  

---

### Quality Checklist (for every change)

- Code passes basic sanity review:  
  - No obvious syntax errors.  
  - No unused variables or dead code where avoidable.  
- Project remains easy to understand:  
  - Names are descriptive and consistent.  
  - New logic is grouped logically (for example, routes, DB access, utilities).  
- Documentation is in sync:  
  - Any new scripts, ports, or env vars are reflected in `README.md`.  
  - Any new conventions for AI are reflected here in `AGENT.md`.  

---

### Future-Friendly Mindset

When uncertain, choose the option that:

- Makes the codebase **easier for the next agent (or human)**.  
- Keeps the project **simple, explicit, and hackable**.  

Your goal is not just to make it work, but to keep this repo a **clean, modern demo** of what AI-assisted coding can look like.

