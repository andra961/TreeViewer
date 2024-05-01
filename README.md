# Tree Viewer

A `react.js` app to visualize a Binary Tree parsed from user input. The default parser takes an input such as [1,2,3,null,4]: it represents the serialized format of a binary tree using level order traversal, where null signifies a path terminator where no node exists below.
The parser code is shown in the `Parser` panel and can be edited directly by the user and run when the input is parsed.
**_NOTE:_**: The function in the `Parser` panel will be directly executed on your input in the browser so be careful to not paste any malicious code in it.

# Try it yourself

The app is hosted live on https://andra961.github.io/TreeViewer/, give it a try!

## Install

First, be sure to have `Node.js` installed. In the root of the project run:

```shell
npm install
```

to install the npm packages.

## Launch the project

Launch the project through the following command:

```shell
npm run dev
```

This should launch the web app on http://localhost:5173.
