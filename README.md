# NetLens — Application Layer Protocol Visualizer

> A dual-panel educational network simulator for visualizing Application Layer protocols through interactive activities and sequential protocol animations.

---

## 1. Project Overview

**NetLens** is an interactive educational web application designed to demonstrate how common Application Layer protocols operate during real-world network activities.

The application provides two synchronized panels:

- **Left Panel — Activity Console**
- **Right Panel — Protocol Observatory**

Users can perform three different activities:

1. Web Browsing
2. Email Sending
3. Video Streaming

The corresponding application-layer communication is then visualized step-by-step in the Protocol Observatory.

The project is designed as an educational simulation rather than a real network packet analyzer. It focuses on helping students understand the sequence, direction, messages, and important fields involved in common Application Layer protocols.

---

## 2. Problem Statement

Application Layer protocols such as DNS, HTTP, and SMTP are often difficult to understand when they are studied only through theoretical diagrams.

Students may understand individual protocol names but still find it difficult to understand:

- which protocol is used first,
- which device sends the request,
- which device sends the response,
- what messages are exchanged,
- how DNS supports application communication,
- how HTTP handles web requests,
- how SMTP establishes and closes an email session,
- and how streaming applications request manifests and media segments.

NetLens addresses this problem by providing an interactive visual simulation where application activities and their corresponding protocol messages are displayed together.

---

## 3. Project Objectives

The main objectives of NetLens are:

- To visualize Application Layer protocol communication.
- To connect real-world user activities with network protocols.
- To demonstrate DNS resolution.
- To demonstrate HTTP request and response communication.
- To demonstrate SMTP email communication.
- To demonstrate media streaming communication.
- To show client-server communication visually.
- To display protocol messages sequentially.
- To provide pause, next, previous, and replay controls.
- To provide an easy-to-understand educational interface.
- To provide a practical implementation using Python, FastAPI, HTML, CSS, and JavaScript.

---

# 4. Main Features

## 4.1 Web Browsing Simulation

The Web Browsing activity demonstrates the basic sequence involved when a user accesses a website.

The simulation displays:

```text
DNS Query
     ↓
DNS Response
     ↓
HTTP GET Request
     ↓
HTTP Response
```

### DNS Query

The client asks the DNS service to resolve the domain name.

Example:

```text
DNS Query
example.com
```

### DNS Response

The DNS service returns an IP address for the requested domain.

Example:

```text
DNS Response
example.com → 93.184.216.34
```

### HTTP GET Request

After obtaining the server address, the client sends an HTTP GET request.

Example:

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html
```

### HTTP Response

The server responds with an HTTP response.

Example:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 2048
```

---

# 4.2 Email Simulation

The Email activity demonstrates an SMTP-based mail transaction.

The simulation includes an optional DNS MX lookup followed by an SMTP session.

The sequence is:

```text
DNS MX Lookup
     ↓
SMTP Service Ready (220)
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

The simulation demonstrates important SMTP commands and server responses.

### DNS MX Lookup

The client can perform a DNS MX lookup to determine the mail exchange server responsible for the recipient's domain.

Example:

```text
MX Query
example.com
```

### SMTP Service Ready

The SMTP server announces that the service is ready.

```text
220 mail.example.com Service Ready
```

### EHLO

The client identifies itself and begins the SMTP session.

```text
EHLO netlens.local
```

### EHLO Response

The server responds to the EHLO command.

```text
250-mail.example.com
250-SIZE 10485760
250-8BITMIME
250-PIPELINING
```

### MAIL FROM

The sender address is provided.

```text
MAIL FROM:<sender@example.com>
```

### Sender Accepted

The SMTP server acknowledges the sender.

```text
250 2.1.0 Sender OK
```

### RCPT TO

The recipient address is provided.

```text
RCPT TO:<receiver@example.com>
```

### Recipient Accepted

The server acknowledges the recipient.

```text
250 2.1.5 Recipient OK
```

### DATA

The client requests permission to send the message content.

```text
DATA
```

### Start Mail Input

The SMTP server indicates that the client can begin sending the message.

```text
354 Start mail input; end with <CRLF>.<CRLF>
```

### Message Body

The message headers and body are transmitted.

Example:

```text
From: sender@example.com
To: receiver@example.com
Subject: NetLens Demo

