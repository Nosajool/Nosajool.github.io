---
title: "Proxy Protocol"
layout: post
published: true
---

A load balancer typically sits between a client and server that balances traffic amongst the configured target instances. Whether the load balancer terminates the initial TCP connection and opens a new connection to the server, or rewrites the TCP header source and destination fields, the target server will still be missing the client's source ip address.

In this diagram, we can see that from the perspective of the server, the server sees requests from the load balancer ip 92.123.34.71 but does not know that the traffic came from client 72.168.34.11 or 75.172.100.05.

![Without Proxy Protocol](/assets/images/posts/proxy-protocol/without_proxy_protocol.png)

Proxy Protocol allows chain proxies and reverse-proxies like a load balancer to forward relevant connection information that may have been rewritten.

There are 2 versions of Proxy Protocol:

1. Proxy Protocol V1 (PPV1)
2. Proxy Protocol V2 (PPV2)

The difference is that Proxy Protocol V1 is human-readable while Proxy Protocol V2 is binary encoded..

## Proxy Protocol V1

{% highlight bash %}
PROXY TCP4/TCP6/UNKNOWN <SRC IP> <DST IP> <SRC PORT> <DST PORT>
{% endhighlight %}

- `PROXY`: Indicates PPV1 format
- `TCP4/TCP6/UNKNOWN`: The INET protocol and family
- `SRC IP`: Original client IP
- `DST IP`: Destination of packet, for example, the load balancer IP address
- `SRC PORT`: Source port on client host
- `DST PORT`: Destination port of packet

The example request above from client 72.168.34.11 would pass the following Proxy Protocol V1 header to the server.

{% highlight bash %}
PROXY TCP4 72.168.34.11 92.123.34.71 3025 443
{% endhighlight %}

## Proxy Protocol V2

{% highlight bash %}
0D 0A 0D 0A 00 0D 0A 51 55 49 54 0A <13th byte> <14th byte> <15-16th byte> <17th byte onwards>
{% endhighlight %}

- `13th byte`: The protocol version: `\x2` (highest 4 bits) and command: `\x0` for LOCAL or proxy initiated and `\x1` for PROXY which is a connection established on behalf of another node.
- `14th byte`:  Transport protocol (lower 4 bits) and address family (higher 4 bits).
- `15-16th byte`: Address length in bytes in network endian order
- `17th byte onwards`: Addresses in network byte order.

The example request above from client 72.168.34.11 would pass the following Proxy Protocol V2 header to the server.

{% highlight bash %}
0D 0A 0D 0A 00 0D 0A 51 55 49 54 0A 20 11 0C 00 5C 7B 22 47 48 A8 22 0B 01 BB 0B D1
{% endhighlight %}

## Proxy Protocol V2 TLVs

A difference from Proxy Protocol V1 is that in Proxy Protocol V2, the proxy can attach Type-Length-Values (TLV) to the end of the header to pass additional information to the server.

For example, in the AWS Network Load Balancer [Proxy Protocol](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html#proxy-protocol) documentation, we can see that for traffic coming through a VPC endpoint service, the Proxy Protocol header will include a custom TLV of type `PP2_TYPE_AWS (0xEA)` that will pass the VPC endpoint id to the server.

Other example TLVs can include TLS information like ALPN strings, hostnames past by the clients, a unique connection id and more.
