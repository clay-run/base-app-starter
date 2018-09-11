# Clean up previous build
rm -rf ./build-front/

# Create folder
mkdir ./build-front/

# Build with webpack
NODE_ENV=production webpack -p --config webpack.prod.config.js

# Add index.html
cp ./src/index.html ./build-front/index.html

# Add assets
cp -r ./src/assets ./build-front/assets