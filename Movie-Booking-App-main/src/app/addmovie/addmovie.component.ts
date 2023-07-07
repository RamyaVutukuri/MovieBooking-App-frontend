import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  ticketsStatus !: string ;

 public movie = {
    movieName :'',
    theatreName :'',
    noOfTicketsAvailable :0 ,
    ticketsStatus :''
  }

  messages : string =""

  constructor(private movieService:UserService,private router:Router) { }

  addMovie(){
    this.movie.ticketsStatus = this.ticketsStatus
    this.movieService.addMovie(this.movie).subscribe(
      (data: any)=>{
        Swal.fire('Movie Added Successfully',data,'success');
        console.log(data);
        this.router.navigate(['/api/v1.0/moviebooking/all']);
      },
      (error: any)=>{
        Swal.fire('Movie is already present',error,'error');
        console.log(JSON.stringify(error));
        this.router.navigate(['/api/v1.0/moviebooking/addMovie']);
      }
    );
    console.log(this.movie)
  }



  ngOnInit(): void {
    
  }

}