import UserDataProviders from '../providers/UserDataProviders'
import App from '../App'
import {Request, Response, NextFunction} from 'express'
import SecurityService from '../services/SecurityService'

export default class AuthController {
    private userDataProvider: UserDataProviders

    constructor(private app: App) {
        this.userDataProvider = this.app.providers.user
    }

    login(req: Request, res: Response) {
        const email = req.body.email
        const password = req.body.password

        this.userDataProvider.findOne({email: email}, (err, user)=>{
            if(err){
                res.sendStatus(500)
            }else{
                if(!user || !SecurityService.validatePassword(password, user.password)){
                    res.send({msg:'Incorrect password', code: 400} )
                }else{
                    user.lastVisit = Date.now().toString()
                    this.userDataProvider.update({_id: user._id}, user, ()=>{
                        console.log('User has updated')
                    })
                    req.session.userId=user._id
                    req.send({msg: 'Hello. Welcome back'})
                }
            }
        })
    }

    logout(req: Request, res: Response) {
        let session = req.session
        if(!session){
            res.sendStatus(400)
        }else{
            session.destroy(()=>{
                res.send({msg: 'Goodbye. See you soon'})
            })
        }
    }

    checkLoginSession(req: Request, res: Response, next: NextFunction) {
        let session  = req.session
        if(~['/logout', '/add'].indexOf(req.path)){
                if(!session.userId){
                next()
            }else{
            res.sendStatus(406)
            }
        }else{
            if(session.userId)
                next()
            else
            res.sendStatus(406)
        }

    }
}