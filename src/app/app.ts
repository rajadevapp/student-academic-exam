import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Layout } from './layout/layout';
import { ReactiveFormsModule } from '@angular/forms'; // <--- Import this


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,Layout,ReactiveFormsModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'academic-record';
}
