import * as _ from 'lodash';

import * as request from 'request';
import * as mongoose from 'mongoose';

import {DB_NAME} from '../src/constant';
import '../src/config';

declare var process;

const F = {
  getHtmlByUrl(url, cb){
    request.get(url, (res, json)=>{
      const body = json.body;
      cb(body);
    })
  },

  getBlueBall(html){
    const reg = new RegExp('<font color=blue>[0-9]{2}</font>', 'g');
    const ma = html.match(reg);
    if(ma && ma.length === 2){
      return ma.join('').match(/[0-9]{2}/g);
    }

    return null;
  },
  getRedBall(html){
    const reg = new RegExp('<font color=red>[0-9]{2}</font>', 'g');
    const ma = html.match(reg);

    if(ma && ma.length === 5){
      return ma.join('').match(/[0-9]{2}/g);
    }

    return [];
  },

  getBallDate(html){
    const reg = new RegExp('<td align="right" class=normal>([0-9\-]{10})(\.+)</td>', 'g');
    const ma = html.match(reg);

    if(ma && ma[0]){
      const rs = ma[0].match(/[0-9\-]{10}/g);

      return rs[0];
    }
    
    return null;
  },

  buildSchema(schema){
    const rs = new mongoose.Schema(_.extend({}, schema));
    return rs;
  },

  async initDB(){
    const url = process.env.DB_URL
    const db = await mongoose.createConnection(url, {
      useNewUrlParser: true
    })


    db.on('reconnected', function () {
      console.log('MongoDB reconnected!')
    })

    const rs = db.model(DB_NAME.DLT, this.buildSchema({
      key : String,
      date : String,
      data : [Number],
      year : String,

      blue : [String],
      blue_1 : String,
      blue_2 : String,
      red : [String],
      red_1 : String,
      red_2 : String,
      red_3 : String,
      red_4 : String,
      red_5 : String,
      red_6 : String
    }));

    return rs;
  },

  async saveData(db, d){
    const x = await db.findOne({key: d.key});
    if(!x){
      await db.create(d);
    }
  }
};

class DLT {
  private blue;
  private red: any[];

  private config: any = {};

  constructor(key){
    this.config.key = key.substr(2);
    this.config.url = 'http://www.17500.cn/let/details.php?issue='+this.config.key;

    this.config.year = key.substr(0, 4);
  }

  requestBallData(cb, fcb){
    F.getHtmlByUrl(this.config.url, (html)=>{
      if(!html){
        fcb();
      }
      this.blue = F.getBlueBall(html);
      this.red = F.getRedBall(html); 
      this.config.date = F.getBallDate(html);
      if(this.blue && this.red && this.config.date){
        cb();
      }
      else{
        fcb(true);
      }
    });
  } 

  getData(){
    if(!this.blue || !this.red){
      throw 'invalid data';
    }

    return {
      data : _.map(_.concat(this.red, this.blue), (x)=>parseInt(x, 10)),
      key : this.config.key,
      date : this.config.date,
      year: this.config.year,
      blue : this.blue,
      red : this.red,
      red_1 : this.red[0],
      red_2 : this.red[1],
      red_3 : this.red[2],
      red_4 : this.red[3],
      red_5 : this.red[4],
      red_6 : this.red[5],
      blue_1 : this.blue[0],
      blue_2 : this.blue[1]
    };
  }
};

const D = [
  [2019063, 20190154],

  // [2019001, 2019063],
  // [2018001, 2018154],
  // [2017001, 2017153],
  // [2016001, 2016154],
  // [2015001, 2015153],
  // [2014001, 2014154],
  // [2013001, 2013153],
  // [2012001, 2012154],
  // [2011001, 2011154],
  // [2010001, 2010153],
  // [2009001, 2009153],
  // [2008001, 2008154],
  // [2007001, 2007093]
];

(async ()=>{
  const db = await F.initDB();

  
  let index = 0;
  let min = D[index][0];
  let max = D[index][1];
  const loop = async ()=>{
    
    const key = min.toString();
    console.log('Request DLT Data ----> '+key);
    const ssq = new DLT(key);
    ssq.requestBallData(async ()=>{
      const data = ssq.getData();
      console.log(data.data);
      await F.saveData(db, {
        ...data,
      });

      min++;
      if(min>max){
        index++;
        let tmp = D[index];
        if(!tmp){
          console.log('----- success -----');
          return false;
        }
        min = tmp[0];
        max = tmp[1];
      }
      await loop();

      
    }, async (flag)=>{
      if(flag){
        console.log('----- success -----');
        return false;
      }
      min++;
      if(min>max){
        index++;
        let tmp = D[index];
        if(!tmp){
          console.log('----- success -----');
          return false;
        }
        min = tmp[0];
        max = tmp[1];
      }
      await loop();
    });
  }

  await loop();
  
})();




