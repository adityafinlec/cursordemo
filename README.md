## cursorpractice

A **minimal Express + SQLite API** built as a playground for experimenting with **Cursor** and AI-assisted development.

---

### Overview

- **Express server** using `server.js` as the main entry point  
- **SQLite3 database** via the `sqlite3` npm package  
- **Simple, focused codebase** designed for fast iteration with AI agents  

---

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Start the server

```bash
npm start
```

By default, the app will run using `node server.js`. If you add environment variables or a custom port, document them here.

---

### Tech Stack

- **Runtime**: Node.js  
- **Server**: Express (`express@^5.2.1`)  
- **Database**: SQLite (`sqlite3@^5.0.2`)  
- **Module system**: CommonJS (`"type": "commonjs"`)  

---

### Development Notes

- Keep routes and database logic modular for easier refactoring with Cursor.  
- Use small, focused functions so AI agents can understand and modify them safely.  
- Document any non-obvious decisions in `AGENT.md` so the AI always has context.  

---

### AI Agent Guide

This project is designed to be edited with an AI agent (like the one in Cursor).

- See `AGENT.md` for **conventions, rules, and guidance** for the agent.  
- Keep `README.md` focused on humans; keep `AGENT.md` focused on how the AI should work in this repo.  

---

### License

This project is licensed under the **ISC** license (see `package.json`).