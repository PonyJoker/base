


'use strict';
const fs = require('fs');

class Config{
    constructor(){
        this.instance = null;
        try{
            this.instance = JSON.parse(
                fs.readFileSync('./config.json', 'utf-8')
            );
            this.instance.ng_handler = JSON.stringify(this.instance['angular-service-handler'].split(','));
            this.instance.ng_loader = JSON.stringify(this.instance['angular-service-loader'].split(','));
        }catch(e){console.log(e)}
    }
    get(){
        return this.instance;
    }
}

module.exports = Config;