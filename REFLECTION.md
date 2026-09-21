# Project Reflection — NetLens

## Application Layer Protocol Visualizer

---

# 1. Project Overview

The NetLens project was developed as an educational Application Layer protocol visualization tool.

The main purpose of the project was to connect common user activities with the network protocols that operate behind those activities.

The application provides two major panels:

```text
Activity Console
        +
Protocol Observatory
```

The Activity Console allows the user to perform activities such as browsing, sending email, and streaming.

The Protocol Observatory then displays the corresponding protocol communication step-by-step.

---

# 2. Understanding of the Problem

Before developing the project, Application Layer protocols were mainly understood through theoretical concepts and diagrams.

The assignment provided an opportunity to represent these concepts through an interactive application.

The main challenge was to make the relationship between a user action and the underlying protocol communication easy to understand.

For example, when a user visits a website, several communication steps occur.

The project represents this simplified process as:

```text
DNS Query
↓
DNS Response
↓
HTTP GET Request
↓
HTTP Response
```

This makes the protocol sequence easier to observe than a static explanation.

---

# 3. Development Approach

The project was developed using:

```text
Python
FastAPI
HTML
CSS
JavaScript
```

The backend was kept lightweight because the main purpose of the project was protocol visualization rather than database processing.

FastAPI was used to serve the application.

The frontend was responsible for the interactive simulation.

The development process was divided into several stages:

```text
1. Understand assignment
2. Plan interface
3. Create project structure
4. Build HTML
5. Develop CSS
6. Implement JavaScript
7. Add protocol sequences
8. Add controls
9. Connect FastAPI
10. Test application
11. Debug issues
12. Prepare documentation
```

---

# 4. Interface Design

One of the most important design decisions was maintaining two major panels.

The left side represents the user's activity.

The right side represents what happens at the protocol level.

This separation makes the relationship between application activity and network communication easier to follow.

The interface also includes:

- activity tabs,
- status indicators,
- protocol timeline,
- message inspector,
- client/server visualization,
- navigation buttons,
- and a network status display.

---

# 5. Technical Learning

One of the major outcomes of this project was learning how frontend technologies can be combined with a Python backend.

I learned how FastAPI can serve an HTML application and its static resources.

I also gained practical experience with:

- HTML structure,
- CSS layouts,
- JavaScript events,
- DOM manipulation,
- application state,
- animations,
- and browser testing.

The project showed how networking concepts can be represented using software rather than only diagrams.

---

# 6. Understanding DNS

The project helped reinforce the purpose of DNS.

DNS translates a domain name into an address that can be used to communicate with the corresponding server.

In the NetLens browsing simulation:

```text
Client
  |
  | DNS Query
  ↓
DNS Service
  |
  | DNS Response
  ↓
Client
```

This helped connect the theoretical concept of domain name resolution with an application activity.

The email and streaming simulations also demonstrate DNS-related steps.

---

# 7. Understanding HTTP

The browsing activity helped reinforce the request-response model of HTTP.

The simplified sequence is:

```text
Client
  |
  | HTTP GET Request
  ↓
Web Server
  |
  | HTTP Response
  ↓
Client
```

The project also shows representative HTTP fields such as:

```text
GET
Host
Accept
Content-Type
Content-Length
```

This helped me understand that an HTTP request and response contain structured information rather than simply being a generic message.

---

# 8. Understanding SMTP

The email simulation provided practical understanding of an SMTP session.

The sequence contains commands such as:

```text
EHLO
MAIL FROM
RCPT TO
DATA
QUIT
```

and server response codes such as:

```text
220
250
354
221
```

The complete sequence helped me understand that sending an email involves a conversation between the client and mail server.

The simplified project flow is:

```text
Client
  |
  | EHLO
  ↓
SMTP Server
  |
  | 250
  ↓
Client
  |
  | MAIL FROM
  ↓
SMTP Server
```

The sequence continues until the message is accepted and the session is closed.

---

# 9. Understanding Streaming

The streaming simulation helped me understand that media delivery can involve multiple HTTP requests.

The simplified sequence is:

```text
DNS
 ↓
Manifest
 ↓
Segment 001
 ↓
Segment 002
```

Instead of representing a video as a single request, the simulation shows that media can be represented through a manifest and multiple media segments.

This helped connect streaming applications with HTTP communication.

---

# 10. Challenges Faced

Several challenges appeared during development.

## Challenge 1 — Designing the Two-Panel Interface

The interface needed to clearly separate user activity from protocol visualization.

The solution was to create:

```text
Activity Console
```

and:

```text
Protocol Observatory
```

as the two main application areas.

---

## Challenge 2 — Managing Protocol Steps

Each activity contains multiple protocol steps.

The JavaScript needed to know:

- which step is active,
- whether it is a request or response,
- what message should be displayed,
- and how the timeline should change.

This was handled using predefined protocol step structures.

---

## Challenge 3 — Request and Response Visualization

Requests and responses need different visual directions.

The application therefore classifies protocol steps into request and response types and updates the client/server visualization accordingly.

---

## Challenge 4 — Interactive Controls

The controls needed to work consistently across all three activities.

The following controls were implemented:

```text
Previous
Pause
Next
Replay
```

Testing these controls helped identify issues with state management and step transitions.

---

