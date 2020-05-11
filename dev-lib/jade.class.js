

'use strict';
const fs = require('fs');
const jade = require('gulp-jade');
const rename = require('gulp-rename');
const Config = require('./config.class');

let BASE_LAYOUT = `
html
    head
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
{CSS[2]}
        link(rel="stylesheet" type="text/css" href="style.css")
        link(rel="shortcut icon" href="{ICON}")
        title {TITLE}
        
    body.container(ng-app="app" ng-controller="myCtrl")

{PART[2]}    
{SCRIPT[1]}
    script(src="./user.js")
`;

const render = (name, list)=>{
    let tab = 0;
    let space = '';
    name.replace(/\[(\d)\]/, (_, key)=>{
        tab = ~~key;
    });
    while(tab--) space += '    ';
    return space + list.join('\n' + space);
}

class Jade{
    constructor(gulp){
        this.gulp = gulp;
    }
    create(){
        
        let part = [];
        fs.readdirSync('app').filter(file=>/^\d+\./.test(file)).sort((a, b)=>(parseInt(a) || 0) > (parseInt(b) || 0))
            .forEach(_fileName=>{
                let fileName = _fileName.replace(/^\d+\./, '');
                const path_app = file => ['./app/', _fileName, '/', file].join('');
                fs.existsSync(path_app('app.jade')) &&
                    part.push('include ' + path_app('app.jade'));
            });
        
        let config = new Config().get();
        let output = BASE_LAYOUT.replace(/\{[A-Z]+(\[\d\])?\}/gm, key=>{
            switch(key.replace(/[\d\{\}\[\]]/g, '')){
                case 'TITLE':return config.title;
                case 'CSS':return render(key, config.rel_css);
                case 'PART': return render(key, part);
                case 'SCRIPT':return render(key, config.rel_js);
                case 'ICON' : return config.icon;
            }
        });
        
        fs.writeFileSync('base.tmp.jade', output);
        
        return this;
    }
    
    pipe(){
        return this.gulp.src('base.tmp.jade')
            .pipe(jade())
            .pipe(rename('index.html'))
            .pipe(this.gulp.dest('public'))
            ;        
    }
}

module.exports = Jade;