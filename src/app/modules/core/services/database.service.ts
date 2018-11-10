import { Injectable } from "@angular/core";

import * as appSettings from "application-settings";

interface IKeys {
  currentUser: string;
}

@Injectable()
export class DatabaseService {

    public static KEYS:IKeys = {
        currentUser: 'current-user'
    };

    public setItem(key:string, value:any){
         appSettings.setString(key, JSON.stringify(value));
    }

    public getItem(key:string):any{

        let item = appSettings.getString(key);
        if(item){
            return(JSON.parse(item));
        }

        return(item);
    }

    public removeItem(key:string):void{
         appSettings.remove(key);
    }

}