Hello,
This is a demonstration message from NetLens.
```

### Message Accepted

The server accepts the message.

```text
250 2.0.0 Message accepted for delivery
```

### QUIT

The client requests termination of the SMTP session.

```text
QUIT
```

### SMTP Session Closed

The server closes the session.

```text
221 2.0.0 Service closing transmission channel
```

---

# 4.3 Streaming Simulation

The Streaming activity demonstrates a simplified media streaming workflow.

The sequence is:

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

### DNS Query

The client resolves the streaming service domain.

### DNS Response

The DNS service returns the server address.

### Manifest Request

The client requests the media manifest or playlist.

Example:

```http
GET /stream/playlist.m3u8 HTTP/1.1
Host: media.example.com
```

### Manifest Response

The server returns information describing available media streams or segments.

Example:

```text
HTTP/1.1 200 OK
Content-Type: application/vnd.apple.mpegurl
```

### Segment Requests

The client requests individual media segments.

Example:

```http
GET /stream/segment001.ts HTTP/1.1
Host: media.example.com
```

The same process is repeated for additional segments.

---

# 5. Protocol Controls

NetLens provides interactive controls for navigating the protocol sequence.

### Previous

Moves to the previous protocol step.

### Pause / Play

Pauses or resumes the protocol visualization.

### Next

Moves forward to the next protocol step.

### Replay

Restarts the current protocol sequence from the beginning.

These controls allow students to inspect individual protocol messages instead of watching the entire sequence automatically.

---

# 6. Protocols Demonstrated

| Activity | Protocol / Mechanism | Purpose |
|---|---|---|
| Web Browsing | DNS | Domain name resolution |
| Web Browsing | HTTP | Web request and response |
| Email | DNS MX | Mail server discovery |
| Email | SMTP | Email message transfer |
| Streaming | DNS | Streaming server resolution |
| Streaming | HTTP | Manifest and media segment requests |

---

# 7. Application Architecture

NetLens uses a lightweight web application architecture.

```text
                  NETLENS
                     |
        +------------+------------+
        |                         |
   FastAPI Backend          Web Frontend
        |                         |
     Python              HTML + CSS + JavaScript
                                  |
                       +----------+----------+
                       |                     |
                Activity Console      Protocol Observatory
                       |                     |
                  User Actions       Protocol Simulation
```

---

# 8. Dual-Panel Design

The application is intentionally divided into exactly two major panels.

## Left Panel — Activity Console

The Activity Console contains:

- Activity selection tabs
- Browsing URL input
- Visit button
- Email fields
- Send button
- Streaming controls
- Network status
- Activity log

The user performs the application-level action from this panel.

## Right Panel — Protocol Observatory

The Protocol Observatory displays:

- Current protocol flow
- Current step
- Protocol name
- Latency
- Protocol timeline
- Client/server visualization
- Packet direction
- Message Inspector
- Navigation controls

This panel provides the visual representation of the underlying protocol activity.

---

# 9. Live Network Status

The interface includes a network status indicator.

The activity state can change between:

```text
IDLE
```

```text
RUNNING
```

and:

```text
COMPLETE
```

This provides visual feedback about the current simulation state.

---

# 10. Message Inspector

The Message Inspector displays the message associated with the current protocol step.

Depending on the current activity, it can display information such as:

- DNS queries
- DNS responses
- HTTP request lines
- HTTP headers
- SMTP commands
- SMTP response codes
- SMTP message content
- Streaming manifest requests
- Media segment requests

This allows students to inspect the actual structure of protocol messages.

---

# 11. Client-Server Visualization

NetLens visually represents communication between:

```text
CLIENT
   |
   | Request
   ↓
SERVER
```

or:

```text
CLIENT
   ↑
   | Response
   |
SERVER
```

The direction of the packet depends on whether the current step represents a request or response.

---

# 12. Protocol Timeline

Every simulation contains a timeline showing the current position within the protocol sequence.

For example:

```text
DNS Query
   ↓
DNS Response
   ↓
HTTP GET
   ↓
