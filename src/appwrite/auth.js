import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    //not putting id and endpoint here and making a constructor to utilise the prop of obj
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account= new Account(this.client);

    }
    async createAccount({email, password, name}){
        try{
            const userAccount= await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    async login({email, password}){
        try{        
        //direct return without holding it in var
        return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
          return await this.account.get(); 
        }
        catch(error){
            console.log("Appwrite Serive:: getCurrentUser::error", error);
        }
        //either use if else or return null
        return null;
    }
    async logout(){
        try{
           return await this.account.deleteSessions(); 
        }
        catch(error){
            console.log("Appwrite Serive:: logout::error", error);
        }
    }
}

const authservice= new AuthService();

export default authservice