# Research and context

What we looked at before designing Agent Spaces, and what it does and does not show. Sources were checked on 2026-09-25 and the two product pages again on 2026-09-27. This is orientation, not a market audit.

## The space

Design tools now let AI agents edit the file itself. Two routes exist: an agent built into the tool, and outside agents writing to the canvas through a connector. The design question underneath: while an agent changes a file that people also work in, how does a person know what it is touching, keep it away from what it should not touch, and decide what stays?

## What existing products do (from their own pages)

- Figma's agent acts on layers you select, can run several prompts at once with a progress marker for each, and can be stopped or undone. Selection is its input; we found no documented way to mark what is off limits. Source: [Work with the Figma agent in design files](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files).
- Figma's connector lets outside agents write to files, with results reviewed in Figma. Source: [Write to canvas](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/).
- Framer puts agent work on automatic branches that you review and merge, with presence and undo scoped to the branch. Sources: [Framer agents](https://www.framer.com/agents/), [Framer collaboration](https://www.framer.com/collaborate/).
- A CHI 2026 study of shared documents with people and agents treated agent profiles as personal territory and their outputs as shared, and had agents comment rather than edit directly. Source: [Lehmann et al., 2026](https://arxiv.org/html/2509.11826v2).

## First-hand starting point

Arman already runs a manual version of this in his own Figma files: named sections per agent, a read-only reference area, status carried in section names, old lanes renamed rather than deleted. It works as a convention and only as a convention. Nothing stops an agent writing outside its lane, and a person has to keep the status text current. That practice is the reason the project exists. Client files are not shown.

## What this does and does not establish

The reviewed sources describe parallel prompts, branch isolation and comment-only agents. None of them describes standing per-agent spaces in one file or a round-based review between two agents with a person ruling. That is an opportunity hypothesis drawn from a small set of sources on a given date. It is not a claim that the market lacks the idea.
