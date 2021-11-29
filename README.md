# FractionsCalculator
OneLogin Coding Challenge

## Table of contents
* [Description](#description)
* [Technologies](#technologies)
* [Setup](#setup)
* [Run Instructions](#run)
* [Input Examples](#examples)
* [Navigation](#navigation)

## Description
This project executes operations on fractions and produce a fractional result. This calculator is able to add, substract, multiply and divide, given two operands.
##### Features:
* The input is two operands (numbers) and one operator (*, /, +, -)
* Input numbers can be either a fraction, a whole number (integer) or a mixed number (whole and fraction combined)
* Addition and Substracion of fractions can be either homogeneous or heterogeneous
* Result fraction is simplified if needed. Also it can be represented as a mixed number (in the case of an improper fraction) or a whole number (as a result of simplification process)
* Errors regarding input syntax are handled, as well as mathematical syntax i.e. Division by zero
* Command Prompt is interactive, allowing the user to execute as many operations as desired and exit (end the program) with a command from the commands list.
	
## Technologies
Fractions Calculator is created with the following:
* Node.js version: 16.6.1
* Mocha version: 4.3.4
* Chai version: 9.1.3
	
## Setup
To run this project, following components are needed to be installed:

#### Node.js

Install it locally using npm:

```
$ git clone https://github.com/andrilu/FractionsCalculator.git
$ cd FractionsCalculator
$ npm install
```
#### Mocha

Install with npm globally:

```
$ npm install --global mocha
```
or as a development dependency for your project:

```
$ npm install --save-dev mocha
```

In package.json file, test key will need value `"test": "mocha './test/*.spec.js'"`

#### Chai

Install Chai Assertion Library using npm:

```
$ npm install chai
```

## Run Instructions
To run this application from `FractionsCalculator` directory:

```
$ npm start
```

## Input Examples

```
? 1/2 * 3_3/4
1_7/8
```

```
? 2_3/8 + 9/8
3_1/2
```

## Navigation
This application has a interactive command prompt, which allows as many input operations from the user. This application ends when the user provides the following commands: `q, quit, exit, bye`