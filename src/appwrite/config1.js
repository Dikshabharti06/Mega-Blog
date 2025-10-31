import config from '../config/config.js';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({title, slug, Content, FeaturedImage, status, UserId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug,  //or ID.unique() can also be used
                {
                    title,
                    Content,
                    FeaturedImage,
                    status,
                    UserId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Createpost :: error", error);
            throw error;
        }
    }
    
    async updatePost(slug, {title, Content, FeaturedImage, status, UserId}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    Content,
                    FeaturedImage,
                    status,
                    UserId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Updatepost :: error", error);
            throw error;
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabasesId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    
    // File upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(), 
                file
            );
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error);
            return false;
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error', error);
            return false;
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;