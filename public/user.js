
            'use strict';
            const __dev__ = true;
            
            let __config__ = {"title":"测试标题","icon":"./resource/icon.gif","angular-service-handler":"$scope,$http,$cookies","angular-service-loader":"ngCookies","rel_css":["link(rel=\"stylesheet\" type=\"text/css\" href=\"./rel/bootstrap/css/bootstrap.min.css\")"],"rel_js":["script(src=\"./rel/jquery.min.js\")","script(src=\"./rel/angular.min.js\")","script(src=\"./rel/angular-cookies.min.js\")","script(src=\"./rel/bootstrap/js/bootstrap.min.js\")"],"port":80,"public":{},"ng_handler":"[\"$scope\",\"$http\",\"$cookies\"]","ng_loader":"[\"ngCookies\"]"};
            
            
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
            
            
                (()=>{
                let fn_nav = function(__handler){
                    let __deep_copy = {};
                    for(let key in __handler){
                        __deep_copy[key] = __handler[key];
                    }
                    __deep_copy.name = "nav";
                    __deep_copy.meta = {"abc":123};
                    __deep_copy.config = __config__;
                    
                    let $b = __handler;
                    
                    let $this = (__deep_copy.$scope.nav = {});
                    $this.meta = __deep_copy.meta;
                    
                    


$b.$scope.a = '4567';
// console.log(1);
                }
                app_list.push(fn_nav);
                
                })();
            
                (()=>{
                let fn_header = function(__handler){
                    let __deep_copy = {};
                    for(let key in __handler){
                        __deep_copy[key] = __handler[key];
                    }
                    __deep_copy.name = "header";
                    __deep_copy.meta = {"test":"test"};
                    __deep_copy.config = __config__;
                    
                    let $b = __handler;
                    
                    let $this = (__deep_copy.$scope.header = {});
                    $this.meta = __deep_copy.meta;
                    
                    


$b.$scope.tt = '您好';
// console.log(1);
                }
                app_list.push(fn_header);
                
                })();
            
                (()=>{
                let fn_footer = function(__handler){
                    let __deep_copy = {};
                    for(let key in __handler){
                        __deep_copy[key] = __handler[key];
                    }
                    __deep_copy.name = "footer";
                    __deep_copy.meta = {"title":"标题啊标题"};
                    __deep_copy.config = __config__;
                    
                    let $b = __handler;
                    
                    let $this = (__deep_copy.$scope.footer = {});
                    $this.meta = __deep_copy.meta;
                    
                    

$this.hello = '这是footer';
                }
                app_list.push(fn_footer);
                
                })();
            
            
            const app = angular.module('app', ["ngCookies"]);
            let args = ["$scope","$http","$cookies"];
            
            let fn = function(){
                let handler = {};
                
                handler.s = {};
                args.forEach((arg, order)=>{
                    handler[arg] = (handler.s[arg] = arguments[order]);
                });
                
                
                
                app_list.forEach(app=>app(handler));
                
            }
            
            app.controller('myCtrl', args.concat([fn]));        
        