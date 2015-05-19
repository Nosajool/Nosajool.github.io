---
title: My Command Line Reference
layout: post
published: false
---

# ls

## View visible and hidden files.
{% highlight bash %}
ls -a
{% endhighlight %}

## View details and sorted by last modified
{% highlight bash %}
ls -lt
{% endhighlight %}

# CURL

## curl with response details
{% highlight bash %}
curl -i [url]
{% endhighlight %}

## curl with parameters in request body and headers set
{% highlight bash %}
curl -X POST -d "[param1_name]=[value1]&[param2_name]=[value2]" [url] \
-H "Accept: application/json"
{% endhighlight %}

# find

## Find files & directories in the current directory + sub directories containing "\*user\*"
{% highlight bash %}
find . -name \*user\*
{% endhighlight %}

## Find files & directories with the path containing "\*controllers\*"
{% highlight bash %}
find . -path \*controllers\*
{% endhighlight %}

## Find only files or only directories
{% highlight bash %}
find . -type f
find . -type d
{% endhighlight %}

## Delete log files and show which ones were deleted
{% highlight bash %}
find . -type f -name \*.log -print -delete
{% endhighlight %}

# grep

## Find lines in file containing the word "class". (Can use regex) and show line numbers
{% highlight bash %}
grep -n class app/controllers/api/v1/users_controller.rb 
{% endhighlight %}

## Count number of occurences of User (case insensitive)
{% highlight bash %}
grep -c User app/controllers/api/v1/users_controller.rb
{% endhighlight %}

## Search recursively through all directories
{% highlight bash %}
grep -R "render :json" .
{% endhighlight %}

## Search only in spec files
{% highlight bash %}
grep -R --include="*_spec*" "user" .
{% endhighlight %}

## Invert search (find lines which don't contain "user" and are not blank lines)
{% highlight bash %}
grep -v  "^$" app/controllers/api/v1/users_controller.rb | grep -n -v "user"
{% endhighlight %}

# Fun stuff

## Calendar / Date
{% highlight bash %}
cal -y
date
{% endhighlight %}

## See Directory Structure (need to install tree)
{% highlight bash %}
tree -d
{% endhighlight %}

## Word count / Line count
{% highlight bash %}
wc -w README.md
wc -l README.md
{% endhighlight %}
