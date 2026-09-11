# Aventus

Aventus is a **visual pipeline builder** — a single-page React editor for composing AI and data workflows as a directed graph. The running app brands itself as **Pipeline Builder** / **Visual workflow editor**.

You drag nodes from a palette onto a canvas, connect them, and submit the graph to a local parser that reports how many nodes and edges you have and whether the pipeline is a valid DAG.

This repository is the **frontend only**. There is no backend, router, authentication, or saved-pipeline persistence in this codebase.

## Features

What the code actually implements:

- **Node palette** — A left sidebar grouped into Core, Logic & Flow, and Custom. Palette items are dragged onto the canvas.
- **Canvas editor** — A [React Flow](https://reactflow.dev/) graph with snap-to-grid, a dotted background, zoom/pan controls, a MiniMap, and animated smoothstep edges.
- **Empty canvas state** — Placeholder copy until the first node is dropped.
- **Configurable nodes** — Per-node fields (text, select, textarea, number, checkbox, range, and color) rendered from a shared field component.
- **Text variables** — Text nodes parse `{{ variableName }}` (JavaScript identifier names), show tags for detected variables, auto-resize to the content, and add a left-side target handle for each variable.
- **Pipeline analysis** — **Submit Pipeline** sends the current graph to a parse API and opens a modal with node count, edge count, and DAG status — or an error if the request fails.
- **Node registry** — Live node types live in one catalog (`src/nodes/registry.js`). Toolbar sections, React Flow `nodeTypes`, and MiniMap colors are derived from that list.

Submit analyzes graph structure. It does **not** execute the pipeline (no LLM calls, HTTP requests, or sentiment inference from this frontend).

### Node types

These are the types registered for the palette and canvas:

**Core**

| Node | What it is in the UI |
| --- | --- |
| Input | Named pipeline input; type `Text` or `File` |
| LLM | Language-model node with `system` / `prompt` targets and a `response` source |
| Output | Named pipeline output; type `Text` or `Image` |
| Text | Template text with `{{ variable }}` handles |

**Logic & Flow**

| Node | What it is in the UI |
| --- | --- |
| Filter | Condition string; single input → output |
| Delay | Wait time in milliseconds |
| Merge | Two inputs (`a`, `b`) → one merged output |
| Conditional | Boolean expression; `true` / `false` branches |
| Note | Free-text notes; no connection handles |

**Custom**

| Node | What it is in the UI |
| --- | --- |
| API Request | HTTP method, URL, and headers |
| Math | Arithmetic operation plus a numeric operand |
| Sentiment | Threshold slider and model (`distilbert`, `roberta`, `vader`); `positive` / `negative` outputs |
| Logger | Log level, optional timestamp, format (`JSON`, `CSV`, `Plain Text`) |
| Color Tag | Color swatch and tag name |

## Stack

- **React 18** and **Create React App** (`react-scripts` 5)
- **React Flow 11** — canvas, handles, controls, MiniMap
- **Zustand** — nodes/edges store in `src/store.js` (imported by the app; not listed in `package.json`)
- **CSS custom properties** — dark theme tokens in `src/styles/`

The app is one screen: header, sidebar + canvas, footer submit bar. There are no client-side routes.

## Setup

You need Node.js and npm.

```bash
npm install
npm start
```

The dev server opens at [http://localhost:3000](http://localhost:3000). The page reloads when you edit source files.

```bash
npm run build
```

Writes a production bundle to `build/`.

`npm test` is the Create React App Jest runner. This repository does not include application test files.

If the app fails to start because `zustand` cannot be resolved, install it (`npm install zustand`). The store imports it, but it is not declared in `package.json`.

### Parse API (not in this repo)

**Submit Pipeline** `POST`s the current React Flow graph to a service that is not part of this repository:

```http
POST http://localhost:8000/pipelines/parse
Content-Type: application/json

{ "nodes": [...], "edges": [...] }
```

The result modal expects JSON of the form:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

Without that service running, the modal shows a network or HTTP error. That is expected for this frontend-only checkout.

## Project structure

```text
public/                 CRA HTML shell (title: Pipeline Builder)
src/
  App.js                App chrome: header, palette, canvas, submit footer
  toolbar.js            Node palette
  draggableNode.js      Palette drag source
  ui.js                 React Flow canvas, drop handling, empty state
  store.js              Zustand nodes/edges and field updates
  submit.js             POST /pipelines/parse
  ResultModal.js        Analysis / error dialog
  nodes/
    registry.js         Live node catalog (toolbar + canvas types)
    TextNodeBody.js     Text node editor
    textNodeUtils.js    {{ variable }} parsing and auto-sizing
    base/               createNode factory, BaseNode chrome, NodeFields
    *.js                Standalone node modules (not imported by the app shell)
  styles/               Theme tokens and layout
```

To add a node that appears in the palette and on the canvas, add one definition to `src/nodes/registry.js`.

## Screenshots

This repository does not include screenshots. After `npm start`, the UI is a dark-themed editor: **Node Palette** on the left, the React Flow canvas in the center, and **Submit Pipeline** in the footer.
