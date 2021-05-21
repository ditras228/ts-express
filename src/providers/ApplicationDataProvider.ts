import DataProvider from './DataProvider'
import UserDataProviders from './UserDataProviders'

export default class ApplicationDataProvider{
    private storage: DataProvider[]

    constructor() {
        this.storage=this.getProviders()
            .map(provider=>new provider())
    }
    getInstanceProvider(type: any | null): any | null{
        let items = this.storage.filter(provider=>{
            if(provider instanceof type){
                return provider
            }
        })
        return items.length>0? items[0]: null
    }
    get user(): UserDataProviders{
        return this.getInstanceProvider(UserDataProviders)
    }
    private getProviders(): any[]{
        return[
            UserDataProviders
        ]
    }


}