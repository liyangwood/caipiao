import * as _ from 'lodash'

export default class Base {
    protected db
    private session
    protected currentUser

    constructor(db, session){
        this.db = db
        this.session = session
        this.currentUser = session.user

        this.init()
    }

    protected init(){}

    public getDBModel(name: string){
        return this.db.getModel(name)
    }

    protected getService<T extends Base>(service: { new(...args): T }): T{
        return new service(this.db, this.session)
    }

    protected setQueryOptions(param){
        const rs:any = {};
        if(param.size){
            rs.limit = _.toNumber(param.size);

            if(param.page){
                rs.skip = _.toNumber(param.size) * (_.toNumber(param.page)-1);
            }
        }

        return rs;
    }

    
}