import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{

    constructor() {}

    addTask(key: string, task: string){
        localStorage.setItem(key, task);
    }

    getTask(key: string) : Task{
        return JSON.parse(localStorage.getItem(key)!);
    }

    removeTask(key: string){
        localStorage.removeItem(key);
    }

    removeAll(){
        localStorage.clear();
    }

    getAll() : Task[]{
        var allItems : Task[] = [];
        for (let index = 0; index < localStorage.length; index++) {
            var task : Task;
            var key = localStorage.key(index)!; //evitamos que sea null
            task = JSON.parse(localStorage.getItem(key)!);
            allItems.push(task);
        }
        allItems.sort((a, b) => a.id - b.id);
        return allItems;
    }

    keyExists(key: string) : boolean {
        return localStorage.getItem(key) !== null;
    }
}
