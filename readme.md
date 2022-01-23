```sh
# install yarn binaries globally:
npm install --global yarn

# install dependencies:
yarn install
# run this when doing an initial setup, 
# or processing changes in package.josn files 
# in both server and client folders

# install and update only server's package.json:
yarn --cwd server <package name>

# run dev server (2 in 1):
yarn dev

# run only server side:
yarn --cwd server dev
```