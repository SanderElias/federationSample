# Angular Native federation example.

I created this repo to look into versioning issues I had with [native federation](https://www.npmjs.com/package/@angular-architects/native-federation)
it is mimicking a multi-repo setup.

## shell-repo

this is the root workspace, the [shell](./shell-repo/projects/shell/) is the main entry point for the application.
Also in here lives the [first remote](./shell-repo/projects/mfe1/), which is remote that is loaded by the shell.

Then here lives the [dummy-login](./shell-repo/projects/se-ng/dummy-login/) library, which is a shared library that is used the shell, and all remotes.
it is a ver dumb library that has a shared service with a couple of signals.
This lib is published to NPM with a couple of versions.


## mfe2

this is the second remote, living in a "separate" repo. It is a remote that is loaded by the shell. it uses the dummy-login library from NPM


## the issue
when we have multiple versions of the dummy-login library, the shell and the remotes are not able to communicate with each other.


