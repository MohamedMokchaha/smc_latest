import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  confirmationVisible: boolean = false;
  additionalInfo: string = '';
  comment: string = '';
  acceptTerms: boolean = false;
  formData: any;

  // CAPTCHA variables
  isNotRobot: boolean = false;
  captchaError: boolean = false;
  isLoading: boolean = false;
  isVerified: boolean = false;

  constructor(private router: Router, private demandeService: DemandeService) {}

  ngOnInit() {
    const combinedData = localStorage.getItem('combinedData');
    this.formData = combinedData ? JSON.parse(combinedData) : {};
  }

  simulateVerification() {
    if (this.isNotRobot) {
      this.isLoading = true;
      this.isVerified = false;

      setTimeout(() => {
        this.isLoading = false;
        this.isVerified = true;
      }, 2000);
    }
  }

  sendRequest() {
    if (!this.isNotRobot || !this.isVerified) {
      this.captchaError = true;
      return;
    }

    if (!this.acceptTerms) {
      alert("Vous devez accepter les conditions pour soumettre votre demande.");
      return;
    }

    const additionalInfoToSend = this.additionalInfo || 'Non renseigné';
    const commentToSend = this.comment || 'Non renseigné';

    const confirmationData = {
      additionalInfo: additionalInfoToSend,
      comment: commentToSend,
      ...this.formData
    };

    this.demandeService.saveDemande(confirmationData).subscribe(
      response => {
        console.log('Demande sauvegardée avec succès:', response);
        // Rediriger vers le composant success
        this.router.navigate(['/success']);
      },
      error => {
        console.error('Erreur lors de la sauvegarde de la demande:', error);
        alert('Une erreur est survenue lors de la sauvegarde de votre demande. Veuillez réessayer.');
      }
    );
  }

  goBack() {
    this.router.navigate(['/permis']);
  }
}
