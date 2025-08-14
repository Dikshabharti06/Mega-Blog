// so that all the env can be treated as strings only
const config={
    appwriteUrl:String(import.meta.env.VITE_ENDPOINT_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_ID),
    appwriteDatabasesId:String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_BUCKET_ID),

}

export default config