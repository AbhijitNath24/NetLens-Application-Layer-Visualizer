// ============================================================
// NETLENS - APPLICATION LAYER PROTOCOL VISUALIZER
// Part 4: Interactive Protocol Simulation
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------------
    // DOM ELEMENTS
    // --------------------------------------------------------

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

    const eventCount = document.getElementById("eventCount");
    const activityLog = document.getElementById("activityLog");

    const currentFlow = document.getElementById("currentFlow");
    const currentStep = document.getElementById("currentStep");
    const currentProtocol = document.getElementById("currentProtocol");
    const latency = document.getElementById("latency");

    const liveNetworkStatus =
    document.getElementById("liveNetworkStatus");

const liveStatusText =
    document.getElementById("liveStatusText");

const liveStatusProtocol =
    document.getElementById("liveStatusProtocol");

const liveStatusMessage =
    document.getElementById("liveStatusMessage");
    const activityStatus = document.querySelector(".activity-status");

    const timelineProgress = document.getElementById("timelineProgress");
    const timelinePoints = document.getElementById("timelinePoints");

    const packetArrow = document.getElementById("packetArrow");
    const serverName = document.getElementById("serverName");

    const messageDirection = document.getElementById("messageDirection");
    const messageCard = document.getElementById("messageCard");

    const previousButton = document.getElementById("previousButton");
    const pauseButton = document.getElementById("pauseButton");
    const nextButton = document.getElementById("nextButton");
    const replayButton = document.getElementById("replayButton");


    // --------------------------------------------------------
    // APPLICATION STATE
    // --------------------------------------------------------

    let activeFlow = null;
    let currentIndex = -1;

    let isPaused = false;
    let autoTimer = null;

    let totalEvents = 0;
    let streamSeconds = 0;
    let streamTimer = null;


    // --------------------------------------------------------
    // PROTOCOL FLOWS
    // --------------------------------------------------------

    const flows = {

        browse: {

            name: "Web Browsing",

            protocol: "DNS + HTTP",

            server: "example.com",

            steps: [

                {
                    protocol: "DNS",
                    type: "request",
                    title: "DNS Query",
                    direction: "Client → Server",
                    latency: "12 ms",

                    message: `
                        <div class="message-line">
                            <span class="key">Query</span>
                            <span>example.com</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Type</span>
                            <span>A</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Transport</span>
                            <span>UDP / 53</span>
                        </div>
                    `
                },

                {
                    protocol: "DNS",
                    type: "response",
                    title: "DNS Response",
                    direction: "Server → Client",
                    latency: "18 ms",

                    message: `
                        <div class="message-line">
                            <span class="key">Answer</span>
                            <span>93.184.216.34</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Record</span>
                            <span>A</span>
                        </div>

                        <div class="message-line">
                            <span class="key">TTL</span>
                            <span>300 seconds</span>
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "request",
                    title: "HTTP GET Request",
                    direction: "Client → Server",
                    latency: "24 ms",

                    message: `
                        <div class="message-code">
                            GET / HTTP/1.1
                            <br>
                            Host: example.com
                            <br>
                            Accept: text/html
                            <br>
                            Connection: keep-alive
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "response",
                    title: "HTTP Response",
                    direction: "Server → Client",
                    latency: "31 ms",

                    message: `
                        <div class="message-code">
                            HTTP/1.1 200 OK
                            <br>
                            Content-Type: text/html
                            <br>
                            Content-Length: 1256
                            <br>
                            Connection: keep-alive
                        </div>
                    `
                }

            ]
        },


        // ----------------------------------------------------
        // EMAIL / SMTP FLOW
        // ----------------------------------------------------

        mail: {

            name: "Email Delivery",

            protocol: "DNS + SMTP",

            server: "mail.example.com",

            steps: [

                {
                    protocol: "DNS",
                    type: "request",
                    title: "DNS MX Lookup",
                    direction: "Client → Server",
                    latency: "14 ms",

                    message: `
                        <div class="message-line">
                            <span class="key">Query</span>
                            <span>MX example.com</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Type</span>
                            <span>MX</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Purpose</span>
                            <span>Find mail server</span>
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "SMTP Service Ready",
                    direction: "Server → Client",
                    latency: "20 ms",

                    message: `
                        <div class="message-code">
                            220 mail.example.com
                            <br>
                            ESMTP Service Ready
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "EHLO Command",
                    direction: "Client → Server",
                    latency: "8 ms",

                    message: `
                        <div class="message-code">
                            EHLO client.example
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "EHLO Response",
                    direction: "Server → Client",
                    latency: "11 ms",

                    message: `
                        <div class="message-code">
                            250-mail.example.com
                            <br>
                            250-SIZE 52428800
                            <br>
                            250-STARTTLS
                            <br>
                            250 OK
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "MAIL FROM",
                    direction: "Client → Server",
                    latency: "7 ms",

                    message: `
                        <div class="message-code">
                            MAIL FROM:&lt;sender@example.com&gt;
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "Sender Accepted",
                    direction: "Server → Client",
                    latency: "9 ms",

                    message: `
                        <div class="message-code">
                            250 2.1.0
                            <br>
                            Sender OK
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "RCPT TO",
                    direction: "Client → Server",
                    latency: "8 ms",

                    message: `
                        <div class="message-code">
                            RCPT TO:&lt;${getMailRecipient()}&gt;
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "Recipient Accepted",
                    direction: "Server → Client",
                    latency: "10 ms",

                    message: `
                        <div class="message-code">
                            250 2.1.5
                            <br>
                            Recipient OK
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "DATA Command",
                    direction: "Client → Server",
                    latency: "7 ms",

                    message: `
                        <div class="message-code">
                            DATA
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "Start Mail Input",
                    direction: "Server → Client",
                    latency: "9 ms",

                    message: `
                        <div class="message-code">
                            354 Start mail input;
                            <br>
                            end with &lt;CRLF&gt;.&lt;CRLF&gt;
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "Message Body",
                    direction: "Client → Server",
                    latency: "16 ms",

                    message: `
                        <div class="message-code">
                            Subject: ${getMailSubject()}
                            <br><br>
                            ${getMailBody()}
                            <br><br>
                            .
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "Message Accepted",
                    direction: "Server → Client",
                    latency: "21 ms",

                    message: `
                        <div class="message-code">
                            250 2.0.0
                            <br>
                            Message accepted for delivery
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "request",
                    title: "QUIT",
                    direction: "Client → Server",
                    latency: "6 ms",

                    message: `
                        <div class="message-code">
                            QUIT
                        </div>
                    `
                },

                {
                    protocol: "SMTP",
                    type: "response",
                    title: "SMTP Session Closed",
                    direction: "Server → Client",
                    latency: "8 ms",

                    message: `
                        <div class="message-code">
                            221 2.0.0
                            <br>
                            Service closing transmission channel
                        </div>
                    `
                }

            ]
        },


        // ----------------------------------------------------
        // STREAMING FLOW
        // ----------------------------------------------------

        stream: {

            name: "Video Streaming",

            protocol: "DNS + HTTP",

            server: "video.netlens.local",

            steps: [

                {
                    protocol: "DNS",
                    type: "request",
                    title: "DNS Query",
                    direction: "Client → Server",
                    latency: "13 ms",

                    message: `
                        <div class="message-line">
                            <span class="key">Query</span>
                            <span>video.netlens.local</span>
                        </div>

                        <div class="message-line">
                            <span class="key">Type</span>
                            <span>A</span>
                        </div>
                    `
                },

                {
                    protocol: "DNS",
                    type: "response",
                    title: "DNS Response",
                    direction: "Server → Client",
                    latency: "17 ms",

                    message: `
                        <div class="message-line">
                            <span class="key">Address</span>
                            <span>192.0.2.25</span>
                        </div>

                        <div class="message-line">
                            <span class="key">TTL</span>
                            <span>120 seconds</span>
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "request",
                    title: "Manifest Request",
                    direction: "Client → Server",
                    latency: "19 ms",

                    message: `
                        <div class="message-code">
                            GET /video/manifest.m3u8 HTTP/1.1
                            <br>
                            Host: video.netlens.local
                            <br>
                            Accept: application/vnd.apple.mpegurl
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "response",
                    title: "Manifest Response",
                    direction: "Server → Client",
                    latency: "28 ms",

                    message: `
                        <div class="message-code">
                            HTTP/1.1 200 OK
                            <br>
                            Content-Type: application/vnd.apple.mpegurl
                            <br>
                            Quality: ${getStreamQuality()}
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "request",
                    title: "Segment 001 Request",
                    direction: "Client → Server",
                    latency: "18 ms",

                    message: `
                        <div class="message-code">
                            GET /video/seg-001.ts HTTP/1.1
                            <br>
                            Range: bytes=0-
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "response",
                    title: "Segment 001 Response",
                    direction: "Server → Client",
                    latency: "34 ms",

                    message: `
                        <div class="message-code">
                            HTTP/1.1 200 OK
                            <br>
                            Content-Type: video/mp2t
                            <br>
                            Segment: 001
                            <br>
                            Duration: 6 seconds
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "request",
                    title: "Segment 002 Request",
                    direction: "Client → Server",
                    latency: "17 ms",

                    message: `
                        <div class="message-code">
                            GET /video/seg-002.ts HTTP/1.1
                            <br>
                            Range: bytes=0-
                        </div>
                    `
                },

                {
                    protocol: "HTTP",
                    type: "response",
                    title: "Segment 002 Response",
                    direction: "Server → Client",
                    latency: "32 ms",

                    message: `
                        <div class="message-code">
                            HTTP/1.1 200 OK
                            <br>
                            Content-Type: video/mp2t
                            <br>
                            Segment: 002
                            <br>
                            Duration: 6 seconds
                        </div>
                    `
                }

            ]
        }

    };


    // --------------------------------------------------------
// LIVE NETWORK STATUS
// --------------------------------------------------------

function updateLiveStatus(step, flow) {

    if (!liveNetworkStatus) return;

    liveNetworkStatus.classList.remove(
        "response-state",
        "complete-state"
    );

    if (!step) {

        liveStatusText.textContent =
            "WAITING FOR ACTIVITY";

        liveStatusProtocol.textContent =
            "SYSTEM";

        liveStatusMessage.textContent =
            "Ready to observe application-layer traffic";

        return;
    }

   if (step.type === "request") {

    activityStatus.textContent = "RUNNING";

    liveStatusText.textContent =
        getRequestStatus(step);

    liveStatusProtocol.textContent =
        step.protocol;

    liveStatusMessage.textContent =
        getStatusDescription(step);
}

    if (step.type === "response") {
          activityStatus.textContent = "RUNNING";
    liveNetworkStatus.classList.add("response-state");
    liveStatusText.textContent =
        getResponseStatus(step);
    liveStatusProtocol.textContent =
        step.protocol;
    liveStatusMessage.textContent =
        getStatusDescription(step);
}

    function getRequestStatus(step) {

    const title = step.title.toLowerCase();

    if (title.includes("dns query")) {
        return "DNS QUERY";
    }

    if (title.includes("dns mx")) {
        return "DNS MX LOOKUP";
    }

    if (title.includes("http get")) {
        return "HTTP REQUEST";
    }

    if (title.includes("manifest request")) {
        return "MANIFEST REQUEST";
    }

    if (title.includes("segment 001 request")) {
        return "SEGMENT REQUEST";
    }

    if (title.includes("segment 002 request")) {
        return "SEGMENT REQUEST";
    }

    if (title.includes("ehlo")) {
        return "SMTP EHLO";
    }

    if (title.includes("mail from")) {
        return "SMTP MAIL FROM";
    }

    if (title.includes("rcpt to")) {
        return "SMTP RCPT TO";
    }

    if (title.includes("data")) {
        return "SMTP DATA";
    }

    if (title.includes("message body")) {
        return "SMTP MESSAGE";
    }

    if (title.includes("quit")) {
        return "SMTP QUIT";
    }

    return "TRANSMITTING";
}
function getResponseStatus(step) {

    const title = step.title.toLowerCase();

    if (title.includes("dns response")) {
        return "DNS RESPONSE";
    }

    if (title.includes("http response")) {
        return "HTTP RESPONSE";
    }

    if (title.includes("manifest response")) {
        return "MANIFEST RESPONSE";
    }

    if (title.includes("segment 001 response")) {
        return "SEGMENT RESPONSE";
    }

    if (title.includes("segment 002 response")) {
        return "SEGMENT RESPONSE";
    }

    if (title.includes("220")) {
        return "SMTP SERVICE READY";
    }

    if (title.includes("ehlo response")) {
        return "SMTP EHLO RESPONSE";
    }

    if (title.includes("sender accepted")) {
        return "SMTP 250 RESPONSE";
    }

    if (title.includes("recipient accepted")) {
        return "SMTP 250 RESPONSE";
    }

    if (title.includes("start mail input")) {
        return "SMTP 354 RESPONSE";
    }

    if (title.includes("message accepted")) {
        return "SMTP 250 RESPONSE";
    }

    if (title.includes("session closed")) {
        return "SMTP 221 RESPONSE";
    }

    return "RESPONSE RECEIVED";
}

    if (currentIndex === flow.steps.length - 1) {

        liveNetworkStatus.classList.remove(
            "response-state"
        );

        liveNetworkStatus.classList.add(
            "complete-state"
        );

        activityStatus.textContent = "COMPLETE";
        
        liveStatusText.textContent =
            "FLOW COMPLETE";

        liveStatusProtocol.textContent =
            flow.protocol;

        liveStatusMessage.textContent =
            `${flow.name} session completed`;
    }
}


function getStatusDescription(step) {

    const title = step.title.toLowerCase();

    if (title.includes("dns query")) {
        return "Resolving domain name...";
    }

    if (title.includes("dns mx")) {
        return "Looking up mail exchange server...";
    }

    if (title.includes("dns response")) {
        return "Domain address received.";
    }

    if (title.includes("manifest request")) {
        return "Requesting streaming playlist...";
    }

    if (title.includes("manifest response")) {
        return "Streaming playlist received.";
    }

    if (title.includes("segment")) {

        if (step.type === "request") {
            return "Requesting media segment...";
        }

        return "Media segment received.";
    }

    if (title.includes("http get")) {
        return "Sending HTTP resource request...";
    }

    if (title.includes("http response")) {
        return "Web resource received.";
    }

    if (title.includes("ehlo")) {

        if (step.type === "request") {
            return "Introducing SMTP client...";
        }

        return "SMTP server capabilities received.";
    }

    if (title.includes("mail from")) {
        return "Submitting sender address...";
    }

    if (title.includes("sender accepted")) {
        return "Sender address accepted.";
    }

    if (title.includes("rcpt to")) {
        return "Submitting recipient address...";
    }

    if (title.includes("recipient accepted")) {
        return "Recipient address accepted.";
    }

    if (title.includes("data")) {
        return "Starting email message transfer...";
    }

    if (title.includes("start mail input")) {
        return "Server ready for message body.";
    }

    if (title.includes("message body")) {
        return "Transmitting email content...";
    }

    if (title.includes("message accepted")) {
        return "Message accepted for delivery.";
    }

    if (title.includes("quit")) {
        return "Closing SMTP session...";
    }

    if (title.includes("session closed")) {
        return "SMTP connection closed.";
    }

    return step.title;
}


// --------------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------------

function getMailRecipient() {
    return mailTo?.value.trim() || "receiver@example.com";
}
    // --------------------------------------------------------
    // HELPER FUNCTIONS
    // --------------------------------------------------------

    function getMailRecipient() {
        return mailTo?.value.trim() || "receiver@example.com";
    }

    function getMailSubject() {
        return mailSubject?.value.trim() || "NetLens Test Message";
    }

    function getMailBody() {
        return escapeHtml(
            mailBody?.value.trim() ||
            "This is a simulated SMTP message generated by NetLens."
        );
    }

    function getStreamQuality() {
        return quality?.value || "720p";
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    // --------------------------------------------------------
    // TAB MANAGEMENT
    // --------------------------------------------------------

    function activateTab(tabName) {

    // Remove active state from all tabs
    browseTab?.classList.remove("active");
    mailTab?.classList.remove("active");
    streamTab?.classList.remove("active");

    // Hide all activity sections
    browseActivity?.classList.add("hidden");
    mailActivity?.classList.add("hidden");
    streamActivity?.classList.add("hidden");

    // Remove active state
    browseActivity?.classList.remove("active");
    mailActivity?.classList.remove("active");
    streamActivity?.classList.remove("active");


    // =========================
    // BROWSE
    // =========================

    if (tabName === "browse") {

        browseTab?.classList.add("active");

        browseActivity?.classList.remove("hidden");
        browseActivity?.classList.add("active");
    }


    // =========================
    // MAIL
    // =========================

    if (tabName === "mail") {

        mailTab?.classList.add("active");

        mailActivity?.classList.remove("hidden");
        mailActivity?.classList.add("active");
    }


    // =========================
    // STREAM
    // =========================

    if (tabName === "stream") {

        streamTab?.classList.add("active");

        streamActivity?.classList.remove("hidden");
        streamActivity?.classList.add("active");
    }
}


    browseTab?.addEventListener("click", () => activateTab("browse"));
    mailTab?.addEventListener("click", () => activateTab("mail"));
    streamTab?.addEventListener("click", () => activateTab("stream"));


    // --------------------------------------------------------
    // ACTIVITY LOG
    // --------------------------------------------------------

    function addActivity(message, type = "info") {

        if (!activityLog) return;

        totalEvents++;

        if (eventCount) {
            eventCount.textContent =
                `${totalEvents} EVENT${totalEvents === 1 ? "" : "S"}`;
        }

        const emptyMessage =
            activityLog.querySelector(".empty-log");

        if (emptyMessage) {
            emptyMessage.remove();
        }

        const item = document.createElement("div");

        item.className = "activity-item";

        item.innerHTML = `
            <div class="activity-dot ${type}"></div>

            <div class="activity-content">
                <div class="activity-title">
                    ${escapeHtml(message)}
                </div>

                <div class="activity-time">
                    ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;

        activityLog.prepend(item);
    }


    // --------------------------------------------------------
    // RESET VISUALIZATION
    // --------------------------------------------------------

    function resetVisualization() {

        stopAutoPlay();

        currentIndex = -1;
        isPaused = false;

        if (pauseButton) {
            pauseButton.textContent = "PAUSE";
        }

        if (currentFlow) {
            currentFlow.textContent = "No active flow";
        }

        if (currentStep) {
            currentStep.textContent = "0 / 0";
        }

        if (currentProtocol) {
            currentProtocol.textContent = "—";
        }

        if (latency) {
            latency.textContent = "—";
        }

        if (serverName) {
            serverName.textContent = "SERVER";
        }

        if (timelineProgress) {
            timelineProgress.style.width = "0%";
        }

        if (timelinePoints) {
            timelinePoints.innerHTML = "";
        }

        if (messageDirection) {
            messageDirection.textContent = "—";
        }

        if (messageCard) {
            messageCard.innerHTML = `
                <div class="empty-message">
                    <div class="empty-icon">◇</div>
                    <h3>Awaiting activity</h3>
                    <p>
                        Perform an action on the left panel
                        to begin the protocol visualization.
                    </p>
                </div>
            `;
        }

        if (packetArrow) {
            packetArrow.style.left = "50%";
            packetArrow.classList.remove("server-to-client");
        }
        updateLiveStatus(null, null);
    }


    // --------------------------------------------------------
    // START FLOW
    // --------------------------------------------------------

    function startFlow(flowName) {

        const flow = flows[flowName];

        if (!flow) return;

        activeFlow = flowName;

        resetVisualization();

        currentFlow.textContent = flow.name;
        serverName.textContent = flow.server;

        createTimeline(flow);

        addActivity(
            `${flow.name} session started`,
            "success"
        );

        if (flowName === "browse") {
            const url =
                urlInput?.value.trim() || "example.com";

            addActivity(
                `Opening ${url}`,
                "info"
            );
        }

        if (flowName === "mail") {
            addActivity(
                `Sending message to ${getMailRecipient()}`,
                "info"
            );
        }

        if (flowName === "stream") {
            addActivity(
                `Starting ${getStreamQuality()} stream`,
                "info"
            );
        }

        nextStep();
    }


    // --------------------------------------------------------
    // CREATE TIMELINE
    // --------------------------------------------------------

    function createTimeline(flow) {

        if (!timelinePoints) return;

        timelinePoints.innerHTML = "";

        flow.steps.forEach((step, index) => {

            const point = document.createElement("div");

            point.className = "timeline-point";

            point.dataset.index = index;

            point.title =
                `${index + 1}. ${step.title}`;

            point.innerHTML = `
                <span>${index + 1}</span>
            `;

            point.addEventListener("click", () => {

                if (!activeFlow) return;

                currentIndex = index;

                renderStep();
            });

            timelinePoints.appendChild(point);
        });
    }


    // --------------------------------------------------------
    // RENDER CURRENT STEP
    // --------------------------------------------------------

    function renderStep() {

        if (!activeFlow) return;

        const flow = flows[activeFlow];

        if (
            currentIndex < 0 ||
            currentIndex >= flow.steps.length
        ) {
            return;
        }

        const step = flow.steps[currentIndex];

        const total = flow.steps.length;

        // Update live network status
updateLiveStatus(step, flow);

        // Summary
        currentFlow.textContent = flow.name;

        currentStep.textContent =
            `${currentIndex + 1} / ${total}`;

        currentProtocol.textContent =
            step.protocol;

        latency.textContent =
            step.latency;

        serverName.textContent =
            flow.server;

        // Direction
        messageDirection.textContent =
            step.direction;

        // Message
        messageCard.innerHTML = `
            <div class="message-header">
                <div>
                    <span class="message-number">
                        STEP ${String(currentIndex + 1).padStart(2, "0")}
                    </span>

                    <h3>${escapeHtml(step.title)}</h3>
                </div>

                <span class="protocol-badge">
                    ${escapeHtml(step.protocol)}
                </span>
            </div>

            <div class="message-body">
                ${step.message}
            </div>
        `;

        // Timeline progress
        const progress =
            ((currentIndex + 1) / total) * 100;

        if (timelineProgress) {
            timelineProgress.style.width =
                `${progress}%`;
        }

        // Timeline points
        document
            .querySelectorAll(".timeline-point")
            .forEach((point, index) => {

                point.classList.remove(
                    "active",
                    "completed"
                );

                if (index < currentIndex) {
                    point.classList.add("completed");
                }

                if (index === currentIndex) {
                    point.classList.add("active");
                }
            });

        // Packet direction
        animatePacket(step.type);

        // Add activity
        addActivity(
            `${step.protocol}: ${step.title}`,
            step.type === "request"
                ? "request"
                : "response"
        );

        // Auto progression
        if (!isPaused) {
            scheduleNext();
        }

        // Final step
        if (currentIndex === total - 1) {

            addActivity(
                `${flow.name} flow completed`,
                "success"
            );

            stopAutoPlay();
        }
    }


    // --------------------------------------------------------
    // NEXT STEP
    // --------------------------------------------------------

    function nextStep() {

        if (!activeFlow) return;

        const flow = flows[activeFlow];

        if (currentIndex < flow.steps.length - 1) {

            currentIndex++;

            renderStep();

        } else {

            stopAutoPlay();

            addActivity(
                `${flow.name} is already complete`,
                "info"
            );
        }
    }


    // --------------------------------------------------------
    // PREVIOUS STEP
    // --------------------------------------------------------

    function previousStep() {

        if (!activeFlow) return;

        if (currentIndex > 0) {

            stopAutoPlay();

            currentIndex--;

            renderStep();

        } else {

            addActivity(
                "Already at the first protocol step",
                "info"
            );
        }
    }


    // --------------------------------------------------------
    // AUTO PLAY
    // --------------------------------------------------------

    function scheduleNext() {

        stopAutoPlay();

        if (isPaused) return;

        autoTimer = setTimeout(() => {

            nextStep();

        }, 1600);
    }


    function stopAutoPlay() {

        if (autoTimer) {
            clearTimeout(autoTimer);
            autoTimer = null;
        }
    }


    // --------------------------------------------------------
    // PAUSE / RESUME
    // --------------------------------------------------------

    function togglePause() {

        if (!activeFlow) return;

        isPaused = !isPaused;

        if (isPaused) {

            stopAutoPlay();

            pauseButton.textContent = "RESUME";

            addActivity(
                "Protocol visualization paused",
                "info"
            );

        } else {

            pauseButton.textContent = "PAUSE";

            addActivity(
                "Protocol visualization resumed",
                "success"
            );

            scheduleNext();
        }
    }


    // --------------------------------------------------------
    // REPLAY
    // --------------------------------------------------------

    function replayFlow() {

        if (!activeFlow) {

            addActivity(
                "No protocol flow to replay",
                "info"
            );

            return;
        }

        stopAutoPlay();

        currentIndex = -1;

        isPaused = false;

        pauseButton.textContent = "PAUSE";

        addActivity(
            `Replaying ${flows[activeFlow].name}`,
            "success"
        );

        nextStep();
    }


    // --------------------------------------------------------
    // PACKET ANIMATION
    // --------------------------------------------------------

    function animatePacket(type) {

        if (!packetArrow) return;

        packetArrow.classList.remove(
            "server-to-client",
            "packet-move"
        );

        void packetArrow.offsetWidth;

        if (type === "response") {
            packetArrow.classList.add(
                "server-to-client"
            );
        }

        packetArrow.classList.add(
            "packet-move"
        );
    }


    // --------------------------------------------------------
    // BROWSE ACTION
    // --------------------------------------------------------

    visitButton?.addEventListener("click", () => {

        let url =
            urlInput?.value.trim();

        if (!url) {
            url = "example.com";
            urlInput.value = url;
        }

        activateTab("browse");

        addActivity(
            `Browser request: ${url}`,
            "success"
        );

        startFlow("browse");
    });


    // --------------------------------------------------------
    // MAIL ACTION
    // --------------------------------------------------------

    sendMailButton?.addEventListener("click", () => {

        const recipient =
            mailTo?.value.trim();

        if (!recipient) {

            addActivity(
                "Please enter a recipient email address",
                "info"
            );

            mailTo?.focus();

            return;
        }

        activateTab("mail");

        addActivity(
            `Preparing SMTP message for ${recipient}`,
            "success"
        );

        startFlow("mail");
    });


    // --------------------------------------------------------
    // STREAM PLAY
    // --------------------------------------------------------

    playStreamButton?.addEventListener("click", () => {

        activateTab("stream");

        startFlow("stream");

        startStreamClock();
    });


    // --------------------------------------------------------
    // STREAM PAUSE
    // --------------------------------------------------------

    pauseStreamButton?.addEventListener("click", () => {

        stopStreamClock();

        addActivity(
            "Streaming playback paused",
            "info"
        );
    });


    // --------------------------------------------------------
    // STREAM CLOCK
    // --------------------------------------------------------

    function startStreamClock() {

        stopStreamClock();

        streamTimer = setInterval(() => {

            streamSeconds++;

            const minutes =
                Math.floor(streamSeconds / 60);

            const seconds =
                streamSeconds % 60;

            if (streamTime) {

                streamTime.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }

        }, 1000);
    }


    function stopStreamClock() {

        if (streamTimer) {

            clearInterval(streamTimer);

            streamTimer = null;
        }
    }


    // --------------------------------------------------------
    // VISUALIZATION CONTROLS
    // --------------------------------------------------------

    previousButton?.addEventListener(
        "click",
        previousStep
    );

    nextButton?.addEventListener(
        "click",
        nextStep
    );

    pauseButton?.addEventListener(
        "click",
        togglePause
    );

    replayButton?.addEventListener(
        "click",
        replayFlow
    );


    // --------------------------------------------------------
    // QUALITY CHANGE
    // --------------------------------------------------------

    quality?.addEventListener("change", () => {

        if (!activeFlow || activeFlow !== "stream") {
            return;
        }

        addActivity(
            `Stream quality changed to ${quality.value}`,
            "info"
        );
    });


    // --------------------------------------------------------
    // KEYBOARD SHORTCUTS
    // --------------------------------------------------------

    document.addEventListener("keydown", (event) => {

        // Do not trigger shortcuts while typing
        const tag =
            document.activeElement?.tagName;

        if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        ) {
            return;
        }

        if (event.key === "ArrowRight") {
            nextStep();
        }

        if (event.key === "ArrowLeft") {
            previousStep();
        }

        if (event.code === "Space") {

            event.preventDefault();

            togglePause();
        }

        if (
            event.key.toLowerCase() === "r"
        ) {
            replayFlow();
        }
    });


    // --------------------------------------------------------
    // INITIAL STATE
    // --------------------------------------------------------

    activateTab("browse");

    resetVisualization();

    console.log(
        "NetLens Application Layer Visualizer loaded successfully."
    );

});