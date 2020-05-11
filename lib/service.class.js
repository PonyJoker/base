

'use strict';

const fs = require('fs');
const express = require('express');
const Config = require('../dev-lib/config.class');

class Service{
    constructor(dev){
        this.dev = dev || true;
        this.port = new Config().get().port || 80;
        this.app = new express();
        
        this.reload = Math.random();
    }
    
    run(){
        
        this.app.use(express.static('public'));
        this.app.listen(this.port);
        this.app.get('/refresh_signal', (req, res)=>res.send(this.reload.toString()));
    }
    
    // 发送一个刷新的脉冲信号
    send_reload(){
        this.reload = Math.random();
    }
}

module.exports = Service;