---
title: "/etc/services"
layout: post
published: true
---

`/etc/services` is known as the **services** file on Unix operating systems. These are individual programs called services that client applications can use. A service must be assigned a protocol (TCP or UDP) and a protocol.

 Each line in the file represents a program, a port number, the protocol to connect to it and any aliases. It is essentially a small database of the services and well-known ports.


{% highlight bash %}
$ less /etc/services

# In the format of `service-name    port/protocol   [aliases..]  [#comment]`

...
ssh              22/tcp                   # The Secure Shell (SSH) Protocol
ssh              22/udp                   # The Secure Shell (SSH) Protocol
telnet           23/tcp
telnet           23/udp
# 24 - private mail system
lmtp             24/tcp                   # LMTP Mail Delivery
lmtp             24/udp                   # LMTP Mail Delivery
smtp             25/tcp     mail
smtp             25/udp     mail
time             37/tcp     timeserver
time             37/udp     timeserver
rlp              39/tcp     resource      # resource location
rlp              39/udp     resource      # resource location
nameserver       42/tcp     name          # IEN 116
nameserver       42/udp     name          # IEN 116
...
{% endhighlight %}

# Trusted Ports

Ports 0-1023 are known as **trusted ports**. Root privilege is required to start listening for incoming connections on these ports. This is to prevent regular users from writing a program that masquerades as another program that normally listens on that port.

# Starting services

Some services can be started and stopped manually.

{% highlight bash %}
$ sudo service ssh restart
Stopping sshd:              [OK]
Starting sshd:              [OK]
$ sudo service ssh status
openssh-daemon (pid 24729) is running...
{% endhighlight %}

These services use startup scripts in `/etc/init.d`. `init.d` is a daemon that can control the status of these services. The scripts in `/etc/init.d` will all have a `start`, `stop`, `restart` and `status` functions.

{% highlight bash %}
$ less /etc/init.d/sshd

...
start()
{
  # Create keys if necessary
  /usr/bin/ssh-keygen -A
  if [ -x /sbin/restorecon ]; then
    /sbin/restorecon /etc/ssh/ssh_host_rsa_key.pub
    /sbin/restorecon /etc/ssh/ssh_host_dsa_key.pub
    /sbin/restorecon /etc/ssh/ssh_host_ecdsa_key.pub
  fi

  echo -n $"Starting $prog:"
  $SSHD $OPTIONS && success || failure
  RETVAL=$?
  [ $RETVAL -eq 0 ] && touch /var/lock/subsys/sshd
  echo
}

stop()
{
  echo -n $"Stopping $prog:"
  killproc $SSHD -TERM
  RETVAL=$?
  [ $RETVAL -eq 0 ] && rm -f /var/lock/subsys/sshd
  echo
}

reload()
{
  echo -n $"Reloading $prog:"
  killproc $SSHD -HUP
  RETVAL=$?
  echo
}
...
{% endhighlight %}
