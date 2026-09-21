# AI Usage Log — NetLens

## Application Layer Protocol Visualizer

---

# 1. Purpose

Artificial Intelligence tools were used as development assistance during the creation of the NetLens Application Layer Protocol Visualizer.

The purpose of using AI was to support:

- project planning,
- interface design,
- code organization,
- protocol sequence development,
- debugging,
- documentation,
- testing ideas,
- and reflection writing.

AI-generated suggestions were reviewed and adapted during implementation.

The final project was assembled, tested, and modified in Visual Studio Code.

---

# 2. Project Planning

AI assistance was used during the initial planning stage to understand how the assignment requirements could be converted into a working web application.

The planning process focused on:

- creating exactly two main panels,
- connecting user activities with protocol visualization,
- selecting an appropriate technology stack,
- organizing the project files,
- designing the protocol sequences,
- and adding interactive controls.

The project structure was planned around:

```text
main.py
requirements.txt
README.md
AI_USAGE_LOG.md
REFLECTION.md

static/
    index.html
    styles.css
    app.js
    favicon.svg
```

---

# 3. HTML Development

AI assistance was used to help structure the HTML interface.

The HTML was organized around two major panels.

```text
Left Panel
Activity Console

Right Panel
Protocol Observatory
```

The left panel contains the application activities:

- Browsing
- Email
- Streaming

The right panel contains:

- current flow information,
- protocol step,
- protocol name,
- latency,
- timeline,
- client/server visualization,
- message inspector,
- navigation controls.

The generated HTML suggestions were adapted to the actual project requirements and interface design.

---

# 4. CSS Development

AI assistance was used to generate and improve ideas for the visual design.

The CSS development focused on:

- two-panel layout,
- dark interface design,
- cards,
- buttons,
- activity tabs,
- protocol timeline,
- client/server visualization,
- packet arrows,
- status indicators,
- message inspector,
- responsive behavior,
- and visual animations.

The CSS was modified during development to match the final NetLens interface.

The final styling was not treated as a direct unmodified AI output.

---

# 5. JavaScript Development

JavaScript was the main component responsible for making the interface interactive.

AI assistance was used to help organize:

- activity selection,
- protocol step arrays,
- navigation controls,
- request/response classification,
- protocol message display,
- timeline updates,
- activity status,
- pause/resume behavior,
- replay functionality,
- and client/server packet animation.

The final JavaScript contains predefined protocol sequences for:

```text
Browsing
Email
Streaming
```

---

# 6. Browsing Protocol Simulation

AI assistance was used to help organize the browsing protocol sequence.

The final browsing flow is:

```text
DNS Query
↓
DNS Response
↓
HTTP GET Request
↓
HTTP Response
```

The simulation displays representative messages such as:

```text
DNS Query
example.com
```

and:

```http
GET / HTTP/1.1
Host: example.com
```

followed by an HTTP response.

The protocol sequence was reviewed and adapted for the educational purpose of the project.

---

# 7. Email Protocol Simulation

AI assistance was used to help organize the SMTP sequence.

The final sequence is:

```text
DNS MX Lookup
↓
SMTP Service Ready
↓
EHLO Command
↓
EHLO Response
↓
MAIL FROM
↓
Sender Accepted
↓
RCPT TO
↓
Recipient Accepted
↓
DATA Command
↓
Start Mail Input
↓
Message Body
↓
Message Accepted
↓
QUIT
↓
SMTP Session Closed
```

Representative SMTP messages include:

```text
220 Service Ready
```

```text
EHLO netlens.local
```

```text
MAIL FROM:<sender@example.com>
```

```text
RCPT TO:<receiver@example.com>
```

```text
DATA
```

```text
QUIT
```

The response codes and command sequence were checked during development to maintain consistency with the intended SMTP demonstration.

---

# 8. Streaming Protocol Simulation

AI assistance was used to help organize the simplified streaming sequence.

The final sequence is:

```text
DNS Query
↓
DNS Response
↓
Manifest Request
↓
Manifest Response
↓
Segment 001 Request
↓
Segment 001 Response
↓
Segment 002 Request
↓
Segment 002 Response
```

The simulation represents a simplified HTTP-based media streaming workflow.

It does not implement an actual streaming server.

---

# 9. Interactive Controls

AI assistance was also used to plan the protocol navigation controls.

The interface includes:

```text
Previous
Pause
Next
Replay
```

These controls allow the user to:

