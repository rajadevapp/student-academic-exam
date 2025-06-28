import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Api } from '../api';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-academic-view',
  imports: [RouterLink,CommonModule],
  templateUrl: './academic-view.html',
  styleUrl: './academic-view.css'
})
export class AcademicView implements OnInit{

  id!:string|null;
  studentData:any = [];
  errorMsg = '';
  constructor(private route:ActivatedRoute,private api:Api){}


  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getacademicexam(this.id).subscribe((data)=>{
      this.studentData = data.data;
      console.log('student data: '+data);
    },
    (error) => {
      console.error('API Post Error:', error);
      this.errorMsg = error;
    }
    )
  }
}
