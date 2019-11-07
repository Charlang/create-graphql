# create-apollo-graphql

It's could be boilerplate to create GraphQL application on both node.js server app and single spa client app.

Here we developed a node.js CLI which try to make developer's life much easier.

Create Apollo Graphql Server / Client apps with no build configuration.

Create React App works on macOS, Windows, and Linux.

If something doesn’t work, please file an [issue](https://github.com/Charlang/create-apollo-graphql/issues/new).

## Pre installation (build and debug)

    nodejs(>v12.0.0)
    yarn or npm(>5.2.0)

## How to use

    $npx create-apollo-graphql

## Why Apollo GraphQL

Most popular among all those GraphQL frameworks: [Apollo](https://www.apollographql.com) / [Bit](https://github.com/teambit/bit) / [Relay](https://github.com/graphql/graphql-relay-js) / [Prisma](https://www.prisma.io/with-graphql/) [...](https://blog.bitsrc.io/13-graphql-tools-and-libraries-you-should-know-in-2019-e4b9005f6fc2)

Provide both Server side and Client side [typescript](https://www.typescriptlang.org/docs/handbook/jsx.html) template implementation with seamless integration, better suite our domain driven design architecture

Apollo Server datasource can easily integrate with our RESTFul and JSON-RPC api, separate authentication concern from BE JSON-RPC implementation

Apollo Client has default implementation using React, amazing feature like hooks / render props / cache policy out of box make FE integration simple and stupid(KISS)

Best devtool add-ons make developer life much easier

## Related articles

1. Get deep dive of [Apollo GraphQL](https://www.apollographql.com/docs/).

2. If you are seeking for other alternatives for graphql, the [how to graphql](https://www.howtographql.com/) website could be a start, [tools](https://blog.bitsrc.io/13-graphql-tools-and-libraries-you-should-know-in-2019-e4b9005f6fc2) could speed up your development.

3. If you are seeking for community support of [graphql](https://graphql.github.io/)

4. For people not familiar with Node.js, security vulnerability concerns may stop you from moving forward, below blogs may help ease your concern

    4.1 [Node.js security best practices](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d)

    4.2 [Node.js Vulnerability Statistics](https://www.cvedetails.com/product/30764/Nodejs-Node.js.html?vendor_id=12113)

    4.3 [Node.js Security Vulnerabilities list](https://www.cvedetails.com/vulnerability-list.php?vendor_id=12113&product_id=&version_id=&page=1&hasexp=0&opdos=0&opec=0&opov=0&opcsrf=0&opgpriv=0&opsqli=0&opxss=0&opdirt=0&opmemc=0&ophttprs=0&opbyp=0&opfileinc=0&opginf=0&cvssscoremin=0&cvssscoremax=0&year=0&month=0&cweid=0&order=1&trc=53&sha=94bc04a83d9407dd349a4f1d7130e3451335037d)