- move backward,
- pause the simulation,
- move forward,
- restart the sequence.

The controls were implemented and tested in the browser.

---

# 10. Debugging Assistance

AI assistance was used during debugging when errors or unexpected behavior appeared during development.

Examples of debugging areas included:

- JavaScript event handling,
- DOM element selection,
- protocol step transitions,
- activity status updates,
- request/response status display,
- frontend/backend integration,
- and FastAPI configuration.

One important implementation change was wrapping the JavaScript initialization inside:

```javascript
DOMContentLoaded
```

This ensured that the required HTML elements were available before JavaScript attempted to access them.

---

# 11. FastAPI Assistance

AI assistance was used to structure the FastAPI backend.

The backend provides the main page and serves static frontend files.

The core structure is:

```python
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse("static/index.html")
```

The application is executed using Uvicorn.

Example:

```bash
uvicorn main:app --reload
```

---

# 12. Documentation Assistance

AI assistance was used to prepare and organize project documentation.

Documentation assistance included:

- README structure,
- feature descriptions,
- installation instructions,
- protocol explanations,
- project architecture,
- limitations,
- future improvements,
- AI usage documentation,
- and project reflection.

The documentation was reviewed and adjusted according to the actual implemented project.

---

# 13. Human Verification and Modification

AI was used as an assistance tool rather than as the sole developer.

The project was manually reviewed and modified during development.

Human verification included:

- opening the project in Visual Studio Code,
- installing dependencies,
- running the FastAPI server,
- opening the application in a browser,
- testing the activity tabs,
- testing protocol sequences,
- testing buttons,
- checking protocol messages,
- checking status changes,
- checking the frontend layout,
- and fixing implementation issues.

The final implementation therefore combines AI-assisted development with manual coding, testing, and modification.

---

# 14. Technologies Used

The project uses:

```text
Python
FastAPI
Uvicorn
HTML5
CSS3
JavaScript
Visual Studio Code
```

---

# 15. AI Contribution Summary

AI assistance contributed primarily to:

| Area | AI Assistance |
|---|---|
| Project Planning | High |
| HTML Structure | Medium |
| CSS Ideas | High |
| JavaScript Organization | High |
| Protocol Sequence Planning | High |
| Debugging | Medium |
| Documentation | High |
| Testing Ideas | Medium |
| Final Verification | Human |
| Final Project Assembly | Human |

The table describes the nature of assistance rather than claiming that the AI independently created the complete project.

---

# 16. Example Development Workflow

A typical development workflow was:

```text
Assignment Requirement
        ↓
Project Planning
        ↓
AI-Assisted Design
        ↓
Code Implementation
        ↓
Run in VS Code
        ↓
Browser Testing
        ↓
Identify Issues
        ↓
Debug and Modify
        ↓
Retest
        ↓
Documentation
```

---

# 17. Reflection on AI Usage

Using AI during the project helped reduce the time required for repetitive development tasks and provided suggestions for structuring the application.

However, the AI suggestions still needed to be understood and tested.

For example, protocol visualization requires the developer to understand the sequence rather than simply copying code.

The development process therefore involved:

- understanding the suggestion,
- implementing it,
- testing it,
- identifying problems,
- modifying it,
- and verifying the final behavior.

This helped make the AI-assisted process more useful as a learning activity.

---

# 18. What Was Learned Through AI-Assisted Development

The project helped reinforce several concepts.

### Networking

- DNS
- HTTP
- SMTP
- client-server communication
- request-response communication
- protocol sequencing

### Programming

- JavaScript event handling
- arrays of objects
- DOM manipulation
- UI state management
- frontend animations

### Web Development

- FastAPI
- static file serving
- HTML structure
- CSS layouts
- JavaScript integration

### Software Development

- debugging
- testing
- documentation
- project organization

---

# 19. Limitations of AI Assistance

AI-generated suggestions may contain errors or assumptions.

Therefore, AI output was not treated as automatically correct.

The following areas required verification:

- protocol sequence,
- SMTP commands and response codes,
- JavaScript behavior,
- HTML structure,
- FastAPI configuration,
- browser behavior.

The final implementation was tested before being considered part of the project.

---

# 20. Final Statement

AI was used as a development assistant throughout the NetLens project.

It supported planning, coding ideas, debugging, and documentation.

The final project was manually assembled, tested, modified, and verified by the student.

The AI tool therefore functioned as a development aid while the student remained responsible for understanding, implementing, testing, and presenting the project.

---