# You autocomplete me

A web app serving up autocomplete words, dictionary definitions, and possibly tweets and other cool stuff (depending on when you're reading this).  

Based in no small part on [this repository](https://github.com/docdis/autocomplete)

## Why?

Week 3 of learning to code in 8 weeks - the full stack. This exercise is our first taste of the back end, so to speak. 

## What?

A search bar which autocompletes based on the wiktionary list of english words, with an infobox containing definitions, search stats, relevant tweets, and maybe something else.


## How?

### Run this project on your Local Machine

#### Clone the repo:

```sh
git clone https://github.com/CodersInDev/autocomplete.git && cd autocomplete
```

#### Install the node.js devDependencies:

```sh
npm install
```

#### Run the Server with [Nodemon](https://github.com/remy/nodemon):

```sh
npm run nodemon
```

## Features

### Autocomplete Module

+ [x] import a list of words into an array called words
+ [x] search through list of words for a string and return list of suggestions
+ [x] record the string that was searched for

### Autocomplete HTTP Server (API)

+ [x] serve an html page with a ***search box***
+ [x] expose the `ac.findWords` method as an API endpoint /find/:word
+ [ ] display the ***definition*** of a word when the person clicks/taps (*or navigates using the keyboard arrows - for extra credits*!) to their desired word
+ [ ] display the ***history*** of words people have searched for
+ [ ] display the ***stats*** for given words
