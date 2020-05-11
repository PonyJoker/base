

'use strict';

const fs = require('fs');
const less = require('gulp-less');
const rename = require('gulp-rename');

class Less{
    constructor(gulp){
        this.gulp = gulp;
    }
    create(){
        
        let output = '';
        fs.readdirSync('./app').forEach(app=>{
            
            if(!fs.existsSync('app/' + app + '/app.less')){
                return;
            }
            output += ['@import "app/', app, '/app.less";\n'].join('');
        });
        fs.writeFileSync('base.tmp.less', output);
        
        return this;
    }
    pipe(){
        
        let gulp = this.gulp;
        return gulp.src('base.tmp.less')
        .pipe(less())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('public'));
    }
    
}

module.exports = Less;

