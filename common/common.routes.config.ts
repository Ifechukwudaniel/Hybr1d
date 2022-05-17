import {Application} from 'express'

export abstract  class CommonRoutesConfig{
    app:Application
    name:String

    constructor(app:Application, name:String){
        this.app = app
        this.name = name
    }

    abstract configureRoutes():Application
}
