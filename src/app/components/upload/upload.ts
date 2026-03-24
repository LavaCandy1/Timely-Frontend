import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,FormsModule], 
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class Upload {

  selectedFiles: File[] = [];
  warning: string = '';
  uploadType: string = '';

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (!files || files.length === 0) {
      this.selectedFiles = [];
      return;
    }

    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type !== 'application/pdf') {
        this.warning = 'Only PDF files are allowed';
        this.selectedFiles = [];
        event.target.value = '';
        return;
      }

      validFiles.push(file);
    }

    this.selectedFiles = validFiles;
    this.warning = '';
  }

  getUploadLabel(): string {
    if (!this.uploadType) return 'Select type first';

    switch (this.uploadType) {
      case 'timetable': return 'Upload Timetable PDF';
      case 'students': return 'Upload Students PDF';
      case 'locations': return 'Upload Locations PDF';
      default: return 'Upload File';
    }
  }

  clearFile(input: HTMLInputElement) {
  input.value = '';
  this.selectedFiles = [];
  this.warning = '';
}

private resetForm() {
  this.uploadType = '';
  this.selectedFiles = [];
  this.warning = '';
}

  onSubmit(event?: Event) {
  event?.preventDefault();

  if (!this.uploadType) {
    this.warning = 'Please select upload type';
    return;
  }

  if (!this.selectedFiles.length) {
    this.warning = 'Please select at least one file';
    return;
  }

  this.warning = '';

  const formData = new FormData();

  formData.append('type', this.uploadType);

  this.selectedFiles.forEach((file, index) => {
    formData.append('files', file);
  });

  console.log('Uploading...', formData);

  alert(`Uploaded ${this.selectedFiles.length} ${this.uploadType} file(s)!`);

  this.resetForm();
}

  onCancel(fileInput: HTMLInputElement) {
    this.resetForm();
    fileInput.value = '';
  }

}