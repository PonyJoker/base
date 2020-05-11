
'use strict';
const fs = require('fs');
const rename = require('gulp-rename');
const Config = require('./config.class');

class UseScript{
    constructor(gulp, dev){
        this.dev = dev;
        this.gulp = gulp;
        this.config = new Config().get();
        
        let FN_WRAP = (name, meta, config, body)=>{
            return `
                (()=>{
                let fn_${name} = function(__handler){
                    let __deep_copy = {};
                    for(let key in __handler){
                        __deep_copy[key] = __handler[key];
                    }
                    __deep_copy.name = "${name}";
                    __deep_copy.meta = ${meta};
                    __deep_copy.config = __config__;
                    
                    let $b = __handler;
                    
                    let $this = (__deep_copy.$scope.${name} = {});
                    $this.meta = __deep_copy.meta;
                    
                    ${body}
                }
                app_list.push(fn_${name});
                
                })();
            `;
        }
        
        this.main = (()=>{
            
            let arr = [];
            fs.readdirSync('app').filter(file=>/^\d+\./.test(file)).sort((a, b)=>(parseInt(a) || 0) > (parseInt(b) || 0))
            .forEach(_fileName=>{
                let fileName = _fileName.replace(/^\d+\./, '');
                const path_app = file => ['./app/', _fileName, '/', file].join('');
                let meta = {};
                try{meta = JSON.parse(fs.readFileSync(path_app('meta.json'),'utf-8'));}catch(e){}
                let body = '';
                try{ body = fs.readFileSync(path_app('app.js'),'utf-8');}catch(e){}
                let str = FN_WRAP(fileName, JSON.stringify(meta), JSON.stringify(this.config), body);
                
                arr.push(str);
            });
            
            return arr.join('');
        })();
        
        let _c = (()=>{
            return JSON.stringify(this.config);
        })();
        this.BASE_SCRIPT = `
            'use strict';
            const __dev__ = ${this.dev};
            
            let __config__ = ${_c};
            
            
            if(__dev__){
                
                let key = null;
                $.get('refresh_signal', signal=>{
                    key = signal;
                    setInterval(()=>{
                        
                        if(localStorage.__dev__) return;
                        $.get('refresh_signal', signal=>signal !== key && location.reload());
                    }, 300);                    
                });
            }
            
            let app_list = [];
            
            ${this.main}
            
            const app = angular.module('app', ${this.config.ng_loader});
            let args = ${this.config.ng_handler};
            
            let fn = function(){
                let handler = {};
                
                handler.s = {};
                args.forEach((arg, order)=>{
                    handler[arg] = (handler.s[arg] = arguments[order]);
                });
                
                
                
                app_list.forEach(app=>app(handler));
                
            }
            
            app.controller('myCtrl', args.concat([fn]));        
        `;
    }
    create(){
        fs.writeFileSync('user.tmp.js', this.BASE_SCRIPT);
        return this;
    }
    
    pipe(){
        return this.gulp.src('user.tmp.js')
            .pipe(rename('user.js'))
            .pipe(this.gulp.dest('public'));
    }
}

module.exports = UseScript;
