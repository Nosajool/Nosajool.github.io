---
title: Microservices
layout: post
---

My co-worker bought us the book "Building Microservices" by Sam Newman and it's been an interesting read so far. The idea is pretty simple, to write small autonomous services that work together. Here are some of the advantages that the author notes in the opening chapters.

# Technology Heterogenity
With the microservices approach, it doesn't matter what language, framework or database each service uses as long as they each have their own API. The example given in the book uses Golang with their graph database for friends in a social network, Ruby for their post service and Java for their picture service.

In a monolithic application, it's much harder to try out new languages and frameworks because of the risk of impacting the rest of the system.

# Resiliance
In a monolithic application, if something fails, the whole system fails. We can reduce the chances of failiure by running our monolithic application on multiple machines however using microservices, we can build systems to handle the total failiures of services and degrade functionality according. 

# Scaling
If one part of our monolithic application needs to be scaled up, we must scale the entire app as a piece. Using the microservice technique, we can scale up only the services that need adjustments. We can use less powerful hardware on smaller services allowing us to ultimately reduce costs.

# Ease of Deployment
Making a small change to a monolithic application requires the entire app to be deployed. These can be large impact, high risk deployments. Using microservices, we can deploy to specific services and if problems arise, we can rollback the service where the problem was isolated.

# Composability
With microservices, we can re-use a service's functionality extremely easily allowing for them to be consumed in different ways for different purposes.

# Optimizing for Replaceability
When individual services are small in size, it's much easier to replace them with a better implementation or delete them all together.