## Challenge 5 — Frontend and Backend Integration

Another challenge was serving the frontend correctly through FastAPI.

The backend needed to:

- serve `index.html`,
- serve CSS,
- serve JavaScript,
- and serve the favicon.

This was implemented using FastAPI static file mounting.

---

# 11. Testing

The application was tested using a local FastAPI server.

The server was started with:

```bash
uvicorn main:app --reload
```

The application was then opened through:

```text
http://127.0.0.1:8000
```

Testing included:

### Browsing

```text
URL input
Visit button
DNS sequence
HTTP sequence
```

### Email

```text
Sender
Recipient
Subject
Message
Send button
SMTP sequence
```

### Streaming

```text
Play
Pause
Quality selection
Manifest
Segments
```

The navigation controls were also tested.

---

# 12. Use of AI

AI tools were used as development assistance.

AI helped with:

- planning,
- code organization,
- UI ideas,
- protocol sequence organization,
- debugging suggestions,
- and documentation.

However, AI output was not treated as automatically correct.

I had to understand the generated suggestions, implement them, test them, and modify them where necessary.

The detailed record of AI assistance is available in:

```text
AI_USAGE_LOG.md
```

---

# 13. Human Verification

An important part of the development process was manually testing the application.

After implementing features, I checked them in the browser.

I verified:

- activity tabs,
- buttons,
- protocol sequences,
- message display,
- timeline,
- status changes,
- pause functionality,
- next and previous controls,
- replay functionality,
- and FastAPI serving.

This helped identify and correct implementation issues.

---

# 14. What I Learned

The project provided learning in both networking and software development.

### Networking Learning

I improved my understanding of:

- DNS
- HTTP
- SMTP
- client-server communication
- request-response communication
- protocol messages
- protocol response codes
- streaming workflows

### Programming Learning

I gained practical experience with:

- Python
- FastAPI
- JavaScript
- DOM manipulation
- event handling
- CSS layouts
- frontend state management

### Project Development Learning

I also learned about:

- debugging,
- testing,
- documentation,
- project organization,
- and presenting technical concepts visually.

---

# 15. Improvements Made During Development

During development, several improvements were made to make the application easier to use.

These included:

- adding activity tabs,
- adding protocol navigation controls,
- adding status indicators,
- adding a message inspector,
- adding client/server visualization,
- adding a timeline,
- adding request/response status,
- adding replay functionality,
- and improving the overall interface layout.

These improvements helped make the project more interactive than a simple static protocol diagram.

---

# 16. Limitations

The current project is a simulation.

It does not capture actual packets from a network interface.

Therefore:

- DNS responses are simulated.
- HTTP requests are simulated.
- SMTP communication is simulated.
- Streaming requests are simulated.
- latency values are representative,
- and packet animation is visual.

The project focuses on understanding protocol sequences rather than implementing a complete network monitoring system.

---

# 17. Future Improvements

If the project were developed further, I would consider adding:

### Real Packet Capture

Integration with packet capture tools could allow real network packets to be visualized.

### TCP Visualization

The application could show TCP connection establishment before Application Layer communication.

### TLS Visualization

HTTPS communication could be expanded to include a simplified TLS handshake.

### More Detailed DNS

The visualization could include:

```text
Client
↓
Local DNS Resolver
↓
Root DNS
↓
TLD DNS
↓
Authoritative DNS
```

### Advanced Streaming

The streaming module could show:

- multiple media qualities,
- adaptive bitrate changes,
- buffer status,
- more segments,
- and playback progress.

### Additional Protocols

Other Application Layer protocols could be added, such as:

- FTP
- DHCP
- IMAP
- POP3
- SSH

---

# 18. Overall Reflection

The NetLens project helped me understand that networking concepts can be represented through interactive software.

Previously, protocol sequences could seem abstract when presented only through theoretical diagrams.

By implementing the sequences myself, I had to think about:

- what happens first,
- what happens next,
- who sends each message,
- who receives it,
- what the message contains,
- and how the sequence ends.

The project therefore connected theoretical Computer Networks concepts with practical programming.

The development process also taught me that creating an interactive application requires more than writing code. Testing, debugging, interface design, documentation, and verification are equally important.

---

# 19. Final Project Status

The final NetLens application contains:

```text
✓ Dual-panel interface
✓ Web browsing simulation
✓ Email simulation
✓ Streaming simulation
✓ DNS visualization
✓ HTTP visualization
✓ SMTP visualization
✓ Protocol timeline
✓ Message inspector
✓ Client/server visualization
✓ Previous control
✓ Next control
✓ Pause control
✓ Replay control
✓ Activity status
✓ FastAPI backend
✓ HTML/CSS/JavaScript frontend
✓ Project documentation
✓ AI usage documentation
```

---

# 20. Conclusion

Overall, this project was a useful practical exercise in both Computer Networks and web application development.

The project allowed me to take Application Layer concepts such as DNS, HTTP, SMTP, and streaming and represent them through an interactive interface.

The use of AI assisted the development process, but understanding, testing, modifying, and verifying the implementation were important parts of completing the project.

The final result is an educational protocol visualization tool that demonstrates how application-level activities can be mapped to network communication sequences.

---

## Student

**Abhijit Nath**

Computer Science and Technology

Central Institute of Technology, Kokrajhar