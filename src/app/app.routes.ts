import { Routes } from '@angular/router';
import { AcademicAdd } from './academic-add/academic-add';
import { AcademicEdit } from './academic-edit/academic-edit';
import { AcademicList } from './academic-list/academic-list';
import { AcademicView } from './academic-view/academic-view';

export const routes: Routes = [
    {path:'student/academic-exam', component:AcademicList},
    {path:'student/academic-exam/add', component:AcademicAdd},
    {path:'student/academic-exam/edit/:id',component:AcademicEdit},
    {path:'student/academic-exam/view/:id', component:AcademicView}
];
