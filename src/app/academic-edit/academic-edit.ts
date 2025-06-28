import { Component,signal,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { Api } from '../api';
import { CommonModule } from '@angular/common'; 
import { Student } from '../model/student';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-academic-edit',
  imports: [RouterLink,CommonModule,FormsModule ],
  templateUrl: './academic-edit.html',
  styleUrl: './academic-edit.css'
})
export class AcademicEdit {
  student:Student = {
    exam_name: '',
    class_id: '',
    section_id: '',
    exam_start_date: '',
    exam_end_date: '',
    exam:[]
  };

  constructor(private api:Api,private route:ActivatedRoute){}

  isModelOpen = signal(false);
  isStudentTable = signal(false);
  id!:string|null;
  getStudentList:any =[];
  studentData:any = [];
  classList:any = [];
  sectionList:any = [];
  subjectList:any =[];
  errorMsg = '';
  student_name:any='';
  student_id:any='';

  // model code
  openModel(academic_student_id:any, academic_student_name:any){
    this.isModelOpen.set(true);
    this.student_name = academic_student_name;
    this.student_id = academic_student_id;
    console.log('open model'+this.isModelOpen);
  }
  closeModel(){
    this.isModelOpen.set(false);
  }
  saveMark(studnet_id:any){
    var subject_name:any= document.getElementById('subject_name_1_0');
    console.log(subject_name?.value);

    this.closeModel()
  }

  markCalculation(student_id:any){
    let total_mark:number = 0 ,scored_mark:number = 0;
    for(var i = 0 ; i < 5; i++){
      let subject_total_mark:any = document.getElementById('total_mark_'+student_id+'_'+i);
      let subject_scored_mark:any = document.getElementById('scored_mark_'+student_id+'_'+i);
      if(parseInt(subject_total_mark.value)){
        total_mark  += parseInt(subject_total_mark.value);
      }
      if( parseInt(subject_scored_mark.value)){
        scored_mark += parseInt(subject_scored_mark.value);
      }
    }
    let total_mark_input:any = document.getElementById('total_subject_mark');
    let total_scored_mark_input:any = document.getElementById('total_subject_scored_mark');

    total_mark_input.value = total_mark;
    total_scored_mark_input.value = scored_mark;
  }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.api.getacademicexam(this.id).subscribe((data)=>{
      this.studentData = data.data;
      this.getStudentApi();
      console.log('student data: '+data);
    },
    (error) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    }
    )
      this.api.getClassList().subscribe((data)=>{
        this.classList = data.data;
        console.log('class list: '+data);
      },
      (error) => {
        console.error('API Post Error:', error);
        this.errorMsg = error;
      }
      )

      this.api.getSectionList().subscribe((data)=>{
        this.sectionList = data.data;
        console.log('section list: '+data);
      },
      (error) => {
        console.error('API Post Error:', error);
        this.errorMsg = error;
      }
      )

    this.api.getSubjectList().subscribe((data)=>{
        this.subjectList = data.data;
        console.log('subject list: '+data);
      },
      (error) => {
        console.error('API Post Error:', error);
        this.errorMsg = error;
      }
    )
  }

  getStudentApi(){
    this.student.exam_name =  this.studentData.exam_name;
    this.student.class_id =  this.studentData.class_id;
    this.student.section_id =  this.studentData.section_id;
    this.student.class_name =  this.studentData.class_name;
    this.student.section_name =  this.studentData.section_name;
    this.student.exam_start_date =  this.studentData.exam_start_date;
    this.student.exam_end_date =  this.studentData.exam_end_date;

    this.api.getStudent(this.studentData.class_id,this.studentData.section_id,this.id).subscribe((data)=>{
      this.getStudentList = data.data;
      this.isStudentTable.set(true);
      console.log('student detail list: '+data);
    },
    (error) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    }
  )
  }
  onSubmit(form:NgForm): void{
    console.log('Form Submitted!', this.student);
  }
}
