import { Injectable } from '@angular/core';
import {HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from '../../node_modules/rxjs/dist/types/index';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http:HttpClient) {}

  getStudentList(search?:any, limit?:any):Observable<any>{
    let params = new HttpParams();
    params = params.set('limit', limit); 
    params = params.set('search', search); 
    
    return this.http.get(environment.apiDomain+'/api/v1/student/academic-exam',{params:params});
  }
  getacademicexam(id:any):Observable<any>{
    return this.http.get(environment.apiDomain+'/api/v1/student/academic-exam/view/'+id); 
  }
  deleteacademicexam(id:any):Observable<any>{
    return this.http.delete(environment.apiDomain+'/api/v1/student/academic-exam/delete/'+id); 
  }
  getClassList():Observable<any>{
    return this.http.get(environment.apiDomain+'/api/v1/class');
  }
  getSectionList():Observable<any>{
    return this.http.get(environment.apiDomain+'/api/v1/section');
  }
  getSubjectList():Observable<any>{
    return this.http.get(environment.apiDomain+'/api/v1/subject');
  }
  getStudent(class_id?:any,section_id?:any,academic_exam_id?:any):Observable<any>{
    
    let params = new HttpParams();
    params = params.set('class_id', class_id); 
    params = params.set('section_id', section_id);
    params = params.set('academic_exam_id', academic_exam_id);
    
    return this.http.get(environment.apiDomain+'/api/v1/student/academic-exam/getStudent',{ params: params });
  }
  addAcademicExam(academicExam:any){
    return this.http.post(environment.apiDomain+'/api/v1/student/academic-exam/save',academicExam);
  }
  updateAcademicExam(academicExam:any,id:any){
    return this.http.post(environment.apiDomain+'/api/v1/student/academic-exam/update/'+id,academicExam);
  }
}
