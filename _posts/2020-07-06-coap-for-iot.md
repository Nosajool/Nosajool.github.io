---
title: CoAP for IoT
layout: post
published: true
---

CoAP is the Constrained Application Protocol. It is a specialized web transfer protocol for constrained nodes and networks.

### What is a constrained node?

A node is often an 8-bit microcontroller with small amounts of ROM and RAM. These are often the microcontrollers that are used in IoT devices.

### What is an 8-bit microcontroller?

A microcontroller is a single computer chip with a CPU, memory and I/O peripherals. Microcontrollers are designed for embedded applications in compact devices as it does not need external components. They use low amounts of power and can be often powered using batteries. 8-bit microcontroller means that the microcontroller processes 8-bits of data at a time. For example, the size of the registers is 8 bits per register, the number of memory addresses is 2^8 = 256 addresses and the largest numbers that can be processed are 2^8 = 256 integers (0 - 255).

### What is a constrained network?

A constrained network is a low-power or lossy network such as IPv6 over Low-Power Wireless Personal Area Networks (6LoWPANs). These networks often have high packet error rates and low throughput.

# Back to CoAP

CoAP is similar to HTTP but it is optimized specifically for IoT machine to machine (M2M) data exchange.

### CoAP uses a datagram-oriented transport such as UDP

{% highlight bash %}
                        +----------------------+
                        |      Application     |
                        +----------------------+
                        +----------------------+  \
                        |  Requests/Responses  |  |
                        |----------------------|  | CoAP
                        |       Messages       |  |
                        +----------------------+  /
                        +----------------------+
                        |          UDP         |
                        +----------------------+

                        Abstract Layering of CoAP
{% endhighlight %}

Message types:

- Confirmable
- Non-confirmable
- Acknowledgement
- Reset

### Messaging Model

Each CoAP messages has a 4 byte header followed by binary options and a payload.

{% highlight bash %}
    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |Ver| T |  TKL  |      Code     |          Message ID           |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |   Token (if any, TKL bytes) ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |   Options (if any) ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |1 1 1 1 1 1 1 1|    Payload (if any) ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

                            Message Format
{% endhighlight %}

### Request/Response Model

CoAP uses request and response semantics. Every message includes either a **Method Code** or a **Response Code**.

A request can be either

- **Confirmable (CON)**
- **Non-confirmable (NON)**.

Confirmable requests guarantee message reliability. Confirmable messages will be resent until the client receives a successful **Acknowledgement (ACK)** message. If the response to a Confirmable request is immediately available, the response is added to the Acknowledgement message. This is known as a **piggybacked response**.

CoAP messages use a **Token** to match a request with a response.

{% highlight bash %}
        Client              Server       Client              Server
           |                  |             |                  |
           |   CON [0xbc90]   |             |   CON [0xbc91]   |
           | GET /temperature |             | GET /temperature |
           |   (Token 0x71)   |             |   (Token 0x72)   |
           +----------------->|             +----------------->|
           |                  |             |                  |
           |   ACK [0xbc90]   |             |   ACK [0xbc91]   |
           |   2.05 Content   |             |  4.04 Not Found  |
           |   (Token 0x71)   |             |   (Token 0x72)   |
           |     "22.5 C"     |             |   "Not found"    |
           |<-----------------+             |<-----------------+
           |                  |             |                  |

                Two GET Requests with Piggybacked Responses
{% endhighlight %}

On the other hand, if the server is not able to respond immediately with the resulting data for a Confirmable request, it can just reply with an empty Acknowledgement message. Then when the response is ready, it can reply to the client with a new Confirmable message. This is known as a **separate response**.

{% highlight bash %}
                        Client              Server
                           |                  |
                           |   CON [0x7a10]   |
                           | GET /temperature |
                           |   (Token 0x73)   |
                           +----------------->|
                           |                  |
                           |   ACK [0x7a10]   |
                           |<-----------------+
                           |                  |
                           ... Time Passes  ...
                           |                  |
                           |   CON [0x23bb]   |
                           |   2.05 Content   |
                           |   (Token 0x73)   |
                           |     "22.5 C"     |
                           |<-----------------+
                           |                  |
                           |   ACK [0x23bb]   |
                           +----------------->|
                           |                  |

                    A GET Request with a Separate Response

{% endhighlight %}

For the case of Non-confirmable requests, the server can reply with a Confirmable or Non-confirmable message.

{% highlight bash %}
                        Client              Server
                           |                  |
                           |   NON [0x7a11]   |
                           | GET /temperature |
                           |   (Token 0x74)   |
                           +----------------->|
                           |                  |
                           |   NON [0x23bc]   |
                           |   2.05 Content   |
                           |   (Token 0x74)   |
                           |     "22.5 C"     |
                           |<-----------------+
                           |                  |

              A Request and a Response Carried in Non-confirmable Messages
{% endhighlight %}

If the server has trouble with the incoming requests, they can send back a **Reset (RST)** message.

The same process can be repeated for PUT, POST and DELETE methods.

### DTLS

CoAP uses Datagram TLS over UDP or DTLS.
