import Base from './Base';
import {DB_NAME} from '../constant';

export default class extends Base {
  protected getSchema(){
    return {
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
    }
  }
  protected getName(){
    return DB_NAME.SSQ;
  }

}


