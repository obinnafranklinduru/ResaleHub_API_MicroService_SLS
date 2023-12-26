<!--
title: 'User Service'
description: 'The User Service is the backbone of our dynamic online platform, providing essential features for user management and authentication. Seamlessly integrated into our Resale Product Portal, this service empowers users with a secure and personalized experience.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/obinnafranklinduru'
authorName: 'Obinna Franklin Duru'
authorAvatar: 'https://avatars.githubusercontent.com/u/113849511?v=4'
-->

# User Service - [NodeJS Microservice with Serverless]

The User Service is the backbone of our dynamic online platform, providing essential features for user management and authentication. Seamlessly integrated into our Resale Product Portal, this service empowers users with a secure and personalized experience.

## Key functionalities

- Signup and Login
- Verification
- Profile Management
- Shopping Cart Integration
- Payment

## Installation Guide

Install NodeJS atleast v16.xx

- https://nodejs.org/en/

Install Serverless Framework Cli

```
$ npm install -g serverless
$ npm install -g typescript

```

### Plugins Required

```
$ sls plugin install --name serverless-plugin-typescript

```

```bash
$ sls plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
$ sls offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).

### Deployment Command

```
$ sls deploy --verbose

```
