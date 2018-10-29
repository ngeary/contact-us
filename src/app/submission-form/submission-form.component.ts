import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SubmitterService } from '../submitter.service';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})

export class SubmissionFormComponent {

  error: any;
  response: any;

  submissionForm = this.fb.group({
    email: ['', Validators.required],
    subject: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private submitterService: SubmitterService) { }

  onSubmit() {
    this.submitterService.postMessage(JSON.stringify(this.submissionForm.value))
      .subscribe(
        (data: any) => this.response = { ...data },
        error => this.error = error);
    this.submissionForm.disable();
  }

}
