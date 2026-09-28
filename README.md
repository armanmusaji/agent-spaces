# Agent Spaces

A clickable prototype of a feature concept for a design tool: a project page where a designer can see what two AI agents need decided, inspect the work, and rule beside it. Part of Arman Musaji's AI Workflow Experiments series.

Self-initiated. The design tool, the library and the people are fictional. The two agents are scripted; no live AI runs inside the prototype. The content comes from a real working trial in which Claude and GPT Astra built the two directions in Figma with Arman ruling between rounds.

- Case study: https://armanmusaji.com/ai-workflow-experiments/agent-spaces
- Prototype: https://agent-spaces.vercel.app

## Detail pages

- [Research and context](docs/research.md)
- [The trial](docs/trial.md)
- [Learnings and effort](docs/learnings.md)
- [Reviews](docs/critiques.md)
- [Decisions](docs/decisions.md)
- [The review kit](docs/kit.md)

## Run it

```
npm install
npm run dev
```

`npm run build` produces the site in `dist/`. `npx vite build --config vite.artifact.config.js` produces a single-file bundle in `dist-artifact/` used for hosted review builds. `checks/host-check.mjs` renders the single-file page inside a simulated host that defines colliding CSS variable names, in light and dark.

## Credits

Directed by Arman Musaji, who set the process and made every ruling. Claude led scope, the trial setup, Direction A and the build. GPT Astra built Direction B, critiqued at each gate and ran the build review and rechecks. Type: Public Sans.
