# online-editor

## Overview
Edit a webpage and take a screenshot when done.

See a [Demo] (http://bastiantowers.github.io/online-editor/).

## Development

### Dependencies

What you need to run or use it?
This component needs [HTML2Canvas] (https://github.com/niklasvh/html2canvas) to work properly and export what you see into a downloadable image.

It is included in the package.json of this repository, but all the credits of the image conversion goes to [niklasvh] (https://github.com/niklasvh) and collaborators.

### How to use the component

Clone the repo.

Run `npm install` to get all dependencies.

Run `gulp serve` to see it in action and test that everything is in right place.

### How to setup the development environment

You can run `gulp serve` to start a server at localhost:9000. It also watch for changes and reloads the browsers automatically.

In the HTML you want to edit, you have to load the library.
For example:
```bash
<script src="dist/onlineEditor.js"></script>
```

Then you can instantiate and init the component with the ´init´ method.
For example:
```bash
<script type="text/javascript">
    var myOnlineEditor = new onlineEditor();
    myOnlineEditor.init();
</script>
```

## Contributors

If you have any doubt about this project, here is a list of people who are or
were working on it.

Bastian Towers
torres.sebastiand@gmail.com
