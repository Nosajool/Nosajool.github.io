---
title: "Can you override CTRL-C in a program?"
layout: post
published: true
---

## What is CTRL-C?

When you are running a process, you can use `Control+C` to abort the program. But what does this do exactly?

> `Control+C` sends the `SIGINT` signal to interrupt a process.

The default behavior is for the receiving program to terminate itself. However, you can override the default behavior to do whatever you want by handling the signal.

## Overriding CTRL-C

I wrote a small program to demonstrate this behavior:

{% highlight c %}
#include <signal.h>
#include <stdio.h>
#include <unistd.h>

void signal_handler(int signal)
{
  printf("Received SIGINT from CTRL-C but not quitting because it is overridden.\n");
}

int main()
{
  // Install the signal handler for SIGINT
  signal(SIGINT,  signal_handler);

  // After 5 seconds, switch the signal handler back to the default one
  int count = 0;
  while(1) {
    printf("Count: %d\n", count);
    sleep(1);
    count++;
    if (count == 5) {
      signal(SIGINT, SIG_DFL);
    }
  }
}
{% endhighlight %}

In this example, we set up a signal handler to override the default behavior. After 5 seconds, we switch the signal handler back to the default one.

{% highlight bash %}
$ ./a.out
Count: 0
^CReceived SIGINT from CTRL-C but not quitting because it is overridden.
Count: 1
Count: 2
^CReceived SIGINT from CTRL-C but not quitting because it is overridden.
Count: 3
^CReceived SIGINT from CTRL-C but not quitting because it is overridden.
Count: 4
Count: 5
^C
{% endhighlight %}

## Why would you override CTRL-C?

![Why would you do that?](/assets/images/posts/can-you-override-ctrl-c/whywouldyoudothat.jpg)<br>

The example from the [GNU libc manual on Basic Signal Handling](https://www.gnu.org/software/libc/manual/html_node/Basic-Signal-Handling.html) shows that the custom signal handler is being used to delete temporary files.

