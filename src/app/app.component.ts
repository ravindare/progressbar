import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { config } from '../../src/app/config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private http: Http) { }
  
  selectedOption: string = 'Select';
  i:number = 0 ; 
  httpdata;
  initpbar;
  value = [];
  progressvalue = [] ;
  progresspercent = [] ;
  array1 = ["0","1","2"];

  //This is the Angular init method where the NodeJS Rest API was read and sent to processData method for processing.
  ngOnInit() {
	  
     this.http.get(config.endpoint).
     map((response) => response.json()).
     subscribe((data) => {this.processData(data);})

  }

//This method is processing data read from the REST Api and assign it to the appropriate data structure. Also process the progressbar value and percent. 
  processData(data) {

    this.httpdata = data;
    this.initpbar = this.httpdata ;
	
	for ( this.i  ; this.i< this.initpbar.bars.length ; this.i++ ) {
          this.value [this.i]= this.initpbar.limit ;
          this.progressvalue[this.i] =  this.httpdata.bars[this.i] ;
          this.progresspercent[this.i] = Math.round ( ( (this.progressvalue[this.i]/this.value[this.i]) * 100 ) ) ;
 
	}
  
  }

 //This is the event handler for the button click.
  myClickFunction(event) {
    //just added console.log which will display the event details in browser on click of the button.
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var idAttr = idAttr.nodeValue;
    var str ;
	 this.i=0;

	// If the progress bar A is selected in the dropdown then the following logic will work on the progress bar. 
     if (this.selectedOption === 'ProgressBar A' ) {
           str = this.httpdata.bars[this.i].toString() ;
           str = str + this.array1[this.i].toString();
           //alert (str);

           this.progressvalue[this.i] = parseInt(this.progressvalue[this.i]) + parseInt(idAttr) ;
           this.progresspercent[this.i] = Math.round(((this.progressvalue[this.i]/this.value[this.i]) * 100 )) ;
           if ( parseInt(this.progressvalue[this.i]) >=0 && parseInt(this.progressvalue[this.i]) <= this.value[this.i] )
           {
                document.getElementById(str).style.width = 'progresspercent[0]%';

           } else {

               if ( parseInt(this.progressvalue[this.i]) <= 0 ) {
                      alert("You are going below the minimum limit !");
                      this.progresspercent[this.i] =  Math.round((0));
                      document.getElementById(str).style.width = 'progresspercent[0]%' ;
                }

                if ( parseInt(this.progressvalue[this.i]) > this.value [this.i] ) {
                      alert("You are going beyond the maximum limit !");
                      this.progresspercent[this.i] =  Math.round((100));
                      document.getElementById(str).style.width = 'progresspercent[0]%';
                }
           }
     }

	 // If the progress bar B is selected in the dropdown then the following logic will work on the progress bar. 
     if (this.selectedOption === 'ProgressBar B' ) {

           str = this.httpdata.bars[this.i+1].toString() ;
           str = str + this.array1[this.i+1].toString();
           this.progressvalue[this.i+1] = parseInt(this.progressvalue[this.i+1]) + parseInt(idAttr) ;
           this.progresspercent[this.i+1] = Math.round ( (  (this.progressvalue[this.i+1]/this.value[this.i+1]) * 100 ) ) ;
           if ( parseInt(this.progressvalue[this.i+1]) >=0 && parseInt(this.progressvalue[this.i+1]) <= this.value[this.i+1] )
           {
               document.getElementById(str).style.width = 'progresspercent[1]%';

           } else {

               if ( parseInt(this.progressvalue[this.i+1]) <= 0 ) {
                    alert("You are going below the minimum limit !");
                    this.progresspercent[this.i+1] =  Math.round ((0 ));
                    document.getElementById(str).style.width = 'progresspercent[1]%' ;
                }

                if ( parseInt(this.progressvalue[this.i+1]) > this.value [this.i+1] ) {
                     alert("You are going beyond the maximum limit !");
                     this.progresspercent[this.i+1] =  Math.round (	(100 ));
                     document.getElementById(str).style.width = 'progresspercent[1]%';

                }

            }
      }

	// If the progress bar C is selected in the dropdown then the following logic will work on the progress bar. 
    if (this.selectedOption === 'ProgressBar C' ) {

            str = this.httpdata.bars[this.i+2].toString() ;
            str = str + this.array1[this.i+2].toString();
            this.progressvalue[this.i+2] = parseInt(this.progressvalue[this.i+2]) + parseInt(idAttr) ;
            this.progresspercent[this.i+2] = Math.round ( (  (this.progressvalue[this.i+2]/this.value[1]) * 100 ) ) ;

            if ( parseInt(this.progressvalue[this.i+2]) >=0 && parseInt(this.progressvalue[this.i+2]) <= this.value[this.i+2] )
            {
                 document.getElementById(str).style.width = 'progresspercent[2]%';

            } else {

                if ( parseInt(this.progressvalue[this.i+2]) <= 0 ) {
                     alert("You are going below the minimum limit !");
                     this.progresspercent[this.i+2] =  Math.round ((0));
                     document.getElementById(str).style.width = 'progresspercent[2]%' ;
                }

                if ( parseInt(this.progressvalue[this.i+2]) > this.value [this.i+2] ) {
                     alert("You are going beyond the maximum limit !");
                     this.progresspercent[this.i+2] =  Math.round ((100 ));
                     document.getElementById(str).style.width = 'progresspercent[2]%';

                }

            }
    }

   // If nothing is selected then an alert will come to alert the user to choose a progress bar. 
    if (this.selectedOption === 'Select' ) {
        alert("Please Select the appropriate Progress bar in Options");
    }

 }


 //event handler for the select element's change event
 selectChangeHandler (event) {
    this.selectedOption = event.target.value;
   
 }


}
