---
title: Notes on HTTP/2
layout: post
published: true
---

HTTP/2, first introduced in 2015 is a major revision of the HTTP network protocol. HTTP/1.1 was previously standardized in 1997 HTTP/3 is the third major version that was very recently released in draft mode.

This post will be a summary of the [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2). I may write a separate post about HTTP/3 in the future.

# HTTP/2

HTTP/2 changes were entirely focused around performance while keeping compatibility with HTTP/1.1. It kept all of HTTP/1.1's core concepts such as HTTP methods, status codes, header fields and URIs but changed the way the data is framed and transported.

It is accomplished by enabling full request and response multiplexing, compressing headers, request prioritization and server pushing.


## Binary Framing Layer

HTTP/2 introduces a new binary framing layer that dictates how the HTTP messages are encapsulated.

![http2 binary framing layer](/assets/images/posts/notes-on-http2/binary_framing_layer.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

In HTTP/1.1, the entire HTTP message including HTTP headers and data are delivered in newline delimited plaintext. In HTTP/2, the communication is split into smaller messages and frames and are each encoded in a binary format.

This is the backwards incompatible feature with HTTP/1.x servers and clients and the reason for the major version bump instead of a minor version bump to HTTP/1.2.

The nice thing is that the experience for the application developer would not change and the API to parse out the headers and data remains the same.

## Streams, messages, and frames

All communication is performed over a single TCP connection. Within the connection, there can be any number of bidirectional streams.

Each stream has a unique identifier and optional priority information that is used to carry bidirectional messages.

Each message is an HTTP message such as a request or response which consists of one or more frames.

The frame is the smallest unit of communication. Frames from different streams may be interleaved and reassembled.

![http2 streams messages and frames](/assets/images/posts/notes-on-http2/streams_messages_and_frames.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

## Request and response multiplexing

One of HTTP/1.x's performance problems stems from the response queuing delivery model where only one response can be delivered at a time per connection.

The binary framing layer solves this problem by enabling full request and response multiplexing. This allows the client and server to break down an HTTP message into independent frames, interleave them and reassemble them on the other end.

![http2 request and response multiplexing](/assets/images/posts/notes-on-http2/request_and_response_multiplexing.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

As we can see in the figure, we can interleave multiple requests and responses in parallel all within a single TCP connection.

## Stream prioritization

Each HTTP/2 stream has an associated weight between 1 and 256 and can have a dependency on another stream. These attributes allow the client to construct a "prioritization tree" to express how it would prefer to receive responses.

The server can then use this information to optimize the delivery of high-priority responses to the client.

![http2 stream prioritization](/assets/images/posts/notes-on-http2/stream_prioritization.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

Clients can update their stream dependencies and weights at any time which is neat as the prioritization tree can change in response to user interaction.

## One connection per origin

Most HTTP communication is short and bursty whereas TCP is optimized for long lived bulk data transfers. With HTTP/2, the reuse of the single TCP connection is a huge reduction to the memory, cpu and network utilization.

## Flow Control

Flow control is the mechanism to prevent a sender from overwhelming a receiver that may not want the data or is not ready to process it. TCP implements flow control using a [Sliding Window algorithm](https://en.wikipedia.org/wiki/Sliding_window_protocol). HTTP/2 does not implement a specific flow control algorithm but provides building blocks to be able to implement flow control for example, using the sliding window approach.

## Server push

Unlike in HTTP/1.1, HTTP/2 gives the server the ability push multiple responses back to the client for a single client request without the client having to request each one explicitly.

![http2 server push](/assets/images/posts/notes-on-http2/server_push.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

For example, here the client is requesting the HTML page `GET /page.html`, and the server responds with the HTML page in stream 1 along with the JavaScript file and CSS file in stream 2 and stream 4.

I am a bit curious about this affect on CDNs. I think CDNs would still be leveraged heavily for caching and proximity benefits. And the CDN servers could also enable HTTP/2 to reduce the number of TCP connections established.

One last note on server pushing is that server push streams are initiated via `PUSH_PROMISE` frames. The client can reject these streams using an `RST_STREAM` frame. The client can also limit the number of concurrently pushed streams, adjust the initial flow control window or disable the server push entirely using the `SETTINGS` frames.

## Header Compression


In HTTP/1.x, plain text headers add 500-800 bytes of metadata overhead per message and sometimes kilobytes if sending HTTP cookies. HTTP/2 compresses the request and response header metadata. Compression is done using Huffman encoding. The client and server also maintain and update an indexed list of previously seen header fields to avoid compressing duplicated headers.

![http2 header compression](/assets/images/posts/notes-on-http2/header_compression.png)
<a class="img-source" href="https://developers.google.com/web/fundamentals/performance/http2">https://developers.google.com/web/fundamentals/performance/http2</a>

## Is this site using HTTP/2?

Yes!

![http2 json writer chrome protocols](/assets/images/posts/notes-on-http2/json_writer_protocols.png)

In fact, 47% of the top 10 million websites support HTTP/2 as of July 2020.
