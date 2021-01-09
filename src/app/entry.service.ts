import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(public storage: Storage) { }

  public async generateKey(): Promise<string>{
    //debugger;
    let key = `entry${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    // while ret not 0 generate new key
    while(ret){
      key = `entry${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }

  public async read(): Promise<Entry[]>{

    let entries: Array<Entry> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("entry")){
          entries.push(v);
      }
    });

    console.log("Reading entries: ");
    console.log(entries);

    return entries;
  }

  public async readById(id: String): Promise<Entry[]>{

    let entries: Array<Entry> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key == id){
          entries.push(v);
      }
    });

    console.log("Reading entry: ");
    console.log(entries);

    return entries;
  }

  public async create(key: string , entry: Entry){
    console.log("Creating entry: ", entry);
    return await this.storage.set(key, entry);
  }

  public async update(entry: Entry){
    //return await this.storage.set(entry.key, entry);
  }

  public async delete(key: string){
    console.log("Deleting entry with key: ", key);
    return await this.storage.remove(key);
  }

  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
}
