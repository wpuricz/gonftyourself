## Download and Installation

Tools Needed:
1. Git
2. Node.js - preferably Node.js version 14 or higher, but older should work fine as well
3. Visual Studio Code or any code editor. VS Code works great for javascript development! https://code.visualstudio.com/

```
    git clone https://github.com/wpuricz/gonftyourself.git
    cd gonftyourself
    npm install
    npm run dev
```

This will run on http://localhost:3000/

## Contributing

Email me your github account and I will add you as a contributor to the repository. You will recieve an email asking to accept a request to be a contributor. 

To make/submit a code change do the following steps:

1. Create a new branch (i.e. feature/my-new-feature or bugfix/some-bug)
2. After editing and testing the code, then stage, commit, and push your code
3. Put in a Pull Request from your branch to the master branch

This can also be done inside VSCode, or it can be done at the terminal as shown below.

```
    git checkout -b feature/some-feature
    // now make your changes
    git add file1.js file2.js
    git commit -m "Commit message describing commit"
    git push origin feature/some-feature
```

Then go to https://github.com/wpuricz/gonftyourself/pulls and create a new pull request. Github should already have a button asking you to create a pull request off your recently pushed bracnch.


## Application Structure
This follows the basic react folder and file structure. All code is under the /src folder.

* **Main Application files:** App.js, index.js, server.js 
* **/src/components:** Folder for components that sit inside pages
* **/src/layout:** Folder for layout strucuture of site
* **/src/pages:** Full pages or Screens in application
* **/src/services:** For anything that calls an api
* **/src/styles:** CSS files. CSS files should be broken into a file for each page. Global styles should go in index.css
* **/src/utils:** Utility / helper classes and constants

For testing, we are working on the Rinkeby network (the most popular ethereum test network)

## Crypto Wallet
The easiest thing to do is just install metamask (https://metamask.io/) as an add-on for your browser. After installing and setting it up, make sure select the Rinkeby network in the wallet. 

To get ETH on the rinkeby network follow the instructions here https://faucet.rinkeby.io/ or ask one of us to send you some ETH. Also note on the testnet you will need Wrapped ETH(WETH) when submitting bids on auctions, you can swap ETH for WETH inside metamask. You will need to add a new token in metamask to see your WETH. Use this token address **0xc778417e063141139fce010982780140aa0cd5ab**

## Resources
* **Postman**: There is a postman collection in the repository for the open sea api for the 2 main requests we are using. The file named (**GoNFTYourself.postman_collection.json**) can be imported into Postman( https://www.postman.com/) 
* **Testnet:** https://testnets.opensea.io/collection/carbureted
* **OpenSea SDK Docs:** https://github.com/ProjectOpenSea/opensea-js
* **OpenSea API Docs:** https://docs.opensea.io/reference/api-overview


## Bugs and Issues

Have a bug or an issue with this template? Open a new issue here on GitHub.

## Copyright and License

Copyright 2021 Go!NFT Yourself. Code released under the [MIT license](LICENSE).


