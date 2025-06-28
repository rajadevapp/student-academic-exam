import { Component,signal,OnInit } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { Api } from '../api';
import { CommonModule } from '@angular/common'; 
import { Student,AcademicExamStudent,AcademicExamMark } from '../model/student';
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

  studentExam: AcademicExamStudent = {
    student_id: 0,
    total_mark: '',
    total_mark_scored: '',
    status:'',
    subject_mark: []
  };
  subjectMark: AcademicExamMark[] = [];
  
  constructor(private api:Api,private route:ActivatedRoute,private router:Router){}

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
  total_mark: any;
  total_mark_scored: any;
  status:any;
  selectedStudentSubjectMarks: any[] = [];

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

    const studentExam = this.studentExam = {
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

    const inputsToReset = document.querySelectorAll('.rest-input');

    inputsToReset.forEach((input:any) => {
        if (input.type === 'text' ||  input.tagName === 'TEXTAREA') {
            input.value = '';
        }    
    });
    this.closeModel();
  }
  subjet_mark_list:any = [];
    // model code
  openModel(academic_student_id:any, academic_student_name:any){
    this.isModelOpen.set(true);
    this.student_name = academic_student_name;
    this.student_id = academic_student_id;
    const studentExamData = this.student.exam.find(exam => exam.student_id === this.student_id);
    if (studentExamData) {
      this.subjet_mark_list = JSON.parse(JSON.stringify(studentExamData.subject_mark));
      this.status = studentExamData.status;
      this.total_mark = studentExamData.total_mark;
      this.total_mark_scored = studentExamData.total_mark_scored;
    } else {
      this.subjet_mark_list = []; 
      this.status = '';
      this.total_mark = '';
      this.total_mark_scored = '';
    }
    // console.log(this.subjet_mark_list);
  }
  closeModel(){
    this.isModelOpen.set(false);
    this.subjet_mark_list = []; 
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

    this.studentData.student_detail.forEach((element:any) => {
      const subjectMark: AcademicExamMark[] = [];
      element.mark_details.forEach((value:any) => {  
          subjectMark.push({
            subject_id: value.subject_id,
            total_mark: value.total_mark,
            mark_scored: value.mark_scored,
            comments: value.comments
        });
      });
      const studentExam = this.studentExam = {
        student_id: element.student_id,
        total_mark: element.total_mark,
        total_mark_scored: element.total_mark_scored,
        status:element.status,
        subject_mark: subjectMark
      };
  
      const studentIndex = this.student.exam.findIndex((x) => x.student_id === this.student_id);
      if (studentIndex !== -1) {
        this.student.exam[studentIndex] = studentExam;
      } else {
        this.student.exam.push(studentExam);
      }
    });

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
    this.api.updateAcademicExam(this.student,this.id).subscribe((data:any)=>{
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