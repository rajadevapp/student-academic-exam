import { Component,OnInit,signal } from '@angular/core';
import { Api } from '../api';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-academic-list',
  imports: [CommonModule,HttpClientModule,RouterLink,FormsModule],
  templateUrl: './academic-list.html',
  styleUrl: './academic-list.css'
})
export class AcademicList implements OnInit{
 
  deleteMessage:string = '';
  limit:any = 10;
  search:any = '';
  studentList:any = [];
  errorMsg = '';
  isModelOpen = signal(false);
  constructor(private api:Api){}

  filterChange(){
    this.getStudentList();
  }
  ngOnInit(): void {
      this.getStudentList();
  }
  openModel(){
    this.isModelOpen.set(true);
    console.log('open model'+this.isModelOpen);
  }
  closeModel(){
    this.isModelOpen.set(false);
  }
  deleteAcademicExam(id:any){
    this.api.deleteacademicexam(id).subscribe((data)=>{
      this.deleteMessage = data.message;
      console.log('student delete: '+data);
    },
    (error) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    })
    this.getStudentList();
    this.openModel();
  }
  getStudentList(){
    this.api.getStudentList(this.search,this.limit).subscribe((data)=>{
      this.studentList = data.data;
      console.log('student list: '+data);
    },
    (error) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    })
  }
}
