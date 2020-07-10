---
title: Quick look at the java.io package
layout: post
published: true
---

Whenever I have to use the java.io package, it is usually for a specific purpose.

- "I have a json file I need to read from"
- "I need to write this array to a buffer"

This usually means googling those exact queries and finding a stack overflow post with the exact command needed. The java.io package is a magic box where I only use community suggested or the codebase suggested classes. I am curious about taking an overview look at the package to see what classes are available to learn if there are better options for each problem.

### Package Organization

It looks like most of the classes can be divided into 4 categories:

1. Writers
2. Readers
3. InputStreams
4. OutputStreams

Readers and InputStreams both have to do with reading from input source and Writers and OutputStreams are responsible for writing to an output destination.

It looks like the "Streams" are responsible for byte by byte reading and writing while the readers and writers are for character by character reading.

### Input/Output types

What can we read/write from?

- Byte/Char Arrays
- Files
- Data primitives (int, float, long etc...)
- Java Objects

### Composing classes

Can also compose streams and apply transformations on the data.

- Buffers
- Filters
- Parsers
- Pipes
- Pushback

{% highlight java %}
PipedInputStream input = new PipedInputStream();
PipedOutputStream output = new PipedOutputStream();

output.connect(input);
output.write("hello".getBytes());

int i;
while ((i = input.read()) != -1) {
  System.out.println((char) i);
}
{% endhighlight %}

### Other interesting classes

- LineNumberReader: Keep track of line numbers
- SequenceInputStream: Concatenate streams
- Console: Access the character-based console device
