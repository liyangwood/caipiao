import Base from '../Base';
import SsqService from '../../service/SsqService';

export default class extends Base {

  async action(){
    const service = this.buildService(SsqService);
    const param = this.getParam();
    const list = await service.getAll(param);
    return this.result(1, list);
  }
}