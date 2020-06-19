import { Injectable } from '@angular/core';
import { ProfessionalSkills } from '../interfaces/professional-skills';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

//test mock data
import { ProfessionalSkillData, ProjectShowCaseData } from '../interfaces/professional-skills.model';
import { ProjectShowCase } from '../interfaces/project-detail';


@Injectable({ providedIn: 'root'})
export class ResumeService {

    
    professionalSkillListener = new BehaviorSubject<ProfessionalSkills[]>(ProfessionalSkillData);
    projectShowCaseListener = new BehaviorSubject<ProjectShowCase[]>(ProjectShowCaseData);

    professionalSkills: ProfessionalSkills[] = [];
    projectShowCase: ProjectShowCase[] = [];


    constructor() { }


    //this must be able to update the data and save new data
    saveData(skills: ProfessionalSkills[]) {
        
        for(var skill of skills) {
            var index = ProfessionalSkillData.findIndex(p => p.skillId === skill.skillId);
            ProfessionalSkillData[index] = skill;
        }
    }

    getSkillsData() {  
        console.log(ProfessionalSkillData); 
        this.professionalSkills = ProfessionalSkillData;
        this.professionalSkillListener.next([...this.professionalSkills]);
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
}