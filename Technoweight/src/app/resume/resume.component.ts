import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface KeySkills {
    language: string;
    languageIcon: string;
    confidenceLevel: string;
    usedInNumberOfProjects: number;
    projectLink: string;
}

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit{

    userIsAuthenticated = true;

    isEditable = true;
    isInputError = false;


    keySkills: KeySkills[] = [
        {
            language: "Angular",
            languageIcon: "../../assets/angular.png",
            confidenceLevel: "50",
            usedInNumberOfProjects: 2,
            projectLink: "/"
        }
    ]

    skill: KeySkills;

    keySkillsMaster: KeySkills[] = [];

    confidenceLevel: string;

    constructor() {
        this.skill = {
            language: "Java",
            languageIcon: "../../assets/java.png",
            confidenceLevel: "50",
            usedInNumberOfProjects: 2,
            projectLink: "/"
        };

        this.keySkills.push(this.skill);

        this.keySkillsMaster = [...this.keySkills];

        console.log("inside constructor");
    }
    
    ngOnInit() {
    }

    onEdit() {
        this.isEditable = true;
        this.keySkills= [...this.keySkillsMaster];
    }

    onSave() {
        let confidenceNumber: number; 
        let projectsNumber: number;

        for(let i = 0; i < this.keySkills.length; i++) {
            try{
                confidenceNumber = +this.keySkills[i].confidenceLevel;
                projectsNumber = +this.keySkills[i].usedInNumberOfProjects;


                if(confidenceNumber < 0 || confidenceNumber === null || isNaN(confidenceNumber)) {
                    window.alert('Input Error: Number must be non negative');
                    break;
                }
                else if(projectsNumber < 0 || projectsNumber === null || isNaN(projectsNumber)) {
                    window.alert('Input Error: Number must be non negative or cannot be alphabets');
                    break;
                }

                else if(typeof projectsNumber !== "number"){
                    window.alert('Input Error: Number must be non negative');
                    break;
                }

                else if(confidenceNumber > 100) {
                    window.alert('Input Error: Confidence should not be greater than 100');
                    break;
                }

                else {
                    console.log(typeof projectsNumber);
                    this.keySkillsMaster = this.keySkills;
                    this.isEditable = false;
                    //This is where the service call must be called
                }             
            }
            catch(error) {
                console.log("inside catch");
                window.alert('Input Error: ' + error);
                break;
            }              
        }         
    }  
    
    onDelete(language: string) {

        this.keySkills = this.keySkills.filter(item => item.language != language);
    }

    onCancel() {
        console.log(this.keySkills);
        console.log(this.keySkillsMaster);
        this.keySkills = [...this.keySkillsMaster];
        this.isEditable = false;
    }
}