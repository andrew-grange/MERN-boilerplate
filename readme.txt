Hey Jake.
So I trimmed this down as small as I could. There is still probably some stuff in here that you don't need and if you find it you can cut it out as you want.

Your main commands that you need to run to get things going are as follows. They should be run in the root directory (MERN_Boilerplate)

Before you do anything you need to have Mongo up and running. I have included an installation of mongo in the package and you need to run ~/PATH_TO_THE_MONGO_DIRECTORY/mongod to start up the database. You can then run a ~/PATH_TO_THE_MONGO_DIRECTORY/mongo to start the mongo cli if you need to access it at all.

You can now start your server.

To start your server: npm start

Your server serves up an html page with the bundle.js as the main script. You can see this in MERN_Boilerplate/views/layout.pug

Your React app then takes over and mounts to the div(id='root');

Before you can get your React app up and running you need to run a webpack in the client directory. I made an npm shortcut that you can use in the root directory by just typing 'npm run client'. Or you can do it manually by doing a 'cd client' and then running a 'webpack' in that directory. The 'npm run client' does a 'webpack -dw' in the client directory, which stands for dev watch, will make a new build each time you save one of your React files and put it in the /public/build/ directory.

After you have both the npm start and the npm run client running you can actively develop and see your changes as the webpack updates the build.

If you have any questions let me know. I may have forgotten something.
