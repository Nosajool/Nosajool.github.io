---
title: "#define MY_MACRO do { ... } while(0) in C"
layout: post
published: true
---

Lately I have been working in C. This is a new domain for me as the last time I used this language was in first year of university. As I work through the tasks, I find myself stumbling over **C** specific nuances such as all of the possible data types for numbers, pointers, byte ordering and memory allocation. When I joined this project, these nuances were expected and I knew I would need to learn to tackle these problems. I read the [The C Programming Language](https://en.wikipedia.org/wiki/The_C_Programming_Language) which was a fantastic refresher. However, a couple of weeks into working with the code base, I saw some C patterns that did not exist in the book. One example of this is the `#define MY_MACRO do { ... } while(0)` pattern.

### Macros in C

Before jumping into the weird looking code, lets start with the basics. What is a macro? A macro is a name given to a block of C statements.

The C preprocessor processes all defined macros in your C code before it is compiled.

You can define your own macros using `#define MACRO_NAME value`. The C preprocessor will essentially replace all usages of `MACRO_NAME` in your source code with `value`. This allows you to substitute common code snippets using the macro name.

{% highlight c %}
#define MY_NUM 0

int main()
{
  return MY_NUM;
}
{% endhighlight %}

The above code will be preprocessed into:

{% highlight c %}
int main()
{
  return 0;
}
{% endhighlight %}


### Macro Functions

You can define macros that take arguments like a function.

{% highlight c %}
# define MULTIPLY(a,b,c) a * b * c

int main()
{
  printf("%d", MULTIPLY(2,3,4));
  return 0;
}
{% endhighlight %}

The downside is that there will be no type checking but just like object macros, the code of the function body will be substituted into the calling location. This means there will be no additional stack trace lines for the macro.

This will be preprocessed into:

{% highlight c %}
# define MULTIPLY(a,b,c) a * b * c

int main()
{
  printf("%d", 2 * 3 * 4);
  return 0;
}
{% endhighlight %}

### Multiline macros

We can write a multiline macro by appending a `\` to the end of each line.

{% highlight c %}
#define PRINT_THREE(a,b,c) {\
  printf("%d\n", a);\
  printf("%d\n", b);\
  printf("%d\n", c);\
}

int main()
{
    if (0)
      PRINT_THREE(1,2,3);
    else
      ...
    return 0;
}
{% endhighlight %}

The problem here is that this code will not compile:

{% highlight bash %}
$ gcc test.c
test.c:13:5: error: expected expression
    else
    ^
1 error generated.
{% endhighlight %}

Why? Lets see what the code looks like when we expand the macro, the same way the preprocessor would do it:

{% highlight c %}
int main()
{
    if (1)
      {
        printf("%d\n", 1);
        printf("%d\n", 2);
        printf("%d\n", 3);
      };
    else
      ...
    return 0;
}
{% endhighlight %}

Now it makes sense why the compiler is throwing the error. We had switched from the no brace if statement to the if statement using braces. The else clause still uses the no brace syntax which is causing an error since it expects the character before the `else` to be a `}`. However, there is a semi-colon after the macro expression brackets.

{% highlight c %}
}; <---
else
{% endhighlight c %}

A quick solution could be to omit the semi-colon when calling the macro.

{% highlight c %}
int main()
{
    if (0)
      PRINT_THREE(1,2,3)   <--- no semi colon after macro
    else
      ...
    return 0;
}
{% endhighlight %}

This looks strange to the eye though as we are used to seeing function invocations terminated with `;`.

### do {...} while (0) trick

The solution to this problem as I saw throughout the codebase is to wrap the macro in `do { ... } while(0)` code.

{% highlight c %}
#define PRINT_THREE(a,b,c) do {\
  printf("%d\n", a);\
  printf("%d\n", b);\
  printf("%d\n", c);\
} while(0)
{% endhighlight %}

This allows us to continue to terminate our macro call using the `;` and the preprocessor expands the code into something that can be compiled:

{% highlight c %}
int main()
{
    if (1)
      do {
        printf("%d\n", 1);
        printf("%d\n", 2);
        printf("%d\n", 3);
      } while(0);
    else
      ...
    return 0;
}
{% endhighlight %}

### All together

{% highlight c %}
#include "stdio.h"

#define PRINT_THREE(a,b,c) do {\
    printf("%d\n", a);\
    printf("%d\n", b);\
    printf("%d\n", c);\
} while(0)

int main()
{
    if (1)
      PRINT_THREE(1,2,3);
    else
      printf("Cannot get here\n");

    return 0;
}
{% endhighlight %}
