# 🧹 dev-sweeper

> **Blazing fast cross-platform TUI to safely clean up massive dependency folders from inactive projects.**

![dev-sweeper Demo](https://raw.githubusercontent.com/dvigo/dev-sweeper-node/main/assets/demo.png)

## Overview

`dev-sweeper` is a blazingly fast Terminal User Interface (TUI) tool designed to help developers reclaim disk space. Over time, your development machine gets cluttered with heavy dependency folders from old, inactive projects. `dev-sweeper` finds them instantly and lets you delete them interactively.

### Supported Targets
- `node_modules` (Node.js/JavaScript)
- `target` (Rust/Cargo)
- `venv` (Python)
- `vendor` (PHP/Composer)

## 🚀 Installation & Usage

You don't need to install anything globally! Simply run `dev-sweeper` using `npx`:

```bash
npx dev-sweeper
```

If you want to scan a specific directory instead of the current one, just pass the path as an argument:

```bash
npx dev-sweeper ~/Projects
```

## 🎮 Navigation

The interface is completely interactive:
- **`[↑ / ↓]`**: Navigate up and down the list of found directories.
- **`[Space]`**: Delete the currently selected directory and instantly reclaim disk space.
- **`[Q / Esc]`**: Quit the application.

## ⚡ Why is it so fast?

Unlike other tools that blindly walk through every single file in your system, `dev-sweeper` is smart:
1. It ignores hidden directories (like `.git`) that take forever to scan.
2. Once it finds a target folder (like `node_modules`), it stops recursing into it.
3. Disk size calculations are performed asynchronously and concurrently without blocking the UI.

## License
MIT
