# Meta Importer
A Webpack loader which, given a file path, will aggregate all of the modules in the same directory into a single export. This is useful for bootstrapping some of the boilerplate code for event handler files.

# Installation
Install using the follow command:

```
npm install @lukestanbery/meta-importer
```

# Usage
The intended use case of this package is to make the process of registering new event handlers more scalable – but perhaps you will find your use case! As an example, let's take this module whose default export is a function to register websocket events:

```ts
// sockets/index.ts

import socketHandlers from "./handlers";

const registerSocketEvents = (socket) => {
    // Additional event registrations
    for (const [event, handler] of Object.entries(socketHandlers)) {
        socket.on(event, handler);
    }

    return socket;
};

export default registerSocketEvents;
```

Let's now place all of our websocket event handlers in a single subdirectory called `handlers`:

![Screenshot 2023-08-13 at 2 11 28 PM](https://github.com/LukeStanbery89/meta-importer/assets/9427182/c374f303-5d7e-4173-b88a-722b08dcf1f4)

Our `index.ts` file probably looks something like this:

```ts
// sockets/handlers/index.ts

import update_sim_progress from "./update_sim_progress";
import update_sim_status from "./update_sim_status";
/// additional imports

const handlers: { [key: string]: (...params: any) => any } = {
    update_sim_progress,
    update_sim_status,
    // additional handlers...
};

export default handlers;
```

This works, but now every time we add a new handler function, we need to add it to our `handlers` export. Instead, let's replace this file with an empty `index.ts` file and add the following to our webpack.config.json:

```js
// webpack.config.json

module.exports = {
    // Other Webpack config values...
    module: {
        rules: [
            {
                test: /handlers\/index.ts$/,
                loader: "@lukestanbery/meta-importer",
                exclude: [/node_modules/],
            },
        ],
    }
};
```

Now all of our new handlers are automatically registered!
