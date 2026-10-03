# NetLens --- Application + Transport Layer Protocol Visualizer

## Assignment 2

NetLens is a dual-panel educational network simulator extended from
Assignment 1. It lets a user initiate three application
activities---Browsing, Mail, and Streaming---and observe the
corresponding Application-layer and Transport-layer protocol exchanges.

The project is a **simulation** for learning purposes; it does not
create real TCP/UDP network connections.

## Features

### Left --- Activity Console

-   **Browsing:** URL input + Visit Page
-   **Mail:** To, Subject, Message + Send Message
-   **Streaming:** Play/Pause + quality selector
-   Activity log and status updates

### Right --- Protocol Observatory

Two synchronized views: - **Application Layer** - **Transport Layer**

Transport visualization includes: - DNS/UDP datagrams where applicable -
TCP 3-way handshake - SYN, SYN-ACK, ACK, PSH/ACK and FIN/ACK messages -
Sequence numbers - Acknowledgement numbers - Window size - Flags -
Segment length - Client/server direction - TCP state - Timeline and
simulated timing - Progressive packet animation - Previous / Next /
Pause / Resume / Replay

## Activities

### Browsing

Application flow: 1. DNS Query 2. DNS Response 3. HTTP GET Request 4.
HTTP Response

Transport flow demonstrates DNS over UDP followed by a TCP lifecycle: -
SYN - SYN-ACK - ACK - HTTP request data - ACK - HTTP response data -
ACK - FIN/ACK teardown

### Mail

Application flow models an SMTP conversation including: - DNS MX
lookup - SMTP service ready - EHLO - MAIL FROM - RCPT TO - DATA -
Message body - Message accepted - QUIT - 221 response

The SMTP exchange is carried over a simulated TCP connection followed by
TCP teardown.

### Streaming

The streaming activity models: - DNS lookup - TCP handshake - Manifest
request/response - Multiple media segment requests/responses - TCP
teardown

The selected streaming quality is displayed in the activity interface.

## Technology Stack

-   Python
-   FastAPI
-   Uvicorn
-   HTML5
-   CSS3
-   JavaScript

## Project Structure

``` text
NetLens/
├── main.py
├── requirements.txt
├── README.md
├── AI_USAGE_LOG.md
├── REFLECTION.md
└── static/
    ├── index.html
    ├── styles.css
    ├── app.js
    └── favicon.svg
```

## Requirements

-   Python 3.10+ recommended
-   A modern web browser
-   FastAPI
-   Uvicorn

## Installation

Open a terminal in the project folder:

``` bash
cd D:\assignment
```

Create and activate a virtual environment if desired:

``` bash
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

## Run

Start the FastAPI development server:

``` bash
uvicorn main:app --reload
```

Open:

``` text
http://127.0.0.1:8000
```

## How to Demonstrate

### Browsing

1.  Select **Browse**.
2.  Enter a URL.
3.  Click **Visit Page**.
4.  Observe the Application Layer.
5.  Select **Transport Layer**.
6.  Step through the DNS, TCP handshake, HTTP data transfer, and
    teardown.

### Mail

1.  Select **Mail**.
2.  Enter recipient, subject, and message.
3.  Click **Send Message**.
4.  Switch to Transport Layer.
5.  Step through the TCP connection carrying the SMTP conversation.

### Streaming

1.  Select **Stream**.
2.  Select a quality.
3.  Click **Play**.
4.  Observe manifest and segment transfers.
5.  Switch to Transport Layer and inspect the TCP exchange.

## Important Implementation Note

NetLens uses deterministic simulated packet values so the educational
visualization can clearly demonstrate TCP behavior. The sequence and
acknowledgement numbers are generated as a consistent byte-stream model
rather than representing a real network capture.

## AI-Assisted Development

The project was substantially developed and debugged with **OpenAI
ChatGPT (GPT-5.6 Luna)**. AI assistance was used for architecture,
JavaScript flow generation, TCP sequence/ACK logic, synchronization, CSS
debugging, testing guidance, and documentation.

See `AI_USAGE_LOG.md` for the development record and `REFLECTION.md` for
the required reflection.

## Assignment 2 Scope

The implementation follows the assignment requirements for: - dual-panel
layout - synchronized Application/Transport views - Browsing, Mail and
Streaming activities - TCP handshake/data/teardown visualization - UDP
DNS representation - Seq/Ack/Win/Flags/Length fields - direction and
timing indicators - pause, previous, next and replay controls -
AI-assisted development evidence
