import UserDataProviders from './providers/UserDataProviders'
import ApplicationDataProvider from './providers/ApplicationDataProvider'

export default class App{
   private dataProviders: ApplicationDataProvider
   get providers(): ApplicationDataProvider{
       return this.dataProviders
   }
}