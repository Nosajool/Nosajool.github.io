---
title: Slack Slam
layout: project
date: March 2015
tools:
- Ruby on Rails
site_url: http://slack-slam.herokuapp.com/
github: https://github.com/matthewdu/slack-slam
---
Key-Value store for Slack. Top 10 at EngHack.

![Match-3](/assets/images/projects/slack-slam.png)

This co-op term, a couple of my roomates and I used Slack at work as our team communication tool. It's a pretty neat product with an awesome UI/UX. The simplest yet best feature in my opinion is how images and gifs are automatically embedded when posting the link. When you see a magnificent gif, it's your duty to save it for a future perfect opportunity.

Inspired by [Boom](https://github.com/holman/boom), we built a simple key-value store using Rails as our backend, Slack's outgoing webhooks and their web API.

By authorizing our app to post on behalf of the user, we listen for chat messages prefixed by the word "slam". We then execute the typed command from [this]({{ page.site_url }}) list.

For example, to save this gif to the word 'hungry',
![Breakfast](/assets/images/projects/cereal.gif)

you can type
`slam add hungry http://i.imgur.com/tGMnXu5.gif`

to post it in the channel, you can use the command:
`slam hungry`

Another cool command is saving the last message posted by someone else to a key. For instance, let's say someone posts this Bizarro Flame gif:
![Bizzarro Flame](/assets/images/projects/bizarro.gif)

You can then save it to Slack Slam using

`slam save ganondorf`

and then access it with

`slam ganondorf`
