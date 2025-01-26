// https://blog.angular-university.io/angular-file-upload/

import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-file-upload-dialog',
  imports: [
    CommonModule,
    MatIcon,
    MatFormFieldModule,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatInputModule,
    MatDialogClose
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent {
  fileName = '';
  fileContent: string | ArrayBuffer | null = null;

  constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const file = target.files?.length != 1 ? undefined : target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.fileContent);  // Pass the file content back to the parent component
  }

  private readFile(file: File): void {
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(file);
  }
}