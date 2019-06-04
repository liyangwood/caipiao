import Base from '../Base';
import SsqService from '../../service/SsqService';
import {DB_NAME} from '../../constant';

export default class extends Base {

  async action(){
    const service = this.buildService(SsqService);
    const db = service.getDBModel(DB_NAME.SSQ);
    const num = await db.count();
    return this.result(1, num);
  }
}