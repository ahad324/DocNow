import { Client, Account, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66aa0dfb002f53cb76dc");

const account = new Account(client);
const storage = new Storage(client);
const BUCKET_ID = "66aa2563000df08db453";
const PROJECT_ID = "66aa0dfb002f53cb76dc";

export { client, account, storage, BUCKET_ID, PROJECT_ID };
