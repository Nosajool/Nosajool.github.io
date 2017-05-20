---
title: Learnings week of Nov 15
layout: learnings
published: true
---
* `git add --patch`
  * Josh Freeman's talk from RubyConf 2015: [Communicating Intent Through Git](https://www.youtube.com/watch?v=Wl0NfWYrvlY)
* To add directories to your "Favourites" section in Finder, just drag and drop the folder into it.
* To remove the "Apps" button in your Chrome bookmark bar, right click on it and deselect "Show Apps Shortcut".
* With the [Todoist](https://en.todoist.com/) app, you can quickly add a task using `a` and sort the task list by date using `s`.
* Load Balancer Algorithms
  * **Round-Robin**: Distribute requests sequentially to each server.
  * **Least Connections**: Requests sent to server with fewest connections.
  * **IP Hash**: IP address determines which server handles request.
* A **CDN** or Content Delivery Network is a globally distributed network of proxy servers deployed in multiple data centers.
  * Hosts static resources like HTML, CSS, JS. Dynamic resources always need to go through app server.
  * The optimal server based on location, availability etc... will be used to handle the request.
* Can expire sprockets assets by changing the `config.assets.version`
* **Serialization** is the process of translating a data structure into a format that can be stored or transmitted across a network to be reconstructed later.
* Use `rake middleware` to inspect the Rack middleware stack.
* **Bagel land** is used to describe a security approaching $0 in price.
* Weekly Vim
  * `(` and `)` jump to the beginning and end of sentences.
  * `{` and `}` jump to the beginning and end of paragraphs.
  * With the [Vim Ruby](https://github.com/vim-ruby/vim-ruby) plugin, you can use `vam` to "select a method".
