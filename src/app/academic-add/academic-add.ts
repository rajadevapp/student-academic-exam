import { Component,signal,OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { Api } from '../api';
import { CommonModule } from '@angular/common'; 
import { Student,AcademicExamMark,AcademicExamStudent } from '../model/student';
import { FormsModule,NgForm } from '@angular/forms';
import { ɵconvertToBitFlags } from '../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-academic-add',
  imports: [RouterLink,CommonModule,FormsModule ],
  templateUrl: './academic-add.html',
  styleUrl: './academic-add.css'
})
export class AcademicAdd implements OnInit{
  student:Student = {
    exam_name: '',
    class_id: '',
    section_id: '',
    exam_start_date: '',
    exam_end_date: '',
    exam:[]
  };
  total_mark: any;
  total_mark_scored: any;
  status:any;

  constructor(private api:Api, private router:Router){}
  isModelOpen = signal(false);
  isStudentTable = signal(false);

  getStudentList:any =[];
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
    let total_mark:any = document.getElementById('total_subject_mark_'+studnet_id);
    let total_mark_scored:any = document.getElementById('total_subject_scored_mark_'+studnet_id);
    let status1:any = document.getElementById('status_'+studnet_id);

    this.total_mark = total_mark?.value;
    this.total_mark_scored = total_mark_scored?.value;
    this.status = status1?.value;

    const subjectMark: AcademicExamMark[] = [];

    this.subjectList.forEach((subject:any, index:any) => {
      const total_mark = (document.getElementById(`total_mark_${this.student_id}_${index}`) as HTMLInputElement)?.value || '0';
      const scored_mark = (document.getElementById(`scored_mark_${this.student_id}_${index}`) as HTMLInputElement)?.value || '0';
      const comments = (document.getElementById(`comments_${this.student_id}_${index}`) as HTMLInputElement)?.value || '';

      subjectMark.push({
        subject_id: subject.id,
        total_mark: +total_mark,
        mark_scored: +scored_mark,
        comments: comments
      });
    });

    const studentExam: AcademicExamStudent = {
      student_id: this.student_id,
      total_mark: this.total_mark,
      total_mark_scored: this.total_mark_scored,
      status:this.status,
      subject_mark: subjectMark
    };

    
    const studentIndex = this.student.exam.findIndex((x) => x.student_id === this.student_id);
    if (studentIndex !== -1) {
      this.student.exam[studentIndex] = studentExam;
    } else {
      this.student.exam.push(studentExam);
    }

    const tableIndex = this.getStudentList.findIndex((x:any) => x.id === this.student_id);
    if (tableIndex !== -1) {
      this.getStudentList[tableIndex].total_mark = this.total_mark;
      this.getStudentList[tableIndex].total_mark_scored = this.total_mark_scored;
      this.getStudentList[tableIndex].status = this.status;
    }    

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
    let total_mark_input:any = document.getElementById('total_subject_mark_'+student_id);
    let total_scored_mark_input:any = document.getElementById('total_subject_scored_mark_'+student_id);

    total_mark_input.value = total_mark;
    total_scored_mark_input.value = scored_mark;
  }
  
  // save class change code 
  classStudentChange(){
    let class_id = this.student.class_id;
    let section_id = this.student.section_id;
    
    if(class_id !='' && section_id != ''){
      this.isStudentTable.set(true);
      this.api.getStudent(class_id, section_id,'').subscribe((data)=>{
        this.getStudentList = data.data;
        console.log('Student detail list : '+data);
      },
      (error) => {
        console.error('API Post Error:', error);
        this.errorMsg = error;
      }
      )
    }else{
      this.isStudentTable.set(true);
    }
  }

  ngOnInit(): void {
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
  onSubmit(form:NgForm): void{
    console.log('Form Submitted!', this.student);
    this.api.addAcademicExam(this.student).subscribe((data:any)=>{
      console.log('student save: '+data);
      this.router.navigate(['/student/academic-exam']);
    },
    (error:any) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    }
  )
  }
}
