---
title: HTTP/3 - HTTP over QUIC
layout: post
published: true
---

Continuing from my last post on [HTTP/2](/2020/07/01/notes-on-http2.html), I want to explain what is prompting the next major version bump to the HyperText Transfer Protocol. The information of this post will come from the [IETF draft for HTTP/3](https://quicwg.org/base-drafts/draft-ietf-quic-http.html).

# Head-of-line blocking problem

To start off, lets examine the main motivation for HTTP/2.

HTTP/2, compared to HTTP/1.1, reduces the network resources used by interleaving the request and response messages within multiple streams on the same TCP connection. TCP ensures that packets are delivered to the other side correctly and in the correct order. In other words, it is a **reliable** transport. To accomplish this, TCP adds small amounts of data to each packet. The **sequence number** and **checksum** are used for the receiver to detect whether there are errors within the packet. If there is an issue, [Automatic repeat requests (ARQ)](https://en.wikipedia.org/wiki/Automatic_repeat_request) are sent to notify the sender to re-send the lost or damaged packet

When an error occurs, TCP will stop further message exchanges until the error is resolved or the connection fails. In the case of HTTP/2, since there is only a single TCP connection, even if there are multiple streams of data within the connection, all of the streams are blocked until the error is resolved. This is known as the [Head-of-line blocking problem](https://en.wikipedia.org/wiki/Head-of-line_blocking) and is one of the drivers for HTTP/3.

# QUIC

The main change from HTTP/2 is changing the underlying transport layer from TCP to QUIC. The QUIC (pronounced "Quick" and is not actually an acronym) is a transport protocol designed at Google in 2013.

QUIC is not actually a new transport layer protocol but it is one that is built on top of UDP, a connectionless protocol without reliability. QUIC accomplishes this by establishing a number of multiplexed UDP connections. These connections are mapped to a QUIC stream which are independent of each other. This solves the head-of-line-blocking problem that can occur with HTTP/2 streams over TCP. If one UDP stream contains an error, the other streams can continue to make progress. Since error detection and recovery is **not** provided by UDP, the QUIC layer is the one responsible for this. The HTTP/3 project used to be called HTTP over QUIC.

# TLS

Another change in the QUIC protocol is that it is designed with TLS in mind. Since HTTP connections demand TLS nowadays, it is built into the transport protocol and the key exchange and supported protocols is now a part of the initial QUIC handshake process. Previously, the TCP connection needed to be established before the TLS handshake could be negotiated.

QUIC requires TLS 1.3 or greater. Clients must support a mechanism to indicate the target host such as using the SNI TLS extension. To use HTTP/3, client also needs to use the [ALPN](https://tools.ietf.org/html/rfc7301) string `h3`.

# Network switching

For TCP, when a mobile device moves from a local WiFI hotspot to a mobile network, every existing connection times out one-by-one and then is re-established as a new connection. QUIC uses a unique connection identifier that can be re-used to re-establish the existing connection regardless of the source IP address as in the case of switching networks.

# HTTP Message Exchanges

Clients send HTTP requests on client-initiated bidirectional QUIC streams. The server can send zero or more HTTP responses on the same stream followed by a single final HTTP response. As in HTTP/2, servers can push responses to the client unprompted. But in HTTP/3, this is done on server-initiated unidirectional QUIC streams.

# Frame Layout

{% highlight bash %}
    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                           Type (i)                          ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                          Length (i)                         ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                       Frame Payload (*)                     ...
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
{% endhighlight %}

# Frame Types

The frame types have changed slightly compared to [HTTP/2](https://http2.github.io/http2-spec/#FrameTypes).

| **Frame**                         | **Type** | **Definition**                                                                                                                    |
|-------------------------------|------|-------------------------------------------------------------------------------------------------------------------------------|
| DATA                          | 0x0  | Data associated with an HTTP request or response payload.                                                                     |
| HEADERS                       | 0x1  | Carries the header block.                                                                                                     |
| CANCEL_PUSH                   | 0x3  | Request cancellation of a server push prior to the server push being received.                                                |
| SETTINGS                      | 0x4  | Convey configuration parameters to affect how the endpoints communicate such as preferences and constraints on peer behavior. |
| PUSH_PROMISE                  | 0x5  | Carry a promised request header set from server to client.                                                                    |
| GOAWAY                        | 0x7  | Initiate a graceful shutdown of a connection by a server.                                                                     |
| MAX_PUSH_ID                   | 0xD  | Used by clients to control the number of server pushes that the server can initiate.                                          |
| DUPLICATE_PUSH                | 0xE  | Used by servers to indicate that an existing pushed resource is related to multiple client requests.                          |


# Stream types:

## 1. Control Streams

Each side initiates unidirectional control streams using the stream type of 0x00 to modify the connection settings. The types of frames permitted are `SETTINGS`, `CANCEL_PUSH`, `GOAWAY` and `MAX_PUSH_ID`.

## 2. Request Streams

The normal request and response stream type. These contain the frames `DATA`, `HEADERS` and `PUSH_PROMISE`.


## 3. Push Streams

A server can initiate a response before a request has been made using the push stream. This is indicated by the stream type of 0x01 followed by the Push ID. The types of frames permitted are `DATA` and `HEADERS`.

# Is HTTP/3 in production?

Yes! We can visit google.com using Google Chrome and inspect the network tab:

![google http3](/assets/images/posts/http3-http-over-quic/google_http3.png)

We can see here that our request to www.google.com used the protocol `h3-Q050` indicating that it used HTTP/3.

Now this is mainly enabled between connections from Google clients and servers and we have not yet migrated the internet from HTTP/1.1 to HTTP/2 so it may still be a long ways away before a more mainstream adoption of HTTP/3. Nevertheless, still neat to see how the protocol is progressing.
