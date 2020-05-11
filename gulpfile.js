

'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const Less = require('./dev-lib/less.class');
const Jade = require('./dev-lib/jade.class');
const UserScript = require('./dev-lib/user-script2.class');
const Express = require('./lib/service.class.js');

const app = new Express();
app.run();

const base_task_list = '复制外部引入,复制资源,打包样式文件,打包布局文件,打包脚本'.split(',');
const watch_task_list = '监听资源变化,监听引入变化,监听样式文件变化,监听布局文件变化,监听脚本文件变化,监听配置文件变化'.split(',');

gulp.task('test', base_task_list.concat(watch_task_list));


gulp.task('打包样式文件', ()=>new Less(gulp).create().pipe());
gulp.task('复制外部引入', ()=>gulp.src('rel/**/*').pipe(gulp.dest('public/rel')));
gulp.task('复制资源', ()=>gulp.src('resource/**/*').pipe(gulp.dest('public/resource')));
gulp.task('打包布局文件', ()=>new Jade(gulp).create().pipe());
gulp.task('打包脚本', ()=>new UserScript(gulp, true).create().pipe());



// 唤醒任务列表并发送刷新浏览器的脉冲信号
const w_start = task_list=>{
    gulp.start(task_list);
    app.send_reload();
}


gulp.task('监听资源变化', ()=>watch('resource/**/*', ()=>w_start('复制资源')));
gulp.task('监听引入变化', ()=>watch('rel/**/*', ()=>w_start('复制外部引入')));
gulp.task('监听样式文件变化', ()=>watch(['app/**/*.less', 'app/**/*.css'], ()=>w_start('打包样式文件')));
gulp.task('监听布局文件变化', ()=>watch(['app/**/*.jade', 'app/**/*.html'], ()=>w_start('打包布局文件')));
gulp.task('监听脚本文件变化', ()=>watch(['app/**/app.js', 'app/**/meta.json'], ()=>w_start('打包脚本')));
gulp.task('监听配置文件变化', ()=>watch('config.js', ()=>w_start(base_task_list)));
