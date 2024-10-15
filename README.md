# Unofficial Unsplash SDK

Javascript fully typed wrapper for the [Unsplash API](https://unsplash.com/developers).

## Why this?

For some unknown reason, the [official Unsplash Javascript SDK](https://github.com/unsplash/unsplash-js) has been archived, and it is quite outdated and/or incomplete.

With this SDK, I intend to provide a more complete and up-to-date wrapper for the Unsplash API.

The library is based in the official, but with some key changes in the response handling, which always will returns an object with the properties `data`, `error` and `total`.

## Installation

This is a Deno package, but it can be used in Node.js as well.

You can find the installation commands for every package manager in the [jsr package documentation](https://jsr.io/@anjerodev/unsplashjs).

## Usage

### Declare the client

To ensure your access keys remain confidential, the API client should be configured and run on the server. Refer to [Obtaining an Unsplash Access Key](#obtaining-an-unsplash-access-key) for details on acquiring the key.

As mention in the [official documentation](https://github.com/unsplash/unsplash-js):

> NOTE: If you're using the SDK publicly in the browser, you'll need to proxy your requests through your server to sign the requests with the Access Key to abide by the [API Guideline](https://help.unsplash.com/articles/2511245-unsplash-api-guidelines) to keep keys confidential. We provide an `apiUrl` property that lets you do so. You should only need to provide _one_ of those two values in any given scenario.

```ts
import UnsplashClient from "unsplashjs";

// On the server
const unsplash = new UnsplashClient({
  accessKey: "YOUR_ACCESS_KEY",
  //...other options
});

// On the client
const unsplash = new UnsplashClient({
  apiUrl: "https://mywebsite.com/unsplash-proxy",
  //...other options
});
```

### Making a request

```ts
import UnsplashClient from "unsplashjs";

// On the server
const unsplash = new UnsplashClient({
  accessKey: "YOUR_ACCESS_KEY",
});

unsplash.photos.get({ photo_id: "123" }).then((result) => {
  const { data, error, total } = result;

  if (error) {
    console.error(error);
    // Handle the error
    return;
  }

  // Do something with the data
  console.log({ data });
});
```

### Obtaining an Unsplash Access Key

Create an account on [Unsplash](https://unsplash.com/join), and then on your [Developer dashboard](https://unsplash.com/oauth/applications), create a new application.

## What this library adds to the official Unsplash API

- More complete and updated types.
- Automatic type inference for getRandom photos depending if `count` params is provided or not.
- Bring back Authentication workflow methods.
