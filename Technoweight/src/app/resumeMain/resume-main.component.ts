import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-resume-main',
    templateUrl: './resume-main.component.html',
    styleUrls: ['./resume-main.component.css']
})
export class ResumeMainComponent implements OnInit {

    slideIndex = 1;

    ngOnInit() {
        this.showSlides(this.slideIndex);
    }

    showSlides(slideNumber) {
        var i;

        //Retrieve the control of element
        var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        var dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

        //Checking the overflow condition
        if( slideNumber > slides.length) {this.slideIndex = 1;}
        if(slideNumber < 1) {this.slideIndex = slides.length - 1; }

        //Initialization of element
        for(i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for(i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        //making  to required slide
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }

    //Moving to next slide
    plusSlides(slideIncrement) {
        this.showSlides(this.slideIndex += slideIncrement);
    }

    //Jumping to required slide
    currentSlide(slideNumber) {
        this.showSlides(this.slideIndex = slideNumber);
    }

}