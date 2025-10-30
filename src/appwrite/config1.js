import config from '../config/config.js';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket= new Storage(this.client);
    }
    
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                // ID.unique, (unique id can also be used instead of slug)
                slug,
                {title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Createpost :: error", error)
        }
    }
    
    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug,
                {   title,
                    content,
                    featuredImage,
                    status,
                    userId}
            )
        } catch (error) {
            console.log("Appwrite service :: Updatepost :: error",error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug,
            );
            return true
        } catch (error) {
            console.log("Appwrite service:: deletePost ::error", error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service:: getPost ::error", error);
            return false
        }
    }
    //for using Query we need indexes and queries is just a variable here
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service:: getPosts ::error",error);
            return false
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service:: uploadFile::error', error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log('Appwrite service:: deleteFile::error', error);
            return false
        }
    }
    //fast response n doesn't return promise so can be used without async await
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
    
}

const service= new Service();
//exporting object which is mmade using 'new'
export default service;