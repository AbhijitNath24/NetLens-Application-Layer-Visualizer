# NetLens --- Assignment 2 Reflection

## Application + Transport Layer Protocol Visualizer

### 1. AI Platform and Model

For Assignment 2, I used **OpenAI ChatGPT with GPT-5.6 Luna** as the
main AI-assisted coding tool. I selected it because it could work
iteratively with the existing Assignment 1 code, explain protocol
behavior, generate complete HTML/CSS/JavaScript replacements, and help
debug the implementation after browser testing.

The AI was used throughout the development process rather than only for
the final code. It helped interpret the assignment requirements, plan
the Application/Transport view, generate the transport flow data,
implement synchronization, debug CSS, and review TCP
sequence/acknowledgement behavior.

Evidence of the AI-assisted development is retained through the ChatGPT
conversation and screenshots of the development and testing process.

### 2. Synchronization Between Application and Transport Layers

The left Activity Console remains the driver of the simulation. The
three activities are Browsing, Mail, and Streaming. When an activity
starts, a corresponding flow is loaded into the Protocol Observatory.

Each activity has two related step sequences: - an Application-layer
sequence - a Transport-layer sequence

Transport steps are associated with the corresponding application event.
This allows the user to switch between **Application Layer** and
**Transport Layer** without changing the underlying activity.

For example, in Browsing, the Application layer shows DNS Query, DNS
Response, HTTP GET Request, and HTTP Response. The Transport view
expands those actions into UDP DNS datagrams, the TCP three-way
handshake, TCP data segments, acknowledgements, and TCP connection
teardown.

The right panel also maintains the current flow, step number, protocol,
direction, timing, timeline, and message inspector. Previous, Next,
Pause/Resume, and Replay controls allow the exchange to be examined
progressively.

### 3. TCP Sequence, ACK and State Corrections

One important part of Assignment 2 was ensuring that the generated TCP
visualization did not simply look plausible but followed consistent TCP
rules.

The simulation uses deterministic sequence numbers. A SYN consumes one
sequence number. Therefore, if the client sends a SYN with sequence
number 1000, the server's SYN-ACK acknowledges 1001. The server's SYN
uses its own sequence space, and the client's following ACK acknowledges
the server's SYN with the corresponding next expected value.

For data segments, the acknowledgement number represents the next byte
expected by the receiver. Pure ACK segments have zero payload length and
do not advance the sender's sequence number.

The AI-assisted implementation initially required review around the
distinction between application-session termination and TCP connection
termination. In particular, SMTP `QUIT` and the server's `221` response
are application-layer messages; they should not themselves be labelled
as TCP FIN states. The TCP FIN/ACK exchange occurs afterward as the
transport-layer teardown. This distinction was corrected during
iteration.

The final visualization therefore separates: - SMTP application messages
such as QUIT and 221 - TCP FIN/ACK connection teardown - the final ACK
and simulated TIME-WAIT state

This was one of the most useful corrections because it made the protocol
layering clearer.

### 4. Differences Between Browsing, Mail and Streaming

**Browsing** represents a relatively short request-response exchange.
After DNS resolution, the simulation establishes TCP, transfers an HTTP
request and response, and then tears down the connection. The flow is
comparatively compact.

**Mail** is more conversational. The TCP connection carries a sequence
of SMTP messages such as EHLO, MAIL FROM, RCPT TO, DATA, the message
body, acceptance responses, and QUIT. Consequently, its transport
visualization contains more segments and acknowledgement interactions
than the short browsing example.

**Streaming** involves repeated media delivery. In the implementation, a
TCP connection is used for the manifest and multiple media-segment
transfers. This demonstrates how an application can generate a sequence
of data transfers over the same reliable byte-stream transport. The
selected quality is also reflected in the streaming activity interface.

These three activities therefore provide different examples of the same
transport-layer concepts: short request-response traffic, a longer
conversational application protocol, and repeated media-segment
transfers.

### 5. Final Outcome

The completed NetLens Assignment 2 dashboard preserves the original
dual-panel design while extending the Protocol Observatory with a
synchronized Transport Layer view.

The final implementation was manually tested for: - Browsing - Mail -
Streaming - DNS/UDP representation - TCP handshake - TCP data transfer -
sequence and acknowledgement fields - TCP teardown - Previous/Next -
Pause/Resume - Replay - timeline and packet animation

The project demonstrates how the same user-level action can be mapped
from an application protocol such as HTTP or SMTP to the underlying
transport behavior of UDP or TCP.
