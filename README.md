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
this is because the shell and the remotes are using different versions of the dummy-login library.


## how to run?

1. clone the repo
2. run `npm install` in the `/shell-repo`
3. run `npm install` in the `/mfe2`
4. run `ng serve shell` in the `/shell-repo`
5. run `ng serve mfe1` in the `/shell-repo`
6. run `ng serve mfe2` in the `/mfe2`
7. open the app on `http://localhost:4200/`, and use the login button. Now navigate to the mfe2 and see it is not working. (this is unsurprising, as the versions are different, which leads to an different instance of the service)

## expectations.

At least an error message that the versions are different, and that the remotes are not able to communicate with the shell. It would be highly preferable if this error would be raised at build time, and not at runtime. At least we should be able to check this when we are building the host application.



