---
title: "What is a TCP SYN Flood?"
layout: post
published: true
---

A **SYN flood** is a Denial-of-Service attack that targets systems at layer 4, specifically TCP. It is a state exhaustion attack that attempts to consume connection resources on the receiver.

## A normal TCP handshake

Lets take a look at a simple TCP handshake.

The client creates a data structure called a TCB (Transmission Control Buffer) to hold the stateful information of each unique TCP handshake. The TCB is responsible for maintaining information about the connection like the ips, and ports that are used, buffers, pointers, knowledge about acknowledged packets and more.

The client then sends a SYN (synchronization) packet to the server. The server then creates its own TCB for the connection and replies with a SYN/ACK (Synchronization Acknowledgement) packet.

Finally, the client acknowledges receipt of the SYN/ACK packet and sends an ACK back to the server to complete the 3 way handshake.

![3 way handshake](/assets/images/posts/syn-flooding/3_way_handshake.png)

## Incomplete TCP handshake

In the case of a SYN flood, the client **has no intention** of completing the 3 way handshake. In fact, it does not even have to allocate memory to create the TCB.

The client just fabricates a cheap, fake SYN packet which the server responds with a SYN/ACK. The server allocates memory for the connection like the TCB and waits for the ACK packet to complete the 3 way handshake. In Linux this is 1300 bytes per TCB.

But the ACK from the client never comes!

The server is left **waiting** for that 3rd ACK and their resources are being reserved for no reason.

![Half Open Handshake](/assets/images/posts/syn-flooding/incomplete_handshake.png)

## Taking advantage of tied up server resources - The SYN flood

The SYN flood attack takes advantage of this incomplete handshake scenario by doing the same thing at mass scale. The attacker will send a high volume of SYN packets to the target.

The arrival of each SYN packet will cause the server to manage the new connection. Eventually, all available server buffers will be consumed, waiting for the 3rd ACKs to complete the handshakes. This will render the server unresponsive to new legitimate traffic. At this point, the attack is successful.

The next thing we will look at are 3 types of SYN flood attacks.

## 1. The Direct Attack

With a direct attack, the attacker does not mask their IP at all. It generates SYN packets and sends them to the target server but blocks the returning SYN/ACK packets using a firewall.

![Direct Attack](/assets/images/posts/syn-flooding/direct_attack.png)

## 2. Spoofed Attack

Attackers can hide their identity with spoofed IP addresses. Spoofing the ip address means that the attacker will generate an IP address that is not its own and modify the outgoing SYN packet to make it appear like it is coming from the spoofed IP. The SYN/ACK packets will not return to the attacker's computer. It will be returned to the generated IP address. Blocking the spoofed IP address will not help as the next SYN will come from a different ip address.

![Spoofed Attack](/assets/images/posts/syn-flooding/spoofed_attack.png)

## 3. DDOS Attack

The last type of attack is the DDOS attack. This is the distributed denial of service attack where attackers can use a botnet of devices to attack the service from a fleet of computers. This would allow the attacker to hit the server with a load much larger than one it could achieve from a single source. Botnet hosts can of course combine this attack with IP spoofing.

![DDOS](/assets/images/posts/syn-flooding/ddos_attack.png)

## SYN flood mitigation

What can a server do to protect itself from SYN floods? How do we distinguish between legitimate and malicious SYN packets?

## 1. Increasing the SYN backlog

When a SYN packet is received, the server replies with a SYN/ACK and then adds the connection to a **backlog** queue. Once the ACK is received, the connection is moved from the **backlog** queue to the **accept queue** (complete connection queue) and is ready for the application to **accept**.

![SYN Backlog](/assets/images/posts/syn-flooding/syn_backlog.png)

The size of the **backlog** queue is a configurable value that can be changed in `/proc/sys/net/ipv4/tcp_max_syn_backlog`

From [ip-sysctl.txt](https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt):

> tcp_max_syn_backlog - INTEGER
	Maximal number of remembered connection requests (SYN_RECV),
	which have not received an acknowledgment from connecting client.
	This is a per-listener limit.
	The minimal value is 128 for low memory machines, and it will
	increase in proportion to the memory of machine.
	If server suffers from overload, try increasing this number.
	Remember to also check /proc/sys/net/core/somaxconn
	A SYN_RECV request socket consumes about 304 bytes of memory.

By increasing the backlog queue size, we can buffer small SYN flood attacks. This technique does not scale and can still be abused by increasing the attack rate.

## 2. Reducing SYN/ACK retries

Another knob to tune is `/proc/sys/net/ipv4/tcp_synack_retries`.

> tcp_synack_retries - INTEGER
	Number of times SYNACKs for a passive TCP connection attempt will
	be retransmitted. Should not be higher than 255. Default value
	is 5, which corresponds to 31 seconds till the last retransmission
	with the current initial RTO of 1second. With this the final timeout
	for a passive TCP connection will happen after 63 seconds.

Reducing the SYN/ACK retries configuration could help reduce the impact of a SYN flood attack. It can however negatively impact legitimate handshakes that required more SYN/ACK retries to succeed.

## 3. SYN cookies

SYN cookies is a protection mechanism where the server does not actually allocate a TCB for a connection until it receives the ACK from the client that completes the 3 way handshake. In the SYN/ACK packet, the server encodes connection information in the **initial sequence number** for the connection. This is known as the SYN cookie. Upon receiving the ACK from the client, the server checks the incremented sequence number. It then decodes the connection data from the cookie and builds the TCB, proceeding with the TCP connection as usual.

![SYN Cookie](/assets/images/posts/syn-flooding/syn_cookie.png)

## 4. SYN Agent

Instead of the client performing the TCP handshake with the target host, a load balancer or proxy host could first complete the handshake. The target host with a SYN agent would only receive completed handshakes from the proxy. The proxy would then need to pass the sequence and acknowledgement numbers to the SYN agent so that the target host could respond to future messages on the TCP connection. The agent would then initiate a TCP connection to the target host and all subsequent data will pass through the agent and proxy in both directions. SYN flood attacks will be thus stopped at the proxy host.

The disadvantage with this approach is the complexity of managing the proxy and SYN agent. There is also likely latency introduced from this extra computation.

![SYN Agent](/assets/images/posts/syn-flooding/syn_agent.png)

## Further reading on defence mechanisms

[Investigating TCP SYN Flood Mitigation Techniques in the Wild](https://www.net.in.tum.de/fileadmin/TUM/NET/NET-2019-06-1/NET-2019-06-1_14.pdf) goes over a few more theoretical techniques for SYN Flood protection which are interesting ideas but require some custom implementations like the SYN agent solution.
