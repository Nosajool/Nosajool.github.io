---
title: "Using lsof to determine the number of used file descriptors"
layout: post
published: true
---

Recently, one of the JVM processes on our hosts was leaking file descriptors. We needed to determine which hosts had the buggy process that caused us to run out of file descriptors. This was the perfect opportunity to use the `lsof` command.

This was the command that I used:

{% highlight bash %}
$ ps -e | grep $APPLICATION | grep -v grep | awk '{ print $1 }' | xargs -I % lsof -p % | wc -l
56342
{% endhighlight %}

Lets break this down using an example where `$APPLICATON` is an instance of a running `irb`.

{% highlight bash %}
$ ps -e | grep irb
34571 ttys003    0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn irb
34358 ttys004    0:00.28 irb
{% endhighlight %}

- `ps` displays information about the active process
- `-e` selects all processes
- `grep irb` will filter out the lines that do not include `irb`

Continuing with the filtering to extract the process id:

{% highlight bash %}
$ ps -e | grep irb | grep -v grep | awk '{ print $1 }'
34358
{% endhighlight %}

- `grep -v grep` will inverse filter out the grep process so that we select the correct irb process
- `awk '{print $1 }'` will select the pid from the output of `ps`

Now that we have the desired PID of the process, we can use `lsof`. `lsof` stands for **list open files**. It can be used to report all open files and the processes that opened them.

{% highlight bash %}
$ ps -e | grep irb | grep -v grep | awk '{ print $1 }' | xargs -I % lsof -p %
COMMAND   PID     USER   FD   TYPE             DEVICE SIZE/OFF                NODE NAME
ruby    34358 jasonloo  cwd    DIR                1,4    32448 1152921500311879712 /usr/bin
ruby    34358 jasonloo  txt    REG                1,4    13184         12888838697 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/bin/ruby
ruby    34358 jasonloo  txt    REG                1,4  4252328         12888838699 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/libruby.2.7.dylib
ruby    34358 jasonloo  txt    REG                1,4   423228         12888742284 /usr/local/Cellar/gmp/6.2.0/lib/libgmp.10.dylib
ruby    34358 jasonloo  txt    REG                1,4    17260         12888838764 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/enc/encdb.bundle
ruby    34358 jasonloo  txt    REG                1,4    16884         12888838780 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/enc/trans/transdb.bundle
ruby    34358 jasonloo  txt    REG                1,4    16272         12888838814 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/monitor.bundle
ruby    34358 jasonloo  txt    REG                1,4   277800         12888838727 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/ripper.bundle
ruby    34358 jasonloo  txt    REG                1,4    49372         12888838828 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/readline.bundle
ruby    34358 jasonloo  txt    REG                1,4   243368         12888638794 /usr/local/Cellar/readline/8.0.4/lib/libreadline.8.0.dylib
ruby    34358 jasonloo  txt    REG                1,4    36408         12888838725 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/io/console.bundle
ruby    34358 jasonloo  txt    REG                1,4    50368         12888838722 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/pathname.bundle
ruby    34358 jasonloo  txt    REG                1,4    33068         12888838713 /Users/jasonloo/.rvm/rubies/ruby-2.7.1/lib/ruby/2.7.0/x86_64-darwin19/etc.bundle
ruby    34358 jasonloo  txt    REG                1,4  1568368 1152921500312400944 /usr/lib/dyld
ruby    34358 jasonloo    0u   CHR               16,4 0t444637               14643 /dev/ttys004
ruby    34358 jasonloo    1u   CHR               16,4 0t444637               14643 /dev/ttys004
ruby    34358 jasonloo    2u   CHR               16,4 0t444637               14643 /dev/ttys004
ruby    34358 jasonloo    3   PIPE 0xf314b0c9e14c3b4d    16384                     ->0x84134359e5c3ead
ruby    34358 jasonloo    4   PIPE  0x84134359e5c3ead    16384                     ->0xf314b0c9e14c3b4d
ruby    34358 jasonloo    5   PIPE 0x39a4edc92ee241c9    16384                     ->0xa6d45c75c2a22c53
ruby    34358 jasonloo    6   PIPE 0xa6d45c75c2a22c53    16384                     ->0x39a4edc92ee241c9
ruby    34358 jasonloo    7   PIPE 0xcb1aeb3911690aaa    16384                     ->0xf84f384839b41426
ruby    34358 jasonloo    8   PIPE 0xf84f384839b41426    16384                     ->0xcb1aeb3911690aaa
{% endhighlight %}

- `xargs -I %` passes the previous result (PID) to the `lsof` command argument
- `-p` selects the listing of files for the process with this PID

The next step was just to pass this to `wc -l` to get the number of lines of output from `lsof`.

{% highlight bash %}
$ ps -e | grep irb | grep -v grep | awk '{ print $1 }' | xargs -I % lsof -p % | wc -l
      24
{% endhighlight %}

And that's it. I wrote a wrapper script to `ssh` into each of our hosts and run this command. The script would then output hosts with file descriptor counts greater than 20,000.

Happy on call week learnings!

