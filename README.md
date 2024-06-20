# Reverse and Change Case Application

This is a simple JavaScript Application. It uses node to execute the backend application.
The application entrypoint is the `src/index.js` file. 

This application takes a string as input and returns the reverse of the string and the string in uppercase.

It is syntactically correct and has no errors. But there are some issues. 

Can you spot all the issues in 10 minutes for $200 USDC?

## Build the application

With the Docker engine running, build the application using the Cartesi CLI by running:

```
cartesi build
```

This command builds a Cartesi machine and compiles your application so that it is ready to receive requests and inputs. 

## Run the application

Run the application using the Cartesi CLI by running:
```
cartesi run
```

Running your application starts a local Anvil node on port `8545`.

The `cartesi run` command activates several services essential for node operation:

- Anvil Chain: Runs a local blockchain available at http://localhost:8545.

- GraphQL Playground: An interactive IDE at http://localhost:8080/graphql for exploring the GraphQL server.

- Blockchain Explorer: Monitors node activity and manages transactions via http://localhost:8080/explorer/.

- Inspect: A diagnostic tool accessible at http://localhost:8080/inspect/ to inspect the node’s state.


## Interact with the application

Your application is now ready to receive inputs:

Send an input by running:

```
cartesi send generic
```

The command sends an input to the application and triggers the off-chain computation. The output is then sent back to the Rollup Server as a notice.

```shell
> cartesi send generic
? Chain Foundry
? RPC URL http://localhost:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 9999.963673731053434427 ETH
? Application address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
? Input String encoding
? Input (as string) "Hello Cartesi"
✔ Input sent: 0x8cba66f7a739962742dd404fcfb3d143f5aa953425e33de5513255589b69ad05
```

## Query notices

In the GraphQL playground hosted on `http://localhost:8080/graphql`, you can query notices using the following query:

```graphql
query notices {
  notices {
    edges {
      node {
        index
        input {
          index
        }
        payload
      }
    }
  }
}
```

## Conclusion

Voila! You have successfully built a simple application on Cartesi. You can now build more complex applications using Cartesi's powerful off-chain computation capabilities.

The complete source code is available in the `src/index.js` file. Feel free to modify and experiment with it.