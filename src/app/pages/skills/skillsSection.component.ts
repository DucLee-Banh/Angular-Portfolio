import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { SkillComponent } from '../../components/skill/skill.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { Skill } from '../../interfaces/Skill.inteface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [SkillComponent, ModalComponent, ReactiveFormsModule],
  templateUrl: './skillsSection.component.html',
  styleUrl: './skillsSection.component.scss'
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
@ViewChild(ModalComponent) modal!: ElementRef;
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;  
  titleText: string = '';
  langText: string = '';
  frameworkText: string = '';
  toolText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  isModalOpen: boolean = false;

  skills: Skill[] = [];

  skillForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  })
  selectedFile: File | null = null;

  ngOnInit(): void {
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Compétences` : `My Skills`;
        this.langText = language == 'fr' ? 'Langages' : 'Languages';
        this.frameworkText = language == 'fr' ? 'Frameworks & Bibliothèques' : 'Frameworks & Libraries';
        this.toolText = language == 'fr' ? 'Outils' : 'Tools';
      })
      this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
        this.isLogin = log;
      })
      this.skills = this.fetchAPIService.getSkills();
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
      this.loginSubscription.unsubscribe();
  }

  onSubmit(event: Event) {
    this.fetchAPIService.createSkill(this.skillForm.get('name')!.value!, this.skillForm.get('category')!.value!, this.selectedFile!);
    this.skillForm.reset();
    
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
