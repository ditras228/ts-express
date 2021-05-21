import * as path from 'path'
import * as nedb from 'nedb'

export default abstract class DataProvider {
    static readonly ROOT_DB_STORE =path.normalize(__dirname+ '/../../db')

    protected dbStore: nedb

    constructor(dbStoreName='data') {
        this.dbStore =new nedb({
            filename:  DataProvider.ROOT_DB_STORE+dbStoreName+'.db'
        })
        this.dbStore.loadDatabase((err => {
            this.onLoadStore(err)
        }))
    }
        protected abstract onLoadStore(err: any): void
}