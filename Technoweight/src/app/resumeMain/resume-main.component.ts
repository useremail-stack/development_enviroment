import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ProfessionalSkills } from '../interfaces/professional-skills';
import { ResumeService } from '../service/resume.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-resume-main',
    templateUrl: './resume-main.component.html',
    styleUrls: ['./resume-main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeMainComponent implements OnInit, OnDestroy {

     
    @ViewChildren('skillLanguage')
    skillLanguage: QueryList<ElementRef>;

    @ViewChildren('skillLevel')
    skillLevel: QueryList<ElementRef>;
    
    slideIndex = 1;

    private professionalSkills : ProfessionalSkills[] = [];

    temporaryProfessionalSkills: ProfessionalSkills[] = [];

    isEditable = false;
    skillSubsciber: Subscription;

    constructor(private resumeService: ResumeService, private ref: ChangeDetectorRef) {}    

    

    ngOnInit() {
        //1. Display the slides for project display
        this.showSlides(this.slideIndex);

        //2. Retrieve all the skill data
        this.resumeService.getSkillsData();
        this.skillSubsciber = this.resumeService.setDataUpdateListener().subscribe(data => {
            this.professionalSkills = data;
        });
        
    }


    //Detects the change in input tags and updates the professional skill array that the input is changed
    changeDetect(skill: ProfessionalSkills, inputValue: string, inputFieldType: string) {
        //1. Save changes in local temporary variable

        var changedSkill: ProfessionalSkills;
        
        if(inputFieldType === "language") {
            changedSkill = {
                skillId: skill.skillId,
                language: inputValue,
                knowledgeLevel: skill.knowledgeLevel
            }
        }
        if(inputFieldType === "skillLevel") { 
            changedSkill = {
                skillId: skill.skillId,
                language: skill.language,
                knowledgeLevel: +inputValue
            }
        }

        console.log(changedSkill);

        //2. Push the local changes to temporary array
        var index = this.temporaryProfessionalSkills.findIndex(p => p.skillId === skill.skillId);
        console.log(index);
        if(index === -1) {
            this.temporaryProfessionalSkills.push(changedSkill);     
        }
        else {
            this.temporaryProfessionalSkills.map(item => {
                if(item.skillId === changedSkill.skillId) {

                    if(inputFieldType === "language") {
                        item.language = inputValue;
                    }
                    if(inputFieldType === "skillLevel") {
                        item.knowledgeLevel = +inputValue;
                    }

                }
                return item;
            });
        }
    }

    getDataAndUpdateView() {
        //1. Get the data from service
        //2. Use View children to update the view with data from service 
        this.isEditable = false;
        this.resumeService.getSkillsData();
        this.skillSubsciber = this.resumeService.setDataUpdateListener().subscribe(data => {
            console.log(data);

            for(var skill of this.professionalSkills) {

                    let index = this.professionalSkills.findIndex(p => p.skillId === skill.skillId);

                    let skillLanguageArray = this.skillLanguage.toArray();
                    skillLanguageArray[index].nativeElement.value = data[index].language;

                    let skillLevelArray = this.skillLevel.toArray();
                    skillLevelArray[index].nativeElement.value = data[index].knowledgeLevel;
                           
                }          

            this.professionalSkills = data;
            this.ref.detectChanges();
        });
    }

  
    onSave() {
        //1. Push the temporary array for save 
        //2. Disable the edit mode
        this.resumeService.saveData([...this.temporaryProfessionalSkills]);
        this.isEditable = false;

        //3. Clear the temporary array
        this.temporaryProfessionalSkills = [];

        //4. Get data and update view with saved data
        this.getDataAndUpdateView();
        
    }

    onEdit() {
        //1. Turn on the editable mode
        this.isEditable = true;
    }

    onCancel() {
        //1. Eiditable mode is switched off
        //2. Get data and update view with default data
        this.getDataAndUpdateView();
    }


    ngOnDestroy() {
        this.skillSubsciber.unsubscribe();
    }

    //------------PROJECTS SECTION STARTS HERE---------------------------------

    //Shows the slide show for Project showcase
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