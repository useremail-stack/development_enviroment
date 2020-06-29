import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, QueryList, ViewChildren, Renderer2 } from '@angular/core';
import { ProfessionalSkills } from '../interfaces/professional-skills';
import { ResumeService } from '../service/resume.service';
import { Subscription } from 'rxjs';
import { ProjectShowCase } from '../interfaces/project-detail';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';



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

    @ViewChild('additionalSkill')
    additionalSkill: ElementRef;
    
    slideIndex = 1;

    private professionalSkills : ProfessionalSkills[] = [];
    private projectShowCase: ProjectShowCase[] = [];
    private projectShowCase2D: ProjectShowCase[] = [];

    temporaryProfessionalSkills: ProfessionalSkills[] = [];

    isEditable = false;
    skillSubsciber: Subscription;
    projectSubsciber: Subscription;

    experienceForm: FormGroup;

    constructor(private resumeService: ResumeService, private ref: ChangeDetectorRef, private render2: Renderer2) {}    

    

    ngOnInit() {
        //1. Display the slides for project display
        

        //2. Retrieve all the skill data
        this.resumeService.getSkillsData();
        this.skillSubsciber = this.resumeService.setDataUpdateListener().subscribe(data => {
            this.professionalSkills = data;
        });

        this.resumeService.getProjectsData();
        this.projectSubsciber = this.resumeService.setProjectShowCaseListener().subscribe(data => {          
            this.projectShowCase = data;      
        });

        //this.showSlides(this.slideIndex); 

        this.projectSlider();

        this.experienceForm = new FormGroup({
            'eventName': new FormControl(null),
            'eventYear': new FormControl(null),
            'eventLocation': new FormControl(null),
            'eventDescription': new FormControl(null)
        });
    }


    startSlider() {

        /*
        console.log(this.$sliderContainer);
        console.log(this.$silderBox);
        console.log(this.$slidereList);
 
        //this.interval = setInterval(function() {
            this.$silderBox.animate({'margin-left': '-='+this.width}, this.animationSpeed, function() {
                this.currentSlide++;
                if(this.currentSlide === (this.$slidereList.length / 3)) {
                    this.currentSlide = 1;
                    this.$silderBox.css('margin-left', 0);
                }
            });
        //}, this.pause);
            */

    }

    convert1Dto2D(array, elementsPerArray) {
        var newArray = [];
        while(array.length) newArray.push(array.splice(0, elementsPerArray));


        return newArray;
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
        this.projectSubsciber.unsubscribe();
    }

    //------------PROJECTS SECTION STARTS HERE---------------------------------


    projectSlider() {
        $(document).ready(function() {

            var width;
            var animationSpeed = 1000;
            var currentSlide = 1;

            var $sliderContainer;
            var $silderBox;
            var $slidereList;
            var $forwardButton =  $('.forwardButton');
            var $backwardButton =  $('.backwardButton');


            $sliderContainer = $('.project-container');
            $silderBox = $sliderContainer.find('.project-unordered-list');
            $slidereList = $silderBox.find('.project-items');

            width = $sliderContainer.width();

            //Event when forward button is clicked
            $forwardButton.click(function() {
                
                currentSlide++;

                if(currentSlide > ($slidereList.length / 3)) {
                    $silderBox.animate({'margin-left': '0px'}, animationSpeed, function() {
                        currentSlide = 1;
                    })
                }
                else {
                    $silderBox.animate({'margin-left': '-='+width}, animationSpeed);
                }
                
            });

            //Event when backward button is clicked
            $backwardButton.click(function() {
                if(currentSlide > 1) {
                    $silderBox.animate({'margin-left': '+='+width}, animationSpeed, function() {
                        currentSlide--;
                    });
                }
            })
        });
    }

    onExperienceSubmit() {
        console.log("in experience submit");

        

        if(!this.experienceForm.invalid) {

            this.resumeService.saveExperienceData(this.experienceForm);

            this.experienceForm.reset();
        }
    }

}