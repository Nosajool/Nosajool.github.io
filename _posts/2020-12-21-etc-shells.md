---
title: "/etc/shells"
layout: post
published: true
---

I use a `shell` called `zsh`. A coworker recommended it to me over 5 years ago and claimed it greatly improved his productivity. But how can a `shell` improve your productivity? And why would one `shell` with the obscure name of `zsh` be better than the other obscure shells `bash`, `zsh`, `ksh` or `tcsh`?

## What is a shell?

A `shell` is an interpretor that gives a user an interface into the operating system so that the user can run commands and input data. It also supports programming and interactive use.

## How do you configure a shell?

1. Run Control Files like `.zshrc`, `.bash_profile`, `.zlogin`
2. Environment variables like `$EDITOR`, `$HOME`, `$PAGER`
3. Aliases
4. Options

## What is $PS1?

`$PS1` stands for Prompt String 1 and it is the environment variable that defines the format of the prompt string.

For example, mine is:

{% highlight bash %}
$ echo $PS1
%(!.%{$fg_bold[red]%}.%{$fg_bold[green]%}%n@)%m %{$fg_bold[blue]%}%(!.%1~.%~) $(git_prompt_info)
%_$(prompt_char)%{$reset_color%}
{% endhighlight %}

This renders a prompt string that looks like looks like:

{% highlight bash %}
jasonloo@CodeMachine ~/projects/Nosajool.github.io (master*)
$
{% endhighlight %}

## /etc/shells

`/etc/shells` is a file which contains the path of valid login shells.

{% highlight bash %}
jasonloo@CodeMachine /etc
$ cat shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
{% endhighlight %}

Here are the shells my operating system supports out of the box.

| shell | full name             | description                                                                                                               |
|-------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| bash  | Bourne Again Shell    | The revision of the Bourne Shell. Command line editing.                                                                   |
| csh   | C Shell               | Based on the C programming language.                                                                                      |
| dash  | Debian Almquist Shell | Lightweight shell written by Kenneth Almquist in late 1980s.The default shell for Ubuntu in 2006.                         |
| ksh   | Korn Shell            | Merged features from C Shell, TC Shell, Bourne shell. Developed before BASH.                                              |
| sh    | Bourne Shell          | Bourne Shell. Default shell for 1979 Version 7 Unix.                                                                      |
| tcsh  | TC Shell              | Enhanced C Shell.                                                                                                         |
| zsh   | Z Shell               | Extended Bourne shell with features from Bash, ksh, tcsh. Command-line completion, shared command history, file globbing |

## zsh

I use `zsh`, the Z Shell. Some of the features of this shell are:

### Autocomplete

I can type

{% highlight bash %}
$ cd /bi
{% endhighlight %}

and use <tab> completion to auto complete to `cd /bin`.

### Up History

I often use `<CTRL>+R` for recursive search history but you can also use `<UP>` and `<DOWN>` arrows.

### Arguments without using --help

`ps -<TAB>` gives you a quick look at the arguments for a command.

{% highlight bash %}
$ ps -
C     -- ignore resident time for CPU percentage
E     -- show environment after command
L     -- display all format specifiers
M     -- show threads corresponding to each process
S     -- include child process data with the parent
T     -- select processes attached to current terminal
X     -- skip processes with no controlling terminal
a     -- include processes belonging to other users
c     -- show just executable name for command
d     -- select all processes except session leaders
e  A  -- select every process
f     -- full listing
h     -- repeat header lines, one per page of output
j     -- output in job control format
l     -- output in long format
m     -- sort by memory usage
r     -- sort by CPU usage
v     -- output in virtual memory format
w     -- wide output
x     -- include processes with no controlling terminal
G  -- select processes by real group
O  -- specify additional output fields
U  -- select processes by real user
g  -- select processes by process group leader
o  -- specify output format
p  -- select processes by ID
t  -- select processes by attached terminal
u  -- select processes by user id
{% endhighlight %}

### Using editor for long commands

You can use `<CTRL>X<CTRL>E` to edit the current command in your default text editor. Whenever I start chaining commands with `&&` or start writing a loop, I use this.

### Oh My Zsh

[Oh My Zsh](https://ohmyz.sh/) is not a feature but a community driven framework for managing Zsh configuration. I use it for themes and plugins. There are are also helper functions that can be used to improve your workflows.


