import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private getAllCategoriesUrl = "http://127.0.0.1:8081/api/v1/categories" //lien de postman
  //delete :
  private deleteCategoryUrl = "http://127.0.0.1:8081/api/v1/categories/";
  //add :
  private addCategoryUrl = "http://127.0.0.1:8081/api/v1/categories";

  constructor(private http: HttpClient) { 

  }

  getAllCategories(){
    let token = localStorage.getItem("mytoken")
     let option = new HttpHeaders().set("Authorization", "Bearer "+token)
     return this.http.get<any>(this.getAllCategoriesUrl, {headers:option});
   }  

   deleteCategory(id: String){
    let token = localStorage.getItem("mytoken")
    let option = new HttpHeaders().set("Authorization", "Bearer "+token)
     return this.http.delete<any>(this.deleteCategoryUrl+id, {headers:option});
   }

   addCategory(id: String){
    let token = localStorage.getItem("mytoken")
    let option = new HttpHeaders().set("Authorization", "Bearer "+token)
     return this.http.post<any>(this.addCategoryUrl, {headers:option});
   }

}