HTTP Response
```

The active step is highlighted as the simulation progresses.

---

# 13. Activity Status

The Activity Console provides status feedback.

Typical states include:

```text
IDLE
RUNNING
COMPLETE
```

When a user starts an activity, the status changes to `RUNNING`.

When the final protocol step is reached, the status changes to `COMPLETE`.

---

# 14. Technologies Used

## Backend

- Python
- FastAPI
- Uvicorn

## Frontend

- HTML5
- CSS3
- JavaScript

## Development Environment

- Visual Studio Code
- Windows
- Python virtual environment

---

# 15. Project Structure

```text
assignment/
│
├── main.py
├── requirements.txt
├── README.md
├── AI_USAGE_LOG.md
├── REFLECTION.md
│
└── static/
    ├── index.html
    ├── styles.css
    ├── app.js
    └── favicon.svg
```

---

# 16. Backend

The backend is implemented using FastAPI.

The backend:

- creates the FastAPI application,
- serves the main HTML page,
- mounts the static directory,
- provides the web application through Uvicorn.

The application uses:

```python
app = FastAPI()
```

The static files are mounted using:

```python
app.mount("/static", StaticFiles(directory="static"), name="static")
```

The main page is served using:

```python
@app.get("/")
def home():
    return FileResponse("static/index.html")
