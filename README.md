<h1 align="center">🧹 dev-sweeper</h1>

<p align="center">
  <strong>Blazing fast, cross-platform TUI to safely clean up massive dependency folders from inactive projects.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dev-sweeper"><img src="https://img.shields.io/npm/v/dev-sweeper.svg?style=flat-square" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/dev-sweeper"><img src="https://img.shields.io/npm/dt/dev-sweeper.svg?style=flat-square" alt="NPM Downloads" /></a>
  <img src="https://img.shields.io/npm/l/dev-sweeper.svg?style=flat-square" alt="License" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/dvigo/dev-sweeper-node/main/assets/demo.png" alt="dev-sweeper UI" width="600" />
</p>

## 💡 The Problem

As developers, we tend to accumulate dozens of abandoned side projects, cloned repos, and old experiments. Before you know it, folders like `node_modules`, Rust's `target`, or Python's `.venv` have quietly eaten up **gigabytes of your hard drive space**. 

`dev-sweeper` is here to reclaim your disk space. It's like `npkill`, but built to sweep away the mess across **multiple language ecosystems**.

## ✨ Features

- **🚀 Blazing Fast:** Built with a custom asynchronous crawler that ignores hidden directories (like `.git`) and immediately stops recursing once a target is found.
- **🌍 Multi-Ecosystem:** Out of the box, it hunts down:
  - `node_modules` (JavaScript / TypeScript / Node)
  - `target` (Rust / Cargo)
  - `venv` / `.venv` (Python)
  - `vendor` (PHP / Composer)
- **🖥️ Beautiful TUI:** A sleek, interactive terminal UI powered by [Ink](https://github.com/vadimdemedes/ink).
- **🔒 Safe:** It only calculates sizes and deletes folders *when you explicitly tell it to*.

## 🚀 Installation & Usage

You don't even need to install it globally. Just run it via `npx` anywhere in your terminal!

### Sweep the current directory:
```bash
npx dev-sweeper
```

### Sweep a specific directory:
```bash
npx dev-sweeper ~/Projects
```

---

## 🎮 Navigation

The interface is completely interactive and works on macOS, Linux, and Windows.

| Key | Action |
| --- | --- |
| `[ ↑ ]` or `[ ↓ ]` | Move the cursor up and down the list |
| `[ Space ]` | **Delete** the currently selected directory |
| `[ Q ]` or `[ Esc ]` | Quit the application |

Once you press Space, `dev-sweeper` will instantly wipe the directory and update your total "Space Saved" counter in real time.

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Ink](https://github.com/vadimdemedes/ink) (React for CLI)
- [fdir](https://github.com/thecodrr/fdir) & native Node.js async filesystem APIs

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
