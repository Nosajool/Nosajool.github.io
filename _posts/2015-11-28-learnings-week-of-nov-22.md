---
title: Learnings week of Nov 22 - pandas, vcr, ssl, hsts, rubocop
layout: learnings
published: true
---
* The [pandas](http://pandas.pydata.org/) python library provides data structures for working with relational or "labelled" data.
* **Overfitting** is when a data model fits itself to "noise".
* In Chrome, `option-delete` deletes the last word typed.
* [vcr](https://github.com/vcr/vcr) records HTTP interactions to replay them during future tests.
  * Records response as a fixture in `.yml` format
* [CloudFlare](https://www.cloudflare.com/) is a service that allows you to route web traffic through their global network.
  * Take advantage of their CDN so that your content is closer to visitors
  * Block abusive bots and crawlers by intercepting requests and presenting them with a challenge page
  * Free SSL
* **SSL** or Secure Sockets Layer is used in order to encrypt data to and from your web server.
  * Visitors can verify that they are not on an imposter site
  * Improved Google search ranking
  * Visitors can verify that website content has not been modified in transit
    * When you use free wi-fi, proxy usually will modify content with addition of ads if no SSL
* **HSTS** or HTTP Strict Transport Security is a header that allows a website to specify and enforce a security policy in client web browsers.
  * Prevent downgrade attacks/SSL stripping
    * Form of man-in-the-middle attack where an attacker can redirect web browser from HTTPS webserver to attacker controlled server
    * Turns all HTTP links into HTTPS links
    * Upgrades SSL warnings and bypassable errors into non-bypassable errors
* [Rubocop](https://github.com/bbatsov/rubocop) is a static code analyzer to enforce the [ruby style guide](https://github.com/bbatsov/ruby-style-guide).
  * **Static code analysis** means examining the code without executing the program.
* Weekly Vim
  * There is a neat vim plugin called [vim-surround](https://github.com/tpope/vim-surround) that makes it easy to change and add surroundings in pairs.
