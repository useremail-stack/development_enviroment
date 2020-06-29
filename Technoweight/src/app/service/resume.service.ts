import { Injectable } from '@angular/core';
import { ProfessionalSkills } from '../interfaces/professional-skills';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

//test mock data
import { ProfessionalSkillData, ProjectShowCaseData } from '../interfaces/professional-skills.model';
import { ProjectShowCase } from '../interfaces/project-detail';


@Injectable({ providedIn: 'root'})
export class ResumeService {

    
    professionalSkillListener = new BehaviorSubject<ProfessionalSkills[]>(ProfessionalSkillData);
    projectShowCaseListener = new BehaviorSubject<ProjectShowCase[]>(ProjectShowCaseData);

    professionalSkills: ProfessionalSkills[] = [];
    projectShowCase: ProjectShowCase[] = [];

    


    constructor(private http : HttpClient) { }


    //this must be able to update the data and save new data
    saveData(skills: ProfessionalSkills[]) {
        /*
        for(var skill of skills) {
            var index = ProfessionalSkillData.findIndex(p => p.skillId === skill.skillId);
            ProfessionalSkillData[index] = skill;
        }
        */

    }

    getSkillsData() { 
        
        console.log(ProfessionalSkillData); 
        this.professionalSkills = ProfessionalSkillData;
        this.professionalSkillListener.next([...this.professionalSkills]);
        
       /*
        this.http.get<{skill: ProfessionalSkills[], message: string}>("http://localhost:3000/api/save")
        .subscribe(response => {
            this.professionalSkills = response.skill;
            if(this.professionalSkills) {
                this.professionalSkillListener.next([...response.skill]);
                console.log(response.message);
            }
            
        })
        */

    }

    setDataUpdateListener() {
        return this.professionalSkillListener.asObservable();       
    }

    getProjectsData() {
        this.projectShowCase = ProjectShowCaseData;
        this.projectShowCaseListener.next(this.projectShowCase);   
 
    }

    setProjectShowCaseListener() {
        console.log(this.projectShowCaseListener);
        return this.projectShowCaseListener.asObservable();
    }

    saveExperienceData(experienceForm) {
        const form = new FormData();
        form.append("eventName", experienceForm.value.eventName);
        form.append("eventYear", experienceForm.value.eventYear);
        form.append("eventLocation", experienceForm.value.eventLocation);
        form.append("eventDescription", experienceForm.value.eventDescription);

        //[TODO: pass the data to middle tier]
    }
}