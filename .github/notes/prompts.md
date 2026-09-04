# History of prompts

### 1.
>check the repo, claude.md, all inside .github/notes/
>
>your job now is to create an INFO.md and ROADMAP.md inside .github/notes/
>
>INFO.md - information about the business, build the website based on that
>ROADMAP.md - implementation roadmap of the build, ask me for the architecture when unsure
>
>The basic information is provided to you in the PLAN.md
>
>Do not touch / view prompts.md, it is a history of the prompts given to you

· What stack should the landing page be built on? (Plain static HTML/CSS/JS (Recommended) / Vite + vanilla TS / Astro)
· How should imagery be handled? The shop has no licensable first-party photography available. (Free-license stock, curated (Recommended) / Typography-led, minimal photography / SVG illustration set)
· What language should the site be in? The audience is both tourists and Amsterdam locals. (English, with Dutch product names (Recommended) / Bilingual NL/EN toggle / Dutch only)
· Should the roadmap include deployment and repo tooling, or only the page build? (Page + GitHub Pages deploy (Recommended) / Page only / Page + deploy + QA checks)

I chose:
Plain static HTML/CSS/JS (Recommended) [note: i like he fact that plain html is the reccomended option here, cuz it really is just 1 page and no framework is needed.].  
Free-license stock, curated (Recommended).  
English, with Dutch product names (Recommended).  
Page only.  

### 2.
> run the git commands too, the whole project is basically an experiment of whether you are capable of fully running a dev proccess and able to build a website baseo on prior research. Go autonomous, finish it.

i'm lowkey impressed he added a jsonld immediately, without a single word said about SEO, probbaly because of plan.md specifications

### 3.
> it's running via live server on http://127.0.0.1:5500/index.html, you can check it

(he kinda got lost in the browser)
(also claude's chrome session casually collapsing a browser while you trying to study is probably not the best feature anthropic made, i feel like it should start a separate page for it)

holyy why so many tokens tho
>✽ Brewing… (15m 47s · ↓ 60.3k tokens)

### 4.
>add the screenshots you made into ./claude-screenshots at the repo root, but cut all metadata via exiftool -all= >-overwrite_original
>
>it is not going to the owner btw, just an experiment, as i stated before, i'm not realistically selling that to anybody. It >is also an open repo under MIT.
>
>on git commands:
>git add - only git add ., update the whole state. switch to main and work only from there, i merged it on github.

### 5.
> include the screenshot into the README

### 6.
>is it finished? your work, your call here. after you say it's finished i'll evaluate the website and ask you questions about the build. be sure here.
>doing a lot of changes is not ideal, as it'll break the point of the original "one shot" check

Claude's response - "Yes — it's finished. I'm not making further changes."

### 7. (new session, deleted CLAUDE.md, PLAN.md, ROADMAP.md, only INFO.md left)
>rate the website, 1-10, evaluate it, do not run any git commands, do not check prompts.md, assume INFO.md is true, do not re-verify.

>at the end:
>make a VERDICT.md at the repo root saying your verdict on this website, sellable / no? good / bad and why, make the specs and check them.