```

---

# 17. Frontend

The frontend contains three main files:

### `index.html`

Defines the structure of the application.

### `styles.css`

Controls:

- layout,
- colors,
- typography,
- panels,
- buttons,
- protocol visualization,
- timeline,
- responsive behavior,
- animations.

### `app.js`

Controls:

- activity selection,
- protocol sequences,
- protocol messages,
- step navigation,
- pause/resume,
- replay,
- status updates,
- timeline updates,
- message inspector,
- client/server animation.

---

# 18. Installation

## Step 1 — Open the Project

Open the project folder in Visual Studio Code.

Example:

```text
D:\assignment
```

---

## Step 2 — Open Terminal

In VS Code:

```text
Terminal → New Terminal
```

---

## Step 3 — Create Virtual Environment

Run:

```bash
python -m venv venv
```

---

## Step 4 — Activate Virtual Environment

On Windows:

```bash
venv\Scripts\activate
```

---

## Step 5 — Install Dependencies

Run:

```bash
pip install -r requirements.txt
```

---

# 19. Running the Project

Start the FastAPI server using:

```bash
uvicorn main:app --reload
```

The terminal should show that the server is running.

Open:

```text
http://127.0.0.1:8000
```

in a browser.

---

# 20. How the Simulation Works

The application does not capture real network packets.

Instead, it uses predefined protocol sequences representing realistic Application Layer communication.

For each activity, JavaScript stores a sequence of protocol steps.

Each step contains information such as:

- protocol name,
- message type,
- sender,
- receiver,
- message content,
- status,
- direction.

The interface displays these steps sequentially.

This approach makes the project deterministic and suitable for classroom demonstration.

---

# 21. Browsing Flow

The browsing activity follows:

```text
1. DNS Query
2. DNS Response
3. HTTP GET Request
4. HTTP Response
```

The user enters a URL and selects:

```text
Visit
```

The protocol visualization then progresses through the four steps.

---

# 22. Email Flow

The email activity follows:

```text
1. DNS MX Lookup
2. SMTP Service Ready
3. EHLO Command
4. EHLO Response
5. MAIL FROM
6. Sender Accepted
7. RCPT TO
8. Recipient Accepted
9. DATA Command
10. Start Mail Input
11. Message Body
12. Message Accepted
13. QUIT
14. SMTP Session Closed
```

This demonstrates the main stages of an SMTP transaction.

---

# 23. Streaming Flow

The streaming activity follows:

```text
1. DNS Query
2. DNS Response
3. Manifest Request
4. Manifest Response
5. Segment 001 Request
6. Segment 001 Response
7. Segment 002 Request
8. Segment 002 Response
```

The simulation represents a simplified HTTP-based streaming workflow.

---

# 24. Educational Simulation

NetLens is an educational simulator.

It does not attempt to reproduce every implementation detail of a production network.

For example:

- DNS resolution is simulated.
- HTTP communication is simulated.
- SMTP communication is simulated.
- Streaming requests are simulated.
- Latency values are representative.
- Packet animation is visual rather than captured from a real network interface.

The objective is to make protocol behavior easier to understand.

---

# 25. Design Approach

The interface follows a mission-control style design.

The design emphasizes:

- clear separation of user activity and protocol visualization,
- high visibility of the current protocol step,
- readable protocol messages,
- clear request/response direction,
- interactive controls,
- consistent visual hierarchy.

The two-panel layout helps students connect an application action with the protocol communication it generates.

---

# 26. Responsive Design

The frontend uses responsive CSS techniques so that the interface can adapt to different screen sizes.

The layout is designed primarily for desktop use because the project is intended for classroom demonstrations and desktop browser usage.

---

# 27. Limitations

The current implementation has several limitations.

### 1. Simulation Instead of Real Packet Capture

The application displays predefined protocol sequences rather than capturing packets from a real network.

### 2. Simplified DNS

The DNS process is represented at a conceptual level.

### 3. Simplified SMTP

The SMTP flow focuses on the main commands and responses required for educational visualization.

### 4. Simplified Streaming

The streaming activity demonstrates manifest and segment requests but does not implement a complete media player.

### 5. No Real Email Delivery

The email activity does not send an actual email through an SMTP server.

### 6. No Real DNS Resolution

The DNS responses shown in the visualization are simulated.

---

# 28. Future Enhancements

Possible future improvements include:

- Real DNS query integration.
- Real HTTP request monitoring.
- Packet capture using tools such as Wireshark or Scapy.
- More detailed DNS resolution stages.
- TCP connection visualization.
- TLS handshake visualization.
- HTTPS communication.
- IMAP and POP3 visualization.
- More streaming segments.
- Adaptive bitrate visualization.
- Real-time latency graphs.
- Packet statistics.
- Protocol filtering.
- Exporting simulation logs.
- Dark/light theme switching.
- Additional Application Layer protocols.

---

# 29. AI Assistance

AI tools were used during the development of NetLens as development assistance.

AI assistance was used for:

- project planning,
- UI structure,
- HTML development,
- CSS styling,
- JavaScript logic,
- protocol sequence organization,
- debugging,
- documentation,
- README preparation,
- reflection preparation.

The generated suggestions were reviewed and modified during development.

The detailed AI usage is documented in:

```text
AI_USAGE_LOG.md
```

---

# 30. Reflection

The project provided practical experience in connecting theoretical networking concepts with an interactive software implementation.

During development, particular attention was given to:

- DNS request/response behavior,
- HTTP request/response structure,
- SMTP commands and response codes,
- client-server communication,
- protocol sequencing,
- frontend state management,
- interactive visualization.

The development process also provided experience with FastAPI, JavaScript-based simulation, responsive CSS, debugging, and project documentation.

A detailed reflection is available in:

```text
REFLECTION.md
```

---

# 31. Learning Outcomes

After completing the project, the following concepts were reinforced:

- Application Layer protocols
- DNS
- HTTP
- SMTP
- Client-server architecture
- Request-response communication
- Protocol sequencing
- SMTP response codes
- Web application architecture
- FastAPI
- JavaScript event handling
- HTML/CSS interface design
- Software testing and debugging

---

# 32. Testing

The application was tested by running the FastAPI server and accessing the application through a web browser.

The following activities were tested:

### Browsing

```text
URL input
Visit
DNS Query
DNS Response
HTTP GET Request
HTTP Response
```

### Email

```text
Sender
Recipient
Subject
Message
Send
SMTP sequence
```

### Streaming

```text
Play
Pause
Quality selection
DNS
Manifest
Segments
```

The navigation controls were also tested:

```text
Previous
Pause
Next
Replay
```

---

# 33. Project Information

**Project:** NetLens — Application Layer Protocol Visualizer

**Course Area:** Computer Networks

**Application Layer Topics:**

- DNS
- HTTP
- SMTP
- Streaming over HTTP

**Backend:** FastAPI

**Frontend:** HTML, CSS, JavaScript

**Development Environment:** Visual Studio Code

---

# 34. Conclusion

NetLens provides an interactive way to study Application Layer communication.

Instead of presenting protocols only through static diagrams, the project connects user activities with sequential protocol messages.

The dual-panel architecture allows users to perform an activity on one side while observing the corresponding protocol behavior on the other side.

The project demonstrates how software development, web technologies, and computer networking concepts can be combined to create an educational visualization tool.

---

## Author

**Abhijit Nath**

Computer Science and Technology

Central Institute of Technology, Kokrajhar

---

## License

This project is intended for educational and academic use.