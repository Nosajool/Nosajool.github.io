---
title: "What is a DNS PTR Record?"
layout: post
published: true
---

# DNS

The **Domain Name System** or **DNS** for short typically correlates **domain names** with an **IP address**.

{% highlight bash %}
$ dig www.google.com

; <<>> DiG 9.10.6 <<>> www.google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44994
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;www.google.com.                        IN      A

;; ANSWER SECTION:
www.google.com.         94      IN      A       142.250.217.100

;; Query time: 9 msec
;; SERVER: 192.168.0.1#53(192.168.0.1)
;; WHEN: Sun Dec 05 15:27:12 PST 2021
;; MSG SIZE  rcvd: 59
{% endhighlight %}

In this example, we are querying for an IPv4 address of the domain name `www.google.com` and our DNS resolver returns the IP `142.250.217.100`.

{% highlight bash %}
;; ANSWER SECTION:
www.google.com.         94      IN      A       142.250.217.100
{% endhighlight %}

# Reverse DNS

A DNS **PTR** record does the exact opposite of this. They are known as **reverse DNS lookups** where we query for an IP address and are expecting a domain name result.

Using `dig`, we use the `-x` flag.

{% highlight bash %}

$ dig -x 142.250.217.100
; <<>> DiG 9.10.6 <<>> -x 142.250.217.100
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 904
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;100.217.250.142.in-addr.arpa.  IN      PTR

;; ANSWER SECTION:
100.217.250.142.in-addr.arpa. 51175 IN  PTR     sea09s30-in-f4.1e100.net.

;; Query time: 6 msec
;; SERVER: 192.168.0.1#53(192.168.0.1)
;; WHEN: Sun Dec 05 15:33:11 PST 2021
;; MSG SIZE  rcvd: 95
{% endhighlight %}

The result looks a little funny. `sea09s30-in-f4.1e100.net` is the domain name returned. This does not look related to Google.

{% highlight bash %}
;; ANSWER SECTION:
100.217.250.142.in-addr.arpa. 51175 IN  PTR     sea09s30-in-f4.1e100.net.
{% endhighlight %}

![DNS PTR Record](/assets/images/posts/dns-ptr-records/ptr_record.png)

Also, what is this `100.217.250.142.in-addr.arpa`? I thought we queried for `142.250.217.100`!

# DNS PTR Records

DNS PTR records are stored under the IP address reversed and with `.in-addr.arpa` added to the end. In our case, we reverse `142.250.217.100` and get `100.217.250.142`. Appending `.in-addr.arpa` gets us `100.217.250.142.in-addr.arpa`.

Why `.in-addr.arpa`?

Because PTR records are stored within the `.arpa top-level domainin DNS`. `.arpa` was the first top-level domain name defined for the internet and comes from ARPANET (Advanced Research Projects Agency Net).

IPv6 PTR records still exist in the `.arpa` namespace but are stored using the suffix `.ip6.arpa` instead of `.in-addr.arpa`.

So what is `sea09s30-in-f4.1e100.net`?

According to [this support post](https://support.google.com/faqs/answer/174717?hl=en), `1e100.net` is a Google owned domain name used to identify servers in their network. The trivia fact is that `1e100` is the scientific notation for 1 googol.

# What are PTR records used for?

## Anti-spam

Certain email anti-spam filters use PTR records to validate domain names of email addresses. This helps them verify whether or not the associated IP addresses are used by the legitimate email servers.

## Human readability

System logs typically record IP addresses. To help an operator with troubleshooting, reverse DNS lookups can help convert these into domain names that are more human-readable.

In WireShark, you can resolve network ip addresses using the `Resolve network (IP) addresses` option in Preferences to make it much easier to see where traffic is coming from.

![Wireshark Name Resolution](/assets/images/posts/dns-ptr-records/wireshark_name_resolution.png)
