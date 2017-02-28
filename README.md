# ReactDemo
A react demo based on the course by materliu. </br>
imooc:http://www.imooc.com/learn/507 </br>
github:https://github.com/materliu/gallery-by-react. 


## How to use
1. download source code 
2. npm install

## Commands for project
      
      Start for development
      npm start 
      npm run serve

      Start the dev-server with the dist version
      npm run serve:dist

      Just build the dist version and copy static files
      npm run dist

      Run unit tests
      npm test

      Auto-run unit tests on file changes
      npm run test:watch

      Lint all files in src (also automatically done AFTER tests are run)
      npm run lint

      Clean up the dist directory
      npm run clean

      Just copy the static assets
      npm run copy
      
## Tag Description
###   v0.1
用ES6语法和最新的yoeman generator完成课程内容并加以优化（组件分离/修改bug/组件分离）。</br>
complete the project with ES6 and yoeman generator-react-webpack v4.0.1.

## Tips
1.这个版本的react中getInitialState方法已失效，直接在constructor中设置this.state.

##  Questions Remained
1.scss文件编译时候会默认忽略@keyframes，用mixin改写也无法成功导入，目前只能用keyframes.css代替。
     
     
