import Base from '../Base';
import SsqService from '../../service/SsqService';

export default class extends Base {

  async action(){
    const service = this.buildService(SsqService);
    const param = this.getParam();
    const red = param.red;
    let n = red; 
    let isBlue = false;
    if(!red){
      n = param.blue;
      isBlue = true;
    }
    
    const d = await service.getHappenRateByNumber(n, isBlue);
    return this.result(1, d);
  }
}