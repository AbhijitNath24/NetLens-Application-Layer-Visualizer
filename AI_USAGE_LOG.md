# NetLens --- AI Usage Log

## Assignment 2

### AI Platform and Model

**Platform:** OpenAI ChatGPT\
**Model:** GPT-5.6 Luna

The AI assistant was used as a substantial coding and debugging partner
during the extension of the Assignment 1 NetLens project.

Evidence for submission can be provided using screenshots of the ChatGPT
development conversation showing the prompts, generated code, debugging
iterations, and final testing.

## Development Record

### 1. Assignment analysis and architecture

**Prompt/task:** Extend the existing Assignment 1 dual-panel dashboard
for Assignment 2 while keeping the left Activity Console unchanged and
adding synchronized Application Layer and Transport Layer views.

**AI contribution:** - Parsed the Assignment 2 requirements. -
Identified the required Browsing, Mail and Streaming transport flows. -
Planned a tabbed Application/Transport interface. - Preserved the
existing FastAPI backend because the assignment permits protocol
simulation and the backend only serves static files.

**Result:** The existing two-panel architecture was retained and the
right panel was extended.

### 2. Index/HTML update

**Prompt/task:** Provide the complete updated `static/index.html` so it
is easy to replace the existing file.

**AI contribution:** - Added Application Layer / Transport Layer view
controls. - Added transport-specific UI containers. - Kept the left-side
Browse/Mail/Stream actions. - Added fields required by the JavaScript
renderer.

**Result:** The dashboard gained a clear two-view Protocol Observatory.

### 3. CSS implementation and debugging

**Prompt/task:** Update the stylesheet for the Assignment 2 transport
visualization.

**AI contribution:** - Added styles for the view switch. - Added TCP
flag badges. - Added transport fields and state indicators. - Added
transport timing and packet highlighting styles. - Added responsive
behavior.

**Debugging issue:** The Assignment 2 CSS was initially nested inside an
existing media-query block, so the desktop browser did not apply the
view-switch styling.

**Correction:** The CSS was moved outside the media-query scope and
selectors were aligned with the HTML structure.

**Result:** The Application Layer / Transport Layer switch displayed
correctly.

### 4. Transport-layer JavaScript

**Prompt/task:** Replace the existing `app.js` with an Assignment 2
implementation supporting synchronized Application and Transport views.

**AI contribution:** - Created transport flow data for Browsing, Mail
and Streaming. - Added DNS/UDP representation. - Added TCP
SYN/SYN-ACK/ACK handshake. - Added data segments with
Seq/Ack/Win/Flags/Length. - Added FIN/ACK teardown. - Added TCP state
information. - Added synchronization between application steps and
transport steps. - Added Previous, Next, Pause/Resume and Replay
behavior. - Added packet/timeline animation. - Added activity log
integration.

### 5. TCP correctness iteration

**Prompt/task:** Test the generated transport behavior and correct any
TCP state/sequence issues.

**AI contribution:** - Reviewed the simulated sequence and
acknowledgement progression. - Kept SYN consumption of one sequence
number. - Used ACK values that acknowledge the next expected byte. -
Kept pure ACK segments at zero payload length. - Separated SMTP
application-level QUIT/221 messages from the later TCP FIN teardown. -
Used TIME-WAIT as the final client-side state in the simulated teardown.

**Result:** Browsing, Mail and Streaming were tested through the TCP
teardown stage.

### 6. Browser synchronization

**Prompt/task:** Ensure the entered browser hostname is reflected in the
simulated DNS/HTTP fields.

**AI contribution:** - Updated the browser flow data using the entered
hostname before starting the simulation.

**Result:** The simulation can display the user-entered browsing target
rather than a fixed hostname in relevant fields.

### 7. Streaming control correction

**Prompt/task:** Check Pause/Resume and stream timer behavior.

**AI contribution:** - Adjusted the stream clock so it can resume
without resetting unexpectedly. - Ensured the stream timer stops when
the flow completes.

**Result:** Streaming controls and visualization state remain
consistent.

## Testing Evidence

The completed implementation was manually tested in the browser for:

### Browsing

-   DNS/UDP
-   TCP handshake
-   HTTP request/response
-   TCP teardown
-   Final ACK / TIME-WAIT

### Mail

-   SMTP conversation over TCP
-   TCP teardown
-   Final ACK / TIME-WAIT

### Streaming

-   Selected media quality
-   Manifest/segment transfer
-   TCP teardown
-   Final ACK / TIME-WAIT

Screenshots of these completed flows should be retained as the visual
evidence for the submission.

## AI-Assisted Development Summary

AI was not used only to generate the final code. It was used iteratively
for: 1. requirement interpretation 2. architecture 3. code generation 4.
debugging 5. protocol-state correction 6. UI/CSS debugging 7. testing
guidance 8. documentation

The final implementation was tested manually in the browser after the
AI-assisted iterations.
