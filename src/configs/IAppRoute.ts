import {Router} from 'express'

export default interface IAppRoute{
    createRoute(route: any): Router
}