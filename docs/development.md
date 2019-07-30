# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop tripicore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/tripicore-node.git
git clone git@github.com:<yourusername>/tripicore-lib.git
```

To develop tripi or to compile from source:

```bash
git clone git@github.com:<yourusername>/tripicoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See tripi documentation for building tripi on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download tripi distribution, you'll need to compile tripid from source, and setup your configuration to use that version.


We now will setup symlinks in `tripicore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf tripicore-lib
ln -s ~/tripicore-lib
rm -rf tripid-rpc
ln -s ~/tripid-rpc
```

And if you're compiling or developing tripicoin:
```bash
cd ../bin
ln -sf ~/tripi/src/tripid
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd tripicore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/tripid.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/tripid.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch tripicore-node.json
touch package.json
```

Edit `tripicore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "tripid",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "tripid": {
      "spawn": {
        "datadir": "/home/<youruser>/.tripi",
        "exec": "/home/<youruser>/tripi/src/tripid"
      }
    }
  }
}
```

**Note**: To install services [tripi-insight-api](https://github.com/tripiproject/insight-api) and [tripi-explorer](https://github.com/tripiproject/tripi-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/tripicore-lib
ln -s ~/tripicore-node
ln -s ~/tripi-insight-api
ln -s ~/tripi-explorer
```

Make sure that the `<datadir>/tripi.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../tripicore-node/bin/tripicore-node start
```