---
title: Wordasm
layout: project
date: September 2014
tools:
- Node.js
- socket.io
site_url: http://wordasm.herokuapp.com
github: https://github.com/Nosajool/Wordasm
---
Real-time multiplayer word making game. Built at Hack The North 2014.

![Wordasm](/assets/images/projects/wordasm.png)

Hack The North is the first Hackathon that I've attended that is part of the MLH (Major League Hacking). I'll definitely be attending more in the future as I had a blast. This was a 36 hour event held in Waterloo's E5 building that was filled with over 1000 students from around the world. Sponsors gave out so much free stuff that I was able to double my t-shirt collection by the end of the weekend. There were also workshops and games throughout the event for us to participate in. My team ended up winning [Arduinos](http://www.arduino.cc) through one of these games by writing the [Fizz Buzz](http://en.wikipedia.org/wiki/Fizz_buzz) problem in as many programming languages as possible in 5 minutes.


For our hack, we built a game similar to OMGPOP's [Letterblox](https://www.youtube.com/watch?v=-G-kR892Ekg) You sign into our app using Facebook and are presented with a randomly generated set of letters. You then type in the chat box and compete against everyone else by forming words out of these letters. We used Node.js for our backend and socket.io to push data to and from the server extremely quickly. Word validity was checked using a hashed dictionary.
