export interface Student {
  exam_name: string;
  class_id: string;
  section_id: string;
  class_name?:string;
  section_name?:string;
  exam_start_date: string;
  exam_end_date: string;
  exam:AcademicExamStudent[];
}

export interface AcademicExamStudent {
  student_id: number;
  total_mark: string;
  total_mark_scored: string;
  status: string;
  subject_mark: AcademicExamMark[];
}

export interface AcademicExamMark {
  subject_id: number;
  total_mark: number;
  mark_scored: number;
  comments: string;
}
