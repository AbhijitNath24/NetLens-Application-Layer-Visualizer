// ============================================================
// NETLENS ASSIGNMENT 2
// APPLICATION + TRANSPORT LAYER PROTOCOL VISUALIZER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // DOM ELEMENTS
    // ========================================================

    const browseTab = document.getElementById("browseTab");
    const mailTab = document.getElementById("mailTab");
    const streamTab = document.getElementById("streamTab");

    const browseActivity = document.getElementById("browseActivity");
    const mailActivity = document.getElementById("mailActivity");
    const streamActivity = document.getElementById("streamActivity");

    const urlInput = document.getElementById("urlInput");
    const visitButton = document.getElementById("visitButton");

    const mailTo = document.getElementById("mailTo");
    const mailSubject = document.getElementById("mailSubject");
    const mailBody = document.getElementById("mailBody");
    const sendMailButton = document.getElementById("sendMailButton");

    const quality = document.getElementById("quality");
    const playStreamButton = document.getElementById("playStreamButton");
    const pauseStreamButton = document.getElementById("pauseStreamButton");
    const streamTime = document.getElementById("streamTime");

    const activityLog = document.getElementById("activityLog");
    const eventCount = document.getElementById("eventCount");

    const applicationViewButton =
        document.getElementById("applicationViewButton");

    const transportViewButton =
        document.getElementById("transportViewButton");

    const viewModeLabel =
        document.getElementById("viewModeLabel");

    const liveNetworkStatus =
        document.getElementById("liveNetworkStatus");

    const liveStatusText =
        document.getElementById("liveStatusText");

    const liveStatusProtocol =
        document.getElementById("liveStatusProtocol");

    const liveStatusMessage =
        document.getElementById("liveStatusMessage");

    const currentFlow =
        document.getElementById("currentFlow");

    const currentStep =
        document.getElementById("currentStep");

    const currentProtocol =
        document.getElementById("currentProtocol");

    const latency =
        document.getElementById("latency");

    const timelineProgress =
        document.getElementById("timelineProgress");

    const timelinePoints =
        document.getElementById("timelinePoints");

    const packetArrow =
        document.getElementById("packetArrow");

    const serverName =
        document.getElementById("serverName");

    const messageDirection =
        document.getElementById("messageDirection");

    const messageCard =
        document.getElementById("messageCard");

    const previousButton =
        document.getElementById("previousButton");

    const pauseButton =
        document.getElementById("pauseButton");

    const nextButton =
        document.getElementById("nextButton");

    const replayButton =
        document.getElementById("replayButton");

    const activityStatus =
        document.querySelector(".activity-status");

    const protocolLiveStatus =
        document.querySelector(".protocol-panel .live-status");


    // ========================================================
    // APPLICATION STATE
    // ========================================================

    let activeFlow = null;

    let activeActivity = "browse";

    let viewMode = "application";

    let currentIndex = -1;

    let isPaused = false;

    let autoTimer = null;

    let totalEvents = 0;

    let streamSeconds = 0;

    let streamTimer = null;


    // ========================================================
    // UTILITY FUNCTIONS
    // ========================================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function getTime() {

        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    }


    function stopAutoTimer() {

        if (autoTimer) {

            clearInterval(autoTimer);

            autoTimer = null;
        }

    }


    function stopStreamTimer() {

        if (streamTimer) {

            clearInterval(streamTimer);

            streamTimer = null;
        }

    }


    function getCurrentSteps() {

        if (!activeFlow) {
            return [];
        }

        return viewMode === "application"
            ? activeFlow.applicationSteps
            : activeFlow.transportSteps;

    }


    function getCurrentStep() {

        const steps = getCurrentSteps();

        if (
            currentIndex < 0 ||
            currentIndex >= steps.length
        ) {
            return null;
        }

        return steps[currentIndex];

    }


    // ========================================================
    // TCP STEP BUILDER
    // ========================================================

    function tcpStep({
        appIndex,
        title,
        description,
        direction,
        state,
        seq,
        ack,
        win = 64240,
        flags,
        length = 0,
        source,
        destination,
        latency = "12 ms",
        kind = "tcp",
        protocol = "TCP"
    }) {

        return {

            appIndex,

            protocol,

            kind,

            type:
                direction.startsWith("Client")
                    ? "request"
                    : "response",

            title,

            description,

            direction,

            latency,

            transport: {

                source:
                    source ||
                    (
                        direction.startsWith("Client")
                            ? "Client"
                            : "Server"
                    ),

                destination:
                    destination ||
                    (
                        direction.startsWith("Client")
                            ? "Server"
                            : "Client"
                    ),

                seq,

                ack,

                win,

                flags,

                length,

                state

            }

        };

    }


    // ========================================================
    // UDP STEP BUILDER
    // ========================================================

    function udpStep({
        appIndex,
        title,
        description,
        direction,
        length = 42,
        sourcePort = 53000,
        destinationPort = 53,
        latency = "8 ms"
    }) {

        return {

            appIndex,

            protocol: "UDP",

            kind: "udp",

            type:
                direction.startsWith("Client")
                    ? "request"
                    : "response",

            title,

            description,

            direction,

            latency,

            transport: {

                source:
                    direction.startsWith("Client")
                        ? "Client"
                        : "DNS Server",

                destination:
                    direction.startsWith("Client")
                        ? "DNS Server"
                        : "Client",

                seq: "N/A",

                ack: "N/A",

                win: "N/A",

                flags: "N/A",

                length,

                state: "Connectionless",

                sourcePort,

                destinationPort

            }

        };

    }


    // ========================================================
    // APPLICATION FLOWS
    // ========================================================

    const flows = {

        // ====================================================
        // BROWSING
        // ====================================================

        browse: {

            name: "Web Browsing",

            protocol: "DNS + HTTP + TCP",

            server: "example.com",

            applicationSteps: [

                {
                    protocol: "DNS",

                    type: "request",

                    title: "DNS Query",

                    direction: "Client → DNS Server",

                    latency: "8 ms",

                    description:
                        "The client asks the DNS resolver for the IP address of the requested website.",

                    fields: {

                        Query: "example.com",

                        Type: "A",

                        Transport: "UDP / 53",

                        Purpose: "Name resolution"

                    }

                },

                {
                    protocol: "DNS",

                    type: "response",

                    title: "DNS Response",

                    direction: "DNS Server → Client",

                    latency: "11 ms",

                    description:
                        "The DNS resolver returns the IPv4 address associated with the requested domain.",

                    fields: {

                        Answer: "93.184.216.34",

                        Record: "A",

                        TTL: "300 seconds",

                        Status: "NOERROR"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "request",

                    title: "HTTP GET Request",

                    direction: "Client → Web Server",

                    latency: "22 ms",

                    description:
                        "The browser sends an HTTP GET request after DNS resolution.",

                    fields: {

                        Method: "GET",

                        Path: "/",

                        Host: "example.com",

                        Version: "HTTP/1.1"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "response",

                    title: "HTTP Response",

                    direction: "Web Server → Client",

                    latency: "31 ms",

                    description:
                        "The web server responds with the requested resource.",

                    fields: {

                        Status: "200 OK",

                        Content: "text/html",

                        Connection: "keep-alive",

                        Body: "HTML document"

                    }

                }

            ],

            transportSteps: [

                udpStep({

                    appIndex: 0,

                    title: "DNS Query",

                    description:
                        "DNS lookup is represented using UDP because DNS normally uses UDP for standard queries.",

                    direction: "Client → Server",

                    length: 42

                }),

                udpStep({

                    appIndex: 1,

                    title: "DNS Response",

                    description:
                        "The DNS resolver returns the requested IP address over UDP.",

                    direction: "Server → Client",

                    length: 58

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP SYN",

                    description:
                        "The client starts a TCP connection by sending SYN.",

                    direction: "Client → Server",

                    state: "SYN-SENT",

                    seq: 1000,

                    ack: 0,

                    flags: "SYN",

                    length: 0,

                    latency: "9 ms"

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP SYN-ACK",

                    description:
                        "The server acknowledges the SYN and sends its own synchronization sequence number.",

                    direction: "Server → Client",

                    state: "SYN-RECEIVED",

                    seq: 5000,

                    ack: 1001,

                    flags: "SYN, ACK",

                    length: 0,

                    latency: "11 ms"

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP ACK",

                    description:
                        "The client acknowledges the server SYN. The TCP connection is now established.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 1001,

                    ack: 5001,

                    flags: "ACK",

                    length: 0,

                    latency: "7 ms"

                }),

                tcpStep({

                    appIndex: 2,

                    title: "HTTP GET Segment",

                    description:
                        "The HTTP request is carried inside an established TCP connection.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 1001,

                    ack: 5001,

                    flags: "PSH, ACK",

                    length: 47,

                    latency: "18 ms"

                }),

                tcpStep({

                    appIndex: 2,

                    title: "HTTP Request ACK",

                    description:
                        "The server acknowledges receipt of the HTTP request bytes.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 5001,

                    ack: 1048,

                    flags: "ACK",

                    length: 0,

                    latency: "8 ms"

                }),

                tcpStep({

                    appIndex: 3,

                    title: "HTTP Response Segment",

                    description:
                        "The HTTP response is transported from the web server to the browser.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 5001,

                    ack: 1048,

                    flags: "PSH, ACK",

                    length: 72,

                    latency: "24 ms"

                }),

                tcpStep({

                    appIndex: 3,

                    title: "HTTP Response ACK",

                    description:
                        "The client acknowledges the response data.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 1048,

                    ack: 5073,

                    flags: "ACK",

                    length: 0,

                    latency: "8 ms"

                }),

                tcpStep({

                    appIndex: 3,

                    title: "FIN-ACK",

                    description:
                        "The client begins TCP connection teardown.",

                    direction: "Client → Server",

                    state: "FIN-WAIT-1",

                    seq: 1048,

                    ack: 5073,

                    flags: "FIN, ACK",

                    length: 0,

                    latency: "9 ms"

                }),

                tcpStep({

                    appIndex: 3,

                    title: "FIN-ACK Response",

                    description:
                        "The server acknowledges the client FIN and sends its own FIN.",

                    direction: "Server → Client",

                    state: "LAST-ACK",

                    seq: 5073,

                    ack: 1049,

                    flags: "FIN, ACK",

                    length: 0,

                    latency: "10 ms"

                }),

                tcpStep({

                    appIndex: 3,

                    title: "Final ACK",

                    description:
                        "The client acknowledges the server FIN and enters TIME-WAIT.",

                    direction: "Client → Server",

                    state: "TIME-WAIT",

                    seq: 1049,

                    ack: 5074,

                    flags: "ACK",

                    length: 0,

                    latency: "7 ms"

                })

            ]

        },


        // ====================================================
        // MAIL
        // ====================================================

        mail: {

            name: "Email Delivery",

            protocol: "DNS + SMTP + TCP",

            server: "mail.example.com",

            applicationSteps: [

                {
                    protocol: "DNS",

                    type: "request",

                    title: "DNS MX Lookup",

                    direction: "Client → DNS Server",

                    latency: "8 ms",

                    description:
                        "The client resolves the recipient domain's mail exchanger.",

                    fields: {

                        Query: "example.com",

                        Type: "MX",

                        Transport: "UDP / 53",

                        Purpose: "Mail server discovery"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "SMTP Service Ready",

                    direction: "Mail Server → Client",

                    latency: "21 ms",

                    description:
                        "The SMTP server announces that its mail service is ready.",

                    fields: {

                        Code: "220",

                        Service: "ESMTP",

                        Server: "mail.example.com",

                        State: "Ready"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "EHLO",

                    direction: "Client → Mail Server",

                    latency: "10 ms",

                    description:
                        "The sender identifies itself using the Extended HELO command.",

                    fields: {

                        Command: "EHLO",

                        Client: "netlens.local",

                        Protocol: "SMTP",

                        Purpose: "Capability negotiation"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "EHLO Response",

                    direction: "Mail Server → Client",

                    latency: "12 ms",

                    description:
                        "The server advertises supported SMTP capabilities.",

                    fields: {

                        Code: "250",

                        Capability: "PIPELINING",

                        Capability2: "8BITMIME",

                        State: "Ready"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "MAIL FROM",

                    direction: "Client → Mail Server",

                    latency: "10 ms",

                    description:
                        "The client identifies the sender address.",

                    fields: {

                        Command: "MAIL FROM",

                        Sender: "sender@example.com",

                        Envelope: "From",

                        Protocol: "SMTP"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "Sender Accepted",

                    direction: "Mail Server → Client",

                    latency: "9 ms",

                    description:
                        "The SMTP server accepts the sender envelope.",

                    fields: {

                        Code: "250",

                        Status: "Sender OK",

                        Envelope: "Accepted",

                        State: "SMTP transaction"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "RCPT TO",

                    direction: "Client → Mail Server",

                    latency: "10 ms",

                    description:
                        "The client specifies the recipient address.",

                    fields: {

                        Command: "RCPT TO",

                        Recipient: "receiver@example.com",

                        Envelope: "To",

                        Protocol: "SMTP"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "Recipient Accepted",

                    direction: "Mail Server → Client",

                    latency: "9 ms",

                    description:
                        "The server confirms that the recipient is accepted.",

                    fields: {

                        Code: "250",

                        Status: "Recipient OK",

                        Queue: "Ready",

                        State: "SMTP transaction"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "DATA",

                    direction: "Client → Mail Server",

                    latency: "11 ms",

                    description:
                        "The sender requests permission to transmit the email contents.",

                    fields: {

                        Command: "DATA",

                        Subject: "User supplied subject",

                        Body: "Message content",

                        Protocol: "SMTP"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "Start Mail Input",

                    direction: "Mail Server → Client",

                    latency: "9 ms",

                    description:
                        "The server responds with 354 and begins mail input mode.",

                    fields: {

                        Code: "354",

                        Status: "Start mail input",

                        Terminator: ".",

                        State: "DATA mode"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "Message Body",

                    direction: "Client → Mail Server",

                    latency: "15 ms",

                    description:
                        "The actual email headers and body are transmitted.",

                    fields: {

                        Subject: "User supplied subject",

                        Body: "User supplied message",

                        Terminator: ".",

                        Transport: "TCP"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "Message Accepted",

                    direction: "Mail Server → Client",

                    latency: "14 ms",

                    description:
                        "The SMTP server accepts the message for delivery.",

                    fields: {

                        Code: "250",

                        Status: "Message accepted",

                        Queue: "Assigned",

                        Result: "Success"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "request",

                    title: "QUIT",

                    direction: "Client → Mail Server",

                    latency: "8 ms",

                    description:
                        "The SMTP client requests termination of the SMTP session.",

                    fields: {

                        Command: "QUIT",

                        Protocol: "SMTP",

                        Purpose: "Session termination",

                        State: "Closing"

                    }

                },

                {
                    protocol: "SMTP",

                    type: "response",

                    title: "SMTP Session Closed",

                    direction: "Mail Server → Client",

                    latency: "8 ms",

                    description:
                        "The SMTP server confirms that the application session is closed.",

                    fields: {

                        Code: "221",

                        Status: "Service closing",

                        Protocol: "SMTP",

                        Result: "Closed"

                    }

                }

            ],

            transportSteps: [

                udpStep({

                    appIndex: 0,

                    title: "DNS MX Query",

                    description:
                        "The sender discovers the recipient domain's mail server.",

                    direction: "Client → Server",

                    length: 46

                }),

                udpStep({

                    appIndex: 0,

                    title: "DNS MX Response",

                    description:
                        "The resolver returns the MX record.",

                    direction: "Server → Client",

                    length: 74

                }),

                tcpStep({

                    appIndex: 1,

                    title: "TCP SYN",

                    description:
                        "The mail client begins the TCP connection to the SMTP server.",

                    direction: "Client → Server",

                    state: "SYN-SENT",

                    seq: 2000,

                    ack: 0,

                    flags: "SYN",

                    length: 0

                }),

                tcpStep({

                    appIndex: 1,

                    title: "TCP SYN-ACK",

                    description:
                        "The SMTP server acknowledges the connection request.",

                    direction: "Server → Client",

                    state: "SYN-RECEIVED",

                    seq: 7000,

                    ack: 2001,

                    flags: "SYN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 1,

                    title: "TCP ACK",

                    description:
                        "The client completes the TCP three-way handshake.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2001,

                    ack: 7001,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 1,

                    title: "SMTP 220",

                    description:
                        "The server sends the SMTP service-ready banner over TCP.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7001,

                    ack: 2001,

                    flags: "PSH, ACK",

                    length: 34

                }),

                tcpStep({

                    appIndex: 2,

                    title: "EHLO Segment",

                    description:
                        "The client sends EHLO inside a TCP data segment.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2001,

                    ack: 7035,

                    flags: "PSH, ACK",

                    length: 21

                }),

                tcpStep({

                    appIndex: 2,

                    title: "EHLO ACK",

                    description:
                        "The server acknowledges the EHLO bytes.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7035,

                    ack: 2022,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 3,

                    title: "EHLO Response",

                    description:
                        "The server returns its SMTP capabilities.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7035,

                    ack: 2022,

                    flags: "PSH, ACK",

                    length: 58

                }),

                tcpStep({

                    appIndex: 4,

                    title: "MAIL FROM Segment",

                    description:
                        "The sender address is transported through TCP.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2022,

                    ack: 7093,

                    flags: "PSH, ACK",

                    length: 31

                }),

                tcpStep({

                    appIndex: 5,

                    title: "MAIL FROM ACK",

                    description:
                        "The server acknowledges the sender command.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7093,

                    ack: 2053,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 5,

                    title: "Sender Accepted",

                    description:
                        "The server returns a 250 response.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7093,

                    ack: 2053,

                    flags: "PSH, ACK",

                    length: 24

                }),

                tcpStep({

                    appIndex: 6,

                    title: "RCPT TO Segment",

                    description:
                        "The recipient address is transmitted.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2053,

                    ack: 7117,

                    flags: "PSH, ACK",

                    length: 32

                }),

                tcpStep({

                    appIndex: 7,

                    title: "Recipient Accepted",

                    description:
                        "The server acknowledges the recipient.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7117,

                    ack: 2085,

                    flags: "PSH, ACK",

                    length: 24

                }),

                tcpStep({

                    appIndex: 8,

                    title: "DATA Segment",

                    description:
                        "The client requests SMTP DATA mode.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2085,

                    ack: 7141,

                    flags: "PSH, ACK",

                    length: 7

                }),

                tcpStep({

                    appIndex: 9,

                    title: "354 Response",

                    description:
                        "The server grants permission to transmit the message body.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7141,

                    ack: 2092,

                    flags: "PSH, ACK",

                    length: 30

                }),

                tcpStep({

                    appIndex: 10,

                    title: "Message Body",

                    description:
                        "The email body is transported as TCP payload.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2092,

                    ack: 7171,

                    flags: "PSH, ACK",

                    length: 96

                }),

                tcpStep({

                    appIndex: 11,

                    title: "Message Accepted",

                    description:
                        "The server confirms acceptance of the email.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7171,

                    ack: 2188,

                    flags: "PSH, ACK",

                    length: 30

                }),

                tcpStep({

                    appIndex: 12,

                    title: "QUIT Segment",

                    description:
                        "The client sends QUIT to close the SMTP application session.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 2188,

                    ack: 7201,

                    flags: "PSH, ACK",

                    length: 6

                }),

                tcpStep({

                    appIndex: 13,

                    title: "221 Response",

                    description:
                        "The server confirms SMTP application-session termination before TCP teardown.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 7201,

                    ack: 2194,

                    flags: "PSH, ACK",

                    length: 24

                }),

                tcpStep({

                    appIndex: 13,

                    title: "FIN-ACK",

                    description:
                        "The client closes its TCP side.",

                    direction: "Client → Server",

                    state: "FIN-WAIT-1",

                    seq: 2194,

                    ack: 7225,

                    flags: "FIN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 14,

                    title: "FIN-ACK Response",

                    description:
                        "The SMTP server acknowledges and closes its side.",

                    direction: "Server → Client",

                    state: "LAST-ACK",

                    seq: 7225,

                    ack: 2195,

                    flags: "FIN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 14,

                    title: "Final ACK",

                    description:
                        "The client acknowledges the final FIN.",

                    direction: "Client → Server",

                    state: "TIME-WAIT",

                    seq: 2195,

                    ack: 7226,

                    flags: "ACK",

                    length: 0

                })

            ]

        },


        // ====================================================
        // STREAMING
        // ====================================================

        stream: {

            name: "Video Streaming",

            protocol: "DNS + HTTP + TCP",

            server: "video.example.com",

            applicationSteps: [

                {
                    protocol: "DNS",

                    type: "request",

                    title: "DNS Query",

                    direction: "Client → DNS Server",

                    latency: "8 ms",

                    description:
                        "The streaming client resolves the media server.",

                    fields: {

                        Query: "video.example.com",

                        Type: "A",

                        Transport: "UDP / 53",

                        Purpose: "Server discovery"

                    }

                },

                {
                    protocol: "DNS",

                    type: "response",

                    title: "DNS Response",

                    direction: "DNS Server → Client",

                    latency: "10 ms",

                    description:
                        "The DNS server returns the media server address.",

                    fields: {

                        Answer: "203.0.113.20",

                        Record: "A",

                        TTL: "300 seconds",

                        Status: "NOERROR"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "request",

                    title: "Manifest Request",

                    direction: "Client → Media Server",

                    latency: "19 ms",

                    description:
                        "The player requests the media manifest.",

                    fields: {

                        Method: "GET",

                        Path: "/video/manifest.m3u8",

                        Quality: "Selected quality",

                        Protocol: "HTTP"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "response",

                    title: "Manifest Response",

                    direction: "Media Server → Client",

                    latency: "23 ms",

                    description:
                        "The media server returns the available stream information.",

                    fields: {

                        Status: "200 OK",

                        Format: "HLS Manifest",

                        Segments: "001, 002",

                        Protocol: "HTTP"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "request",

                    title: "Segment 001 Request",

                    direction: "Client → Media Server",

                    latency: "20 ms",

                    description:
                        "The player requests the first media segment.",

                    fields: {

                        Method: "GET",

                        Segment: "001",

                        Quality: "Selected",

                        Buffer: "Active"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "response",

                    title: "Segment 001 Response",

                    direction: "Media Server → Client",

                    latency: "27 ms",

                    description:
                        "The first media segment is delivered to the player.",

                    fields: {

                        Status: "200 OK",

                        Segment: "001",

                        Payload: "Media bytes",

                        Buffer: "Increasing"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "request",

                    title: "Segment 002 Request",

                    direction: "Client → Media Server",

                    latency: "20 ms",

                    description:
                        "The player requests the next media segment.",

                    fields: {

                        Method: "GET",

                        Segment: "002",

                        Quality: "Selected",

                        Buffer: "Active"

                    }

                },

                {
                    protocol: "HTTP",

                    type: "response",

                    title: "Segment 002 Response",

                    direction: "Media Server → Client",

                    latency: "29 ms",

                    description:
                        "The second media segment is delivered.",

                    fields: {

                        Status: "200 OK",

                        Segment: "002",

                        Payload: "Media bytes",

                        Buffer: "Increasing"

                    }

                }

            ],

            transportSteps: [

                udpStep({

                    appIndex: 0,

                    title: "DNS Query",

                    description:
                        "The player resolves the streaming server using DNS.",

                    direction: "Client → Server",

                    length: 48

                }),

                udpStep({

                    appIndex: 1,

                    title: "DNS Response",

                    description:
                        "The streaming server IP address is returned.",

                    direction: "Server → Client",

                    length: 62

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP SYN",

                    description:
                        "The player opens a TCP connection to the media server.",

                    direction: "Client → Server",

                    state: "SYN-SENT",

                    seq: 3000,

                    ack: 0,

                    flags: "SYN",

                    length: 0

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP SYN-ACK",

                    description:
                        "The media server acknowledges the connection request.",

                    direction: "Server → Client",

                    state: "SYN-RECEIVED",

                    seq: 9000,

                    ack: 3001,

                    flags: "SYN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 2,

                    title: "TCP ACK",

                    description:
                        "The player completes the TCP handshake.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3001,

                    ack: 9001,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 2,

                    title: "Manifest Request",

                    description:
                        "The HTTP manifest request is transported using TCP.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3001,

                    ack: 9001,

                    flags: "PSH, ACK",

                    length: 64

                }),

                tcpStep({

                    appIndex: 3,

                    title: "Manifest Response",

                    description:
                        "The media server sends the manifest payload.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 9001,

                    ack: 3065,

                    flags: "PSH, ACK",

                    length: 180

                }),

                tcpStep({

                    appIndex: 3,

                    title: "Manifest ACK",

                    description:
                        "The player acknowledges the manifest data.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3065,

                    ack: 9181,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 4,

                    title: "Segment 001 Request",

                    description:
                        "The player requests the first media segment.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3065,

                    ack: 9181,

                    flags: "PSH, ACK",

                    length: 54

                }),

                tcpStep({

                    appIndex: 5,

                    title: "Segment 001 Data",

                    description:
                        "The first media segment is transferred as TCP payload.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 9181,

                    ack: 3119,

                    flags: "PSH, ACK",

                    length: 1200

                }),

                tcpStep({

                    appIndex: 5,

                    title: "Segment 001 ACK",

                    description:
                        "The player acknowledges the first media segment.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3119,

                    ack: 10381,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 6,

                    title: "Segment 002 Request",

                    description:
                        "The player requests the next media segment.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3119,

                    ack: 10381,

                    flags: "PSH, ACK",

                    length: 54

                }),

                tcpStep({

                    appIndex: 7,

                    title: "Segment 002 Data",

                    description:
                        "The second media segment is transferred.",

                    direction: "Server → Client",

                    state: "ESTABLISHED",

                    seq: 10381,

                    ack: 3173,

                    flags: "PSH, ACK",

                    length: 1200

                }),

                tcpStep({

                    appIndex: 7,

                    title: "Segment 002 ACK",

                    description:
                        "The player acknowledges the second media segment.",

                    direction: "Client → Server",

                    state: "ESTABLISHED",

                    seq: 3173,

                    ack: 11581,

                    flags: "ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 7,

                    title: "FIN-ACK",

                    description:
                        "The simulated streaming TCP session begins teardown.",

                    direction: "Client → Server",

                    state: "FIN-WAIT-1",

                    seq: 3173,

                    ack: 11581,

                    flags: "FIN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 7,

                    title: "FIN-ACK Response",

                    description:
                        "The media server acknowledges and closes its TCP side.",

                    direction: "Server → Client",

                    state: "LAST-ACK",

                    seq: 11581,

                    ack: 3174,

                    flags: "FIN, ACK",

                    length: 0

                }),

                tcpStep({

                    appIndex: 7,

                    title: "Final ACK",

                    description:
                        "The client acknowledges the final FIN.",

                    direction: "Client → Server",

                    state: "TIME-WAIT",

                    seq: 3174,

                    ack: 11582,

                    flags: "ACK",

                    length: 0

                })

            ]

        }

    };


    // ========================================================
    // ACTIVITY TAB CONTROL
    // ========================================================

    function activateActivity(activity) {

        activeActivity = activity;

        browseTab?.classList.toggle(
            "active",
            activity === "browse"
        );

        mailTab?.classList.toggle(
            "active",
            activity === "mail"
        );

        streamTab?.classList.toggle(
            "active",
            activity === "stream"
        );

        browseActivity?.classList.toggle(
            "hidden",
            activity !== "browse"
        );

        mailActivity?.classList.toggle(
            "hidden",
            activity !== "mail"
        );

        streamActivity?.classList.toggle(
            "hidden",
            activity !== "stream"
        );

    }


    browseTab?.addEventListener(
        "click",
        () => activateActivity("browse")
    );

    mailTab?.addEventListener(
        "click",
        () => activateActivity("mail")
    );

    streamTab?.addEventListener(
        "click",
        () => activateActivity("stream")
    );


    // ========================================================
    // VIEW SWITCH
    // ========================================================

    function switchView(mode) {

        if (
            mode !== "application" &&
            mode !== "transport"
        ) {
            return;
        }

        if (!activeFlow) {

            viewMode = mode;

            updateViewButtons();

            updateViewLabel();

            return;
        }

        const oldMode = viewMode;

        const oldSteps =
            oldMode === "application"
                ? activeFlow.applicationSteps
                : activeFlow.transportSteps;

        const oldStep =
            oldSteps[currentIndex];

        let targetIndex = 0;

        if (oldStep) {

            if (mode === "transport") {

                const matchingIndex =
                    activeFlow.transportSteps.findIndex(
                        step =>
                            step.appIndex ===
                            oldStep.appIndex
                    );

                targetIndex =
                    matchingIndex >= 0
                        ? matchingIndex
                        : 0;

            } else {

                const matchingIndex =
                    activeFlow.applicationSteps.findIndex(
                        step =>
                            step ===
                            oldStep
                    );

                targetIndex =
                    matchingIndex >= 0
                        ? matchingIndex
                        : Math.min(
                            oldStep.appIndex ?? 0,
                            activeFlow.applicationSteps.length - 1
                        );
            }

        }

        viewMode = mode;

        currentIndex = targetIndex;

        updateViewButtons();

        updateViewLabel();

        renderCurrentStep();

        restartAutoProgress();

    }


    function updateViewButtons() {

        applicationViewButton?.classList.toggle(
            "active",
            viewMode === "application"
        );

        transportViewButton?.classList.toggle(
            "active",
            viewMode === "transport"
        );

    }


    function updateViewLabel() {

        if (!viewModeLabel) {
            return;
        }

        viewModeLabel.textContent =
            viewMode === "application"
                ? "APPLICATION LAYER"
                : "TRANSPORT LAYER";

    }


    applicationViewButton?.addEventListener(
        "click",
        () => switchView("application")
    );

    transportViewButton?.addEventListener(
        "click",
        () => switchView("transport")
    );


    // ========================================================
    // ACTIVITY LOG
    // ========================================================

    function clearActivityLog() {

        if (!activityLog) {
            return;
        }

        activityLog.innerHTML = "";

    }


    function addActivityLog(
        message,
        type = "request"
    ) {

        if (!activityLog) {
            return;
        }

        const empty =
            activityLog.querySelector(".empty-log");

        if (empty) {
            empty.remove();
        }

        const item =
            document.createElement("div");

        item.className =
            `activity-item log-entry ${type}`;

        item.innerHTML = `
            <div class="log-time">
                ${escapeHTML(getTime())}
            </div>

            <div class="log-message">
                ${escapeHTML(message)}
            </div>
        `;

        activityLog.prepend(item);

        totalEvents++;

        if (eventCount) {

            eventCount.textContent =
                `${totalEvents} EVENTS`;

        }

    }


    // ========================================================
    // TIMELINE
    // ========================================================

    function renderTimeline() {

        if (!timelinePoints) {
            return;
        }

        const steps =
            getCurrentSteps();

        timelinePoints.innerHTML = "";

        steps.forEach((step, index) => {

            const point =
                document.createElement("button");

            point.type = "button";

            point.className =
                "timeline-point";

            point.title =
                `${index + 1}. ${step.title}`;

            point.dataset.index = index;

            point.addEventListener(
                "click",
                () => {

                    currentIndex = index;

                    isPaused = true;

                    stopAutoTimer();

                    updatePauseButton();

                    renderCurrentStep();

                }
            );

            timelinePoints.appendChild(point);

        });

    }


    function updateTimeline() {

        const steps =
            getCurrentSteps();

        if (!steps.length) {
            return;
        }

        const percentage =
            steps.length === 1
                ? 100
                : (currentIndex /
                    (steps.length - 1)) * 100;

        if (timelineProgress) {

            timelineProgress.style.width =
                `${Math.max(0, percentage)}%`;

        }

        const points =
            timelinePoints?.querySelectorAll(
                ".timeline-point"
            );

        points?.forEach(
            (point, index) => {

                point.classList.toggle(
                    "active",
                    index === currentIndex
                );

                point.classList.toggle(
                    "completed",
                    index < currentIndex
                );

            }
        );

    }


    // ========================================================
    // MESSAGE INSPECTOR
    // ========================================================

    function renderApplicationMessage(step) {

        if (!messageCard) {
            return;
        }

        const fields =
            Object.entries(
                step.fields || {}
            );

        const fieldHTML =
            fields.map(
                ([key, value]) => `
                    <div class="message-field">
                        <span>
                            ${escapeHTML(key)}
                        </span>

                        <strong>
                            ${escapeHTML(value)}
                        </strong>
                    </div>
                `
            ).join("");

        messageCard.className =
            "message-card";

        if (step.type === "request") {

            messageCard.classList.add(
                "request-message"
            );

        } else {

            messageCard.classList.add(
                "response-message"
            );

        }

        messageCard.innerHTML = `

            <div class="message-header">

                <div>

                    <span class="message-number">
                        STEP ${currentIndex + 1}
                    </span>

                    <h3>
                        ${escapeHTML(step.title)}
                    </h3>

                </div>

                <span class="protocol-badge">
                    ${escapeHTML(step.protocol)}
                </span>

            </div>


            <div class="message-body">

                <p class="message-description">
                    ${escapeHTML(step.description)}
                </p>

                <div class="message-fields">

                    ${fieldHTML}

                </div>

            </div>

        `;

    }


    function flagClass(flag) {

        const text =
            flag.toLowerCase();

        if (text.includes("syn")) {
            return "syn";
        }

        if (text.includes("ack")) {
            return "ack";
        }

        if (text.includes("psh")) {
            return "psh";
        }

        if (text.includes("fin")) {
            return "fin";
        }

        if (text.includes("rst")) {
            return "rst";
        }

        return "";

    }


    function renderTransportMessage(step) {

        if (!messageCard) {
            return;
        }

        const t =
            step.transport || {};

        const isUDP =
            step.kind === "udp";

        const flags =
            String(t.flags || "N/A")
                .split(",")
                .map(flag => flag.trim())
                .filter(Boolean);

        const flagsHTML =
            flags.map(
                flag => `
                    <span
                        class="tcp-flag ${flagClass(flag)}">
                        ${escapeHTML(flag)}
                    </span>
                `
            ).join("");

        const transportFields = [

            ["Source", t.source || "—"],

            ["Destination", t.destination || "—"],

            ["Seq", t.seq ?? "N/A"],

            ["Ack", t.ack ?? "N/A"],

            ["Win", t.win ?? "N/A"],

            ["Flags", t.flags || "N/A"],

            ["Length", `${t.length ?? 0} B`],

            ["State", t.state || "—"]

        ];

        if (isUDP) {

            transportFields.push(
                [
                    "Source Port",
                    t.sourcePort || "—"
                ]
            );

            transportFields.push(
                [
                    "Destination Port",
                    t.destinationPort || "—"
                ]
            );

        }

        const fieldsHTML =
            transportFields.map(
                ([key, value]) => `

                    <div class="transport-field">

                        <span>
                            ${escapeHTML(key)}
                        </span>

                        <strong>
                            ${escapeHTML(value)}
                        </strong>

                    </div>

                `
            ).join("");

        let extraClass =
            "message-card transport-mode";

        if (
            String(t.flags)
                .includes("SYN")
        ) {

            extraClass +=
                " tcp-handshake";

        }

        if (
            String(t.flags)
                .includes("FIN")
        ) {

            extraClass +=
                " tcp-teardown";

        }

        messageCard.className =
            extraClass;

        messageCard.innerHTML = `

            <div class="message-header">

                <div>

                    <span class="message-number">
                        TRANSPORT ${currentIndex + 1}
                    </span>

                    <h3>
                        ${escapeHTML(step.title)}
                    </h3>

                </div>

                <span class="protocol-badge ${
                    isUDP ? "udp" : "tcp"
                }">

                    ${escapeHTML(step.protocol)}

                </span>

            </div>


            <div class="message-body">

                <p class="message-description">
                    ${escapeHTML(step.description)}
                </p>


                <div class="transport-fields">

                    ${fieldsHTML}

                </div>


                <div class="tcp-flags">

                    ${flagsHTML}

                </div>


                <div class="transport-state">

                    <span class="transport-state-label">
                        TCP STATE
                    </span>

                    <span class="transport-state-value">
                        ${escapeHTML(
                            t.state || "—"
                        )}
                    </span>

                </div>


                <div class="transport-packet-highlight">

                    <strong>
                        ${
                            isUDP
                                ? "UDP DATAGRAM"
                                : "TCP SEGMENT"
                        }
                    </strong>

                    <br>

                    ${
                        isUDP
                            ? "Connectionless transport — no sequence or acknowledgement state."
                            : "Sequence and acknowledgement values represent the simulated TCP byte stream."
                    }

                </div>


                <div class="transport-timing">

                    <span>
                        Simulated timing
                    </span>

                    <strong>
                        ${escapeHTML(
                            step.latency || "—"
                        )}
                    </strong>

                </div>

            </div>

        `;

    }


    // ========================================================
    // NETWORK WIRE
    // ========================================================

    function animatePacket(step) {

        if (!packetArrow) {
            return;
        }

        packetArrow.classList.remove(
            "packet-move"
        );

        packetArrow.classList.remove(
            "server-to-client"
        );

        void packetArrow.offsetWidth;

        const isServerToClient =
            step.direction
                ?.toLowerCase()
                .includes("server →") ||
            step.direction
                ?.toLowerCase()
                .includes("dns server →") ||
            step.direction
                ?.toLowerCase()
                .includes("web server →") ||
            step.direction
                ?.toLowerCase()
                .includes("mail server →") ||
            step.direction
                ?.toLowerCase()
                .includes("media server →");

        if (isServerToClient) {

            packetArrow.classList.add(
                "server-to-client"
            );

        }

        packetArrow.classList.add(
            "packet-move"
        );

    }


    // ========================================================
    // LIVE STATUS
    // ========================================================

    function updateLiveStatus(step) {

        if (!step) {
            return;
        }

        const isResponse =
            step.type === "response";

        if (liveNetworkStatus) {

            liveNetworkStatus.classList.toggle(
                "response-state",
                isResponse
            );

            liveNetworkStatus.classList.remove(
                "complete-state"
            );

        }

        if (liveStatusText) {

            liveStatusText.textContent =
                isResponse
                    ? "RECEIVING"
                    : "TRANSMITTING";

        }

        if (liveStatusProtocol) {

            liveStatusProtocol.textContent =
                step.protocol;

        }

        if (liveStatusMessage) {

            liveStatusMessage.textContent =
                step.title;

        }

    }


    // ========================================================
    // SUMMARY
    // ========================================================

    function updateSummary(step) {

        const steps =
            getCurrentSteps();

        if (!step) {
            return;
        }

        if (currentFlow) {

            currentFlow.textContent =
                activeFlow.name;

        }

        if (currentStep) {

            currentStep.textContent =
                `${currentIndex + 1} / ${steps.length}`;

        }

        if (currentProtocol) {

            currentProtocol.textContent =
                step.protocol;

        }

        if (latency) {

            latency.textContent =
                step.latency || "—";

        }

    }


    // ========================================================
    // SERVER NAME
    // ========================================================

    function updateServerName() {

        if (!serverName || !activeFlow) {
            return;
        }

        serverName.textContent =
            activeFlow.server;

    }


    // ========================================================
    // RENDER CURRENT STEP
    // ========================================================

    function renderCurrentStep() {

        const step =
            getCurrentStep();

        if (!step) {
            return;
        }

        updateSummary(step);

        updateLiveStatus(step);

        updateTimeline();

        animatePacket(step);

        if (viewMode === "application") {

            renderApplicationMessage(step);

        } else {

            renderTransportMessage(step);

        }

        if (messageDirection) {

            messageDirection.textContent =
                step.direction;

            messageDirection.className =
                "direction";

            if (
                step.direction
                    ?.toLowerCase()
                    .includes("client")
            ) {

                messageDirection.classList.add(
                    "transport-direction-client"
                );

            }

            if (
                step.direction
                    ?.toLowerCase()
                    .includes("server")
            ) {

                messageDirection.classList.add(
                    "transport-direction-server"
                );

            }

        }

    }


    // ========================================================
    // FLOW START
    // ========================================================

    function startFlow(
        flowName,
        options = {}
    ) {

        const flow =
            flows[flowName];

        if (!flow) {
            return;
        }

        stopAutoTimer();

        activeFlow = flow;

        currentIndex = 0;

        isPaused = false;

        viewMode =
            options.viewMode ||
            "application";

        totalEvents = 0;

        clearActivityLog();

        activateActivity(flowName);

        updateViewButtons();

        updateViewLabel();

        renderTimeline();

        updateServerName();

        if (activityStatus) {

            activityStatus.textContent =
                "RUNNING";

        }

        if (protocolLiveStatus) {

            protocolLiveStatus.innerHTML = `
                <span class="pulse-dot"></span>
                LIVE
            `;

        }

        addActivityLog(
            `${flow.name} simulation started.`,
            "success"
        );

        renderCurrentStep();

        restartAutoProgress();

    }


    // ========================================================
    // AUTO PROGRESSION
    // ========================================================

    function restartAutoProgress() {

        stopAutoTimer();

        if (!activeFlow || isPaused) {
            return;
        }

        autoTimer =
            setInterval(
                () => {

                    if (!isPaused) {

                        goNext(true);

                    }

                },
                viewMode === "transport"
                    ? 1250
                    : 1450
            );

    }


    // ========================================================
    // NEXT
    // ========================================================

    function goNext(
        automatic = false
    ) {

        const steps =
            getCurrentSteps();

        if (!steps.length) {
            return;
        }

        if (
            currentIndex <
            steps.length - 1
        ) {

            currentIndex++;

            renderCurrentStep();

            if (!automatic) {

                addActivityLog(
                    `Moved to step ${currentIndex + 1}: ${steps[currentIndex].title}`,
                    steps[currentIndex].type
                );

            }

            return;
        }

        completeFlow();

    }


    // ========================================================
    // PREVIOUS
    // ========================================================

    function goPrevious() {

        const steps =
            getCurrentSteps();

        if (!steps.length) {
            return;
        }

        if (currentIndex > 0) {

            currentIndex--;

            isPaused = true;

            stopAutoTimer();

            if (activityStatus) {
                activityStatus.textContent = "PAUSED";
            }

            updatePauseButton();

            renderCurrentStep();

            addActivityLog(
                `Moved back to step ${currentIndex + 1}: ${steps[currentIndex].title}`,
                steps[currentIndex].type
            );

        }

    }


    // ========================================================
    // PAUSE / RESUME
    // ========================================================

    function togglePause() {

        if (!activeFlow) {
            return;
        }

        isPaused =
            !isPaused;

        updatePauseButton();

        if (isPaused) {

            stopAutoTimer();

            addActivityLog(
                "Visualization paused.",
                "success"
            );

        } else {

            restartAutoProgress();

            if (
                activeActivity === "stream" &&
                !streamTimer
            ) {
                startStreamClock(false);
            }

            if (activityStatus) {
                activityStatus.textContent = "RUNNING";
            }

            addActivityLog(
                "Visualization resumed.",
                "success"
            );

        }

    }


    function updatePauseButton() {

        if (!pauseButton) {
            return;
        }

        pauseButton.textContent =
            isPaused
                ? "▶ RESUME"
                : "Ⅱ PAUSE";

    }


    // ========================================================
    // REPLAY
    // ========================================================

    function replayFlow() {

        if (!activeFlow) {
            return;
        }

        currentIndex = 0;

        isPaused = false;

        updatePauseButton();

        renderTimeline();

        renderCurrentStep();

        addActivityLog(
            "Simulation replayed from the beginning.",
            "success"
        );

        restartAutoProgress();

    }


    // ========================================================
    // COMPLETE FLOW
    // ========================================================

    function completeFlow() {

        stopAutoTimer();

        if (activeActivity === "stream") {
            stopStreamTimer();
        }

        isPaused = true;

        updatePauseButton();

        if (activityStatus) {

            activityStatus.textContent =
                "COMPLETE";

        }

        if (liveNetworkStatus) {

            liveNetworkStatus.classList.remove(
                "response-state"
            );

            liveNetworkStatus.classList.add(
                "complete-state"
            );

        }

        if (liveStatusText) {

            liveStatusText.textContent =
                "FLOW COMPLETE";

        }

        if (liveStatusMessage) {

            liveStatusMessage.textContent =
                "Protocol visualization finished";

        }

        if (protocolLiveStatus) {

            protocolLiveStatus.innerHTML = `
                <span class="pulse-dot"></span>
                COMPLETE
            `;

        }

        const panel =
            document.querySelector(
                ".protocol-panel"
            );

        panel?.classList.add(
            "flow-complete"
        );

        setTimeout(
            () => {
                panel?.classList.remove(
                    "flow-complete"
                );
            },
            900
        );

        addActivityLog(
            `${activeFlow.name} simulation completed.`,
            "success"
        );

    }


    // ========================================================
    // BROWSE BUTTON
    // ========================================================

    visitButton?.addEventListener(
        "click",
        () => {

            let url =
                urlInput?.value.trim();

            if (!url) {

                url =
                    "example.com";

                if (urlInput) {
                    urlInput.value = url;
                }

            }

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {

                url =
                    `https://${url}`;

            }

            try {

                const parsed =
                    new URL(url);

                const hostname =
                    parsed.hostname;

                flows.browse.server =
                    hostname || "example.com";

            } catch {

                flows.browse.server =
                    "example.com";

            }

            const browseHostname =
                flows.browse.server || "example.com";

            flows.browse.applicationSteps.forEach(step => {
                if (step.fields?.Query) {
                    step.fields.Query = browseHostname;
                }

                if (step.fields?.Host) {
                    step.fields.Host = browseHostname;
                }
            });

            addActivityLog(
                `Browser visit requested: ${url}`,
                "request"
            );

            startFlow("browse");

        }
    );


    // ========================================================
    // MAIL BUTTON
    // ========================================================

    sendMailButton?.addEventListener(
        "click",
        () => {

            const recipient =
                mailTo?.value.trim() ||
                "receiver@example.com";

            const subject =
                mailSubject?.value.trim() ||
                "NetLens SMTP Test";

            const body =
                mailBody?.value.trim() ||
                "Hello from NetLens.";

            addActivityLog(
                `Email queued for ${recipient}.`,
                "request"
            );

            flows.mail.applicationSteps.forEach(
                step => {

                    if (
                        step.fields?.Recipient
                    ) {

                        step.fields.Recipient =
                            recipient;

                    }

                    if (
                        step.fields?.Subject
                    ) {

                        step.fields.Subject =
                            subject;

                    }

                    if (
                        step.fields?.Body
                    ) {

                        step.fields.Body =
                            body;

                    }

                }
            );

            flows.mail.server =
                recipient.includes("@")
                    ? `mail.${recipient.split("@")[1]}`
                    : "mail.example.com";

            startFlow("mail");

        }
    );


    // ========================================================
    // STREAM START
    // ========================================================

    playStreamButton?.addEventListener(
        "click",
        () => {

            const selectedQuality =
                quality?.value ||
                "1080p";

            flows.stream.applicationSteps.forEach(
                step => {

                    if (
                        step.fields?.Quality
                    ) {

                        step.fields.Quality =
                            selectedQuality;

                    }

                }
            );

            addActivityLog(
                `Streaming started at ${selectedQuality}.`,
                "request"
            );

            startFlow("stream");

            startStreamClock();

        }
    );


    // ========================================================
    // STREAM PAUSE
    // ========================================================

    pauseStreamButton?.addEventListener(
        "click",
        () => {

            stopStreamTimer();

            isPaused = true;

            if (activityStatus) {
                activityStatus.textContent = "PAUSED";
            }

            updatePauseButton();

            addActivityLog(
                "Streaming paused.",
                "success"
            );

        }
    );


    // ========================================================
    // STREAM CLOCK
    // ========================================================

    function startStreamClock(reset = true) {

        stopStreamTimer();

        if (reset) {
            streamSeconds = 0;
        }

        updateStreamTime();

        streamTimer =
            setInterval(
                () => {

                    if (!isPaused) {

                        streamSeconds++;

                        updateStreamTime();

                    }

                },
                1000
            );

    }


    function updateStreamTime() {

        if (!streamTime) {
            return;
        }

        const minutes =
            Math.floor(
                streamSeconds / 60
            )
                .toString()
                .padStart(2, "0");

        const seconds =
            (
                streamSeconds % 60
            )
                .toString()
                .padStart(2, "0");

        streamTime.textContent =
            `${minutes}:${seconds}`;

    }


    // ========================================================
    // VISUALIZATION CONTROLS
    // ========================================================

    previousButton?.addEventListener(
        "click",
        goPrevious
    );

    nextButton?.addEventListener(
        "click",
        () => goNext(false)
    );

    pauseButton?.addEventListener(
        "click",
        togglePause
    );

    replayButton?.addEventListener(
        "click",
        replayFlow
    );


    // ========================================================
    // KEYBOARD CONTROLS
    // ========================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {
                return;
            }

            if (event.key === "ArrowRight") {

                goNext(false);

            }

            if (event.key === "ArrowLeft") {

                goPrevious();

            }

            if (event.code === "Space") {

                event.preventDefault();

                togglePause();

            }

            if (
                event.key.toLowerCase() ===
                "r"
            ) {

                replayFlow();

            }

        }
    );


    // ========================================================
    // INITIAL UI
    // ========================================================

    activateActivity("browse");

    updateViewButtons();

    updateViewLabel();

    if (eventCount) {

        eventCount.textContent =
            "0 EVENTS";

    }

    if (currentFlow) {

        currentFlow.textContent =
            "No active flow";

    }

    if (currentStep) {

        currentStep.textContent =
            "0 / 0";

    }

    if (currentProtocol) {

        currentProtocol.textContent =
            "—";

    }

    if (latency) {

        latency.textContent =
            "—";

    }

    if (viewModeLabel) {

        viewModeLabel.textContent =
            "APPLICATION LAYER";

    }


    // ========================================================
    // DEBUG MESSAGE
    // ========================================================

    console.log(
        "%cNetLens Assignment 2 loaded successfully.",
        "color:#29d6c5;font-weight:bold;"
    );

    console.log(
        "Application Layer + Transport Layer simulation ready."
    );

});