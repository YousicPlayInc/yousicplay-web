# YousicPlay Web - Claude Instructions

## Project Overview
Static marketing site rebuilding yousicplay.com in Next.js 16. See `docs/CAPSULE.md` for full context.

## Build & Dev Commands
```bash
npm run dev          # Dev server (Turbopack, port 3000)
npm run build        # Production build - must pass with 25/25 pages
npm run lint         # ESLint
vercel               # Deploy to Vercel (CLI, no GitHub integration)
```

## Key Technical Rules
- **Tailwind v4**: Use `@theme inline {}` in globals.css. NOT tailwind.config.ts.
- **Next.js 16 params**: `params: Promise<{slug: string}>` — must `await` params.
- **Client components**: Only use `"use client"` for interactive parts. Extract into sub-components.
- **Fonts**: `--font-poppins-var` (body), `--font-playfair-var` (headings). Set in layout.tsx.
- **cn() helper**: Use `cn()` from `lib/utils.ts` for conditional Tailwind classes.

## Design Tokens
- Navy: #202536 | Navy-light: #2a2f45 | Navy-dark: #181c2c
- Lime: #CCFF00 | Magenta: #B10BFF | Cream: #F5F5F0

## Known Gotchas
- Button component: Don't use discriminated union with ButtonHTMLAttributes — use flat interface
- Server component event handlers: Extract interactive parts into client sub-components
- Hero video (23MB) can cause memory pressure during Turbopack HMR

## Reference Docs
- `docs/REPO_MAP.md` — File structure + hot files
- `docs/DECISIONS.md` — Architecture decisions (don't re-litigate)
- `docs/CAPSULE.md` — Quick context for new sessions

---

## Session Startup (Auto-Detection)

**On first interaction, Claude should:**
1. Run `whoami` to detect the current user
2. Look up their profile below
3. Apply their tool routing silently

### Developer Profiles

#### @justinpease
- **Tools:** Claude, Gemini CLI, Cursor, ChatGPT
- **IDE:** VS Code / Cursor
- **Skills:** Available

#### @template (copy for new devs)
- **Tools:** [Claude, Gemini CLI?, Cursor?, Copilot?, ChatGPT?]
- **IDE:** [VS Code / Cursor / etc.]
- **Skills:** [Available / Not available]

---

## Token Efficiency & Tool Routing

### When to use each tool

| Task | Best Tool | Why |
|------|-----------|-----|
| Repo-wide search/inventory | **Gemini CLI** | Cheaper for scanning many files |
| Single-file edit, UI iteration | **Cursor** | In-editor, fast feedback loop |
| Architecture decisions, tradeoffs | **Claude** | Best structured reasoning |
| Marketing copy, docs prose | **ChatGPT** | Strong at narrative |
| Visual comparison (live vs local) | **You + Browser** | AI can't truly verify visual output |
| Linting, type checking | **Local tools first** | `npm run build` before asking AI |

### Required context per task
- **Don't** paste the whole repo. Provide: Work Order + 1-3 files + error log
- **Do** reference `docs/DECISIONS.md` instead of re-explaining past choices
- **Do** reference `docs/REPO_MAP.md` to find files quickly

### Redirect rules
When user asks something better suited for another tool, say:
- **Gemini**: "This is a repo-wide scan. Run in Gemini CLI: `[command]`"
- **Cursor**: "This is a focused single-file edit. Use Cursor with the file open."
- **ChatGPT**: "This is narrative/copy work. Draft in ChatGPT, bring back for code integration."
- **Local tools**: "Run `npm run build` first, then share the errors."

---

## Session Management

### Exchange tracking
- Warn at ~15-20 exchanges: "We're getting long. Good checkpoint to `/compact` or restart."
- Suggest restart at natural breakpoints (feature complete, before switching topics)

### Handoff blocks
When ending a session or at checkpoints, provide:
```
## Handoff
- **What we did:**
- **Current state:**
- **Next step:**
- **Files touched:**
```

---

## Skills (Auto-Invoked)

Claude triggers these automatically — user doesn't need to remember:

| When | Skill |
|------|-------|
| Building something new | brainstorming |
| Debugging a failure | systematic-debugging |
| Think work is done | verification-before-completion |
| Ready for PR | finishing-a-development-branch |
| Got PR feedback | receiving-code-review |
