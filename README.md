# Order food Add_to_Cart functionlity
In the app User can order food from listed category.

Object contains availability of menu item depending on time.
So depending on time i've disabled and enabled items from the list. So that user can't add those items into cart. 

To aceess menu data i've used .json file. For using .json file you need to deploy this on your server
by using basic steps.

1) I've created menu.json file inside assets folder

2)Go to your angular.cli.json inside your project and inside the assets array put another object
  like this
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "menu.json", "input": "./", "output": "./assets/" }
      ],...
Remember, menu.json is just the example file we've previously added in the assets folder 

3)Try to access your file via localhost. It should be visible within this address,       http://localhost:your_port/assets/menu.json      

If it's not visible than you've done something incorrectly. Make sure you can access it by typing it in the URL field in your browser before proceeding to step #4

4) Now preform a GET request to retrieve your .json file (you've got your full path .json URL and it should be simple)