---
title: Json Writer's Return from 5 Year Blogging Hiatus
layout: post
published: true
---

It has been 5 years since my last post on this site. I had stopped writing here after my 3rd software engineering internship. Since then, I completed 3 more internships and graduated with my Bachelors degree in Software Engineering. I moved out to Seattle and for the past 2 years, I have been working as a Software Engineer at AWS on the Internet of Things Device Gateway team.

Writing is a huge part of the culture at Amazon. The first 15-20 minutes of a meeting is typically spent reviewing a document for design proposals, post mortem reports, product specifications and much more. It is important that the documents are written clearly and concisely and for the intended audience. Engineering work also consists of smaller writing tasks such as writing documentation, pull request and commit descriptions and [runbook](https://en.wikipedia.org/wiki/Runbook) entries.

It has been a great fit for me as I have always liked writing and sharing knowledge. I look back at the past posts on this blog and am amused but proud of my past self for doing it. I distinctly recall the feeling of curiosity and urge to share what I had learned to the world and would like to pick it up again.

The 'blogging' writing style is different than the one I would use at my day job but it is one that I would like to get better at. I am a big fan of a few engineering blogs and it is fascinating to watch the author's careers and how they are growing. One of my favourites to read is [Julia Evans' blog](https://jvns.ca/). I had seen her give a talk back at [CUSEC 2016](http://2016.cusec.net/) and have been reading her blog ever since. For this blog, I'd like to copy her [blogging tenants](https://jvns.ca/blog/2017/03/20/blogging-principles/):

- Be honest about what I know
- Try not to write anything (too) wrong
- Be positive
- Write for a past version of myself
- Stick to my own experience
- Talk about what I've learned recently
- Remember: If not everyone likes it, that's ok

# Json Writer

I am rebranding this blog to be called 'Json Writer'. It is pretty self explanatory. `json` (JavaScript Object Notation) being a human readable data exchange format and a homonym for my first name. I'll let you guess how many times I've thought someone was calling me when they were actually debating between using [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers), `json` or one of the many in house data formats for their project.

`JSONWriter` is a [Java class](https://stleary.github.io/JSON-java/index.html) from the `org.json` package to write build a JSON object.

In typical first blog post fashion, here is `Hello World` using `JSONWriter`:

{% highlight java %}
JSONWriter jsonWriter = new JSONStringer().object().key("Greeting").value("Hello World");
jsonWriter.endObject();
System.out.println(jsonWriter.toString());
{% endhighlight %}

{% highlight json %}
{"Greeting":"Hello World"}
{% endhighlight %}

# Where are we resuming from?

Did anyone even read this blog back then? I doubt it. I have gotten a few LinkedIn messages from people claiming to have "read my blog", but did they really?

Younger me had added Google Analytics. Lets take a peek.

![google analytics](/assets/images/posts/return-from-5-year-blogging-hiatus/google_analytics.png)

Almost 6000 unique or "New Users". I assume that a lot of this is bot traffic.

The site has a `64.2%` bounce rate which the tooltip describes as:

> The percentage of single-page sessions in which there was no interaction with the page. A bounced session has a duration of 0 seconds

I also recall installing the [jekyll-sitemap gem](https://github.com/jekyll/jekyll-sitemap) which generates the [sitemap.xml](/sitemap.xml) file for crawlers to index. This is also likely a large chunk of the observed traffic.

It is interesting to see the spike in traffic in November of 2016 given that my posts were only created between January 2014 and December 2015. I wonder what caused that.

There is very minimal traffic from March 2017 to the present day. One possible explanation is that my domain name lease on `jasonloo.co` had expired in February 2017 and I had chosen not to renew it. The domain used now is the free `nosajool.github.io` one provided by [Github Pages](https://pages.github.com/).


# What posts were the most popular?

![google analytics most popular pages](/assets/images/posts/return-from-5-year-blogging-hiatus/google_analytics_pages.png)

Sorting by 'Unique views', we can see that `69.51%` of viewers just visited the root page.

The `/about` page has `2.36%` of the traffic followed by 2 links that look like they are referral spam. Quick Google searches show that these are phishing scams aimed to promote their website in your Google Analytics so that you sign up for their services.

The 'bounce rate' and 'average time on page' for these posts give me a good indication of real traffic.

# Navigation Summary from '/'

To get a sense of the "real" audience, I am going to make the naive assumptions that visitors are first visiting the site root and not being linked directly to a post. This table shows where visitors navigated to after visiting the site root.

![google analytics next page path](/assets/images/posts/return-from-5-year-blogging-hiatus/next_page_path.png)

In total, there were 861 post visits that originated the home page. Based on the bounce rates for these posts, a portion of these are most likely bots.

# Traffic sources

Where are the site visitors coming from? I see a ton of bot sources but I do see some legitimate referrals. For example, there are 44 views from my Github profile with an average session duration of 1:23 and 24 views from LinkedIn with an average session duration of 1:47. There are a couple of straggler one-off views from my college friend's websites. Most likely, these were links from old projects we worked on. After filtering down the bot views from the different Google Analytics dashboards, I think I can safely say there were < 100 legitimate readers out of the 6000 unique visitors (1.6%).

# Starting fresh

Given the lack of posts and traffic in the past 3 years, I will be building up the audience from scratch. This will be difficult using my own site instead of a social blogging platform like Medium that has features like SEO, the social graph, audience reach, commenting, and the overall aesthetic. However, there are some pros of Jekyll + Github pages that I really like:

- I can edit the posts in VIM
- I can use git and open source the blog and accept pull requests
- I can write in Markdown
- Ownership of the site - I can hack it the way I want it

Excited to see how this goes.

Cheers to writing!
