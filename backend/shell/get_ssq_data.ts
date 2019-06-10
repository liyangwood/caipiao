import * as _ from 'lodash';

import * as request from 'request';
import * as mongoose from 'mongoose';

import '../src/config';

declare var process;

const F = {
  getHtmlByUrl(url, cb){
    request.get(url, (res, json)=>{
      const body = json.body;
      if(body){
        cb(body);
      }
      else{
        cb(false);
      }
      
    })
  },

  getBlueBall(html){
    const reg = new RegExp('<font color=blue>[0-9]{2}</font>', 'g');
    const ma = html.match(reg);
    if(ma && ma[0]){
      return ma[0].match(/[0-9]{2}/g)[0];
    }

    return null;
  },
  getRedBall(html){
    const reg = new RegExp('<font color=red>[0-9]{2}</font>', 'g');
    const ma = html.match(reg);

    if(ma && ma.length === 6){
      return ma.join('').match(/[0-9]{2}/g);
    }

    return [];
  },

  getBallDate(html){
    const reg = new RegExp('<td align="right">([0-9\-]{10})(\.+)</td>', 'g');
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

    const rs = db.model('ssq', this.buildSchema({
      key : String,
      date : String,
      data : [Number],
      year : String,

      blue : String,
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

class SSQ {
  private blue;
  private red: any[];

  private config: any = {};

  constructor(key){
    this.config.key = key;
    this.config.url = 'http://www.17500.cn/ssq/details.php?issue='+key;

    this.config.year = key.substr(0, 4);
  }

  requestBallData(cb, fcb){
    F.getHtmlByUrl(this.config.url, (html)=>{
      if(!html){
        fcb();
      }
      else{
        this.blue = F.getBlueBall(html);
        this.red = F.getRedBall(html); 
        this.config.date = F.getBallDate(html);

        if(this.blue && this.red && this.config.date){
          cb();
        }
        else{
          fcb(true);
        }
        
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
      red_6 : this.red[5]
    };
  }
};

const D = [
  [2019063, 2019154],

  // [2019001, 2019063],
  // [2018001, 2018153],
  // [2017001, 2017154],
  // [2016001, 2016153],
  // [2015001, 2015154],
  // [2014001, 2014152],
  // [2013001, 2013154],
  // [2012001, 2012154],
  // [2011001, 2011153],
  // [2010001, 2010153],
  // [2009001, 2009154],
  // [2008001, 2008154],
  // [2007001, 2007153],
  // [2006001, 2006154],
  // [2005001, 2005153],
  // [2004001, 2004122],
  // [2003001, 2003089]
];

(async ()=>{
  const db = await F.initDB();

  
  let index = 0;
  let min = D[index][0];
  let max = D[index][1];
  const loop = async ()=>{
    
    const key = min.toString();
    console.log('Request SSQ Data ----> '+key);
    const ssq = new SSQ(key);
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




