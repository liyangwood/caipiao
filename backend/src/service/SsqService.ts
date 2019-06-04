import Base from './Base';
import {Document} from 'mongoose';

import {DB_NAME} from '../constant';

export default class extends Base {
  public async getAll(param): Promise<Document[]>{
    const db_ssq = this.getDBModel(DB_NAME.SSQ);

    const query:any = {};
    if(param.year){
      query.year = param.year;
    }

    const opts: any = this.setQueryOptions(param);

    return await db_ssq.list(query, opts);
  }
}