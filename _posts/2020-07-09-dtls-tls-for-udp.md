---
title: "DTLS: TLS for UDP"
layout: post
published: true
---

Recently I wrote about [CoAP](/2020/07/06/coap-for-iot.html) and mentioned that it uses DTLS. Time to learn a bit about it from the [RFC](https://tools.ietf.org/html/rfc6347).

DTLS is a protocol for datagram-based applications to communicate under security guarantees similar to TLS such as preventing eavesdropping, tampering or message forgery.

The tricky part is that TLS relies on a reliable transport. This is something that you do not have with a protocol like UDP.

Lets go over some of the challenges we need to overcome to have TLS over an unreliable transport.

### Loss-Insensitive Messaging

The TLS traffic encryption layer, known as the **TLS Record Layer**, has records that are dependent on each other.

For example, the cryptographic context including the **stream cipher key** is retained between records. Additionally, TLS uses a **MAC** (Message Authentication Code) for **anti-replay** and **message reordering** protection.  The sequence number used in the MAC is incremented for each record.

DTLS bans stream ciphers and adds **explicit sequence numbers** that are not dependent on the records.

### Packet Loss

DTLS uses a **retransmission timer** to handle packet loss.

{% highlight bash %}
  Client                                     Server
  ------                                     ------
  ClientHello     ------>
                            X<-- HelloVerifyRequest
                                             (lost)

  [Timer Expires]

  ClientHello     ------>
  (retransmit)
{% endhighlight %}

Both the client and server maintain the retransmission timer and retransmits when the timer expires.

### Reordering

Each handshake in DTLS is assigned a specific sequence number within the handshake. When a peer receives a handshake message, it checks the sequence number to see if it is the next one it expects to process. If it is, it processes it. If not, it queues it up for future handling.

### Message Size

TLS and DTLS handshake messages can be up to kilobytes long. However, UDP datagrams are often limited to < 1500 bytes. Thus, each DTLS handshake message can be fragmented over several DTLS records.

Each DTLS handshake message contains a **fragment offset** and a **fragment length** to reassemble the unfragmented message.

### Replay Detection

Replay detection for DTLS works by maintaining a **bitmap window** of received records. The records that are too old to fit in the window and records that have previously been received are discarded.

### Denial-of-Service Countermeasures

Datagram protocols are extremely susceptible to DoS attacks.

Two types of attacks:

1. Attacker can overwhelm a server by transmitting a series of handshake initiation requests, causing the server to allocate state and perform expensive cryptographic operations.
2. Attacker can use the server as an amplifier. It does this by sending connection initiation messages with a forged source of the victim. The server then sends the next message to the victim which floods it.

To counter this, DTLS uses a **stateless cookie** technique. When the client sends the ClientHello message, the server sends a stateless cookie in the **HelloVerifyRequest**. The client must retransmit the ClientHello with the cookie added. The server then verifies the cookie and continues the handshake only if the cookie is valid. This forces the client to receive and handle the cookie which is more difficult with spoofed IPs that are used for DoS attacks.

{% highlight bash %}
  Client                                     Server
  ------                                     ------
  ClientHello     ------>
                            X<-- HelloVerifyRequest
                                  (contains cookie)

  ClientHello     ------>
  (with cookie)
{% endhighlight %}
