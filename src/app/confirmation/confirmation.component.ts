import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  // Variables pour le rendez-vous
  isModalOpen: boolean = false;
  appointment = { date: '', phone: '' };
  confirmationMessage: string = '';

  // Variables pour le code de vérification
  userInputCode: string = '';
  randomCode: string = '';

  // Variables pour les cookies
  cookiesAccepted: boolean = false;

  // Référence au canvas pour dessiner le captcha
  @ViewChild('captchaCanvas', { static: true }) captchaCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router, private demandeService: DemandeService) {}

  ngOnInit() {
    const combinedData = localStorage.getItem('combinedData');
    this.formData = combinedData ? JSON.parse(combinedData) : {};

    // Générer un code aléatoire
    this.generateRandomCode(); // Cela doit générer un code à chaque chargement du composant

    // Dessiner le captcha
    this.drawCaptcha(); // Dessinez le captcha immédiatement après la génération du code

    // Vérifier si les cookies ont été acceptés
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    this.cookiesAccepted = cookiesAccepted === 'true';
  }


  generateRandomCode() {
    // Générer un code aléatoire à 6 caractères alphanumériques
    this.randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  drawCaptcha() {
    const canvas = this.captchaCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Définir la largeur et la hauteur du canvas
      canvas.width = 150; // Largeur du canvas
      canvas.height = 50; // Hauteur du canvas

      // Fond blanc
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ajouter un cadre autour du canvas
      ctx.strokeStyle = 'black'; // Couleur du cadre
      ctx.lineWidth = 3; // Épaisseur du cadre
      ctx.strokeRect(0, 0, canvas.width, canvas.height); // Dessiner le cadre

      // Style du texte
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';
      ctx.fillText(this.randomCode, canvas.width / 2, canvas.height / 1.5);

      // Ajouter un effet de bruit pour la complexité
      for (let i = 0; i < 150; i++) { // Augmenter le nombre d'éléments de bruit
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Couleur de bruit (opacité augmentée)
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, Math.random() * 5); // Taille variable plus grande
      }
    } else {
      console.error('Le contexte du canvas est null. Assurez-vous que le canvas est correctement configuré.');
    }
  }



  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.cookiesAccepted = true;
  }

  rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.cookiesAccepted = true;
  }

  sendRequest() {
    if (this.userInputCode !== this.randomCode) {
      alert("Le code de vérification est incorrect. Veuillez réessayer.");
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.appointment = { date: '', phone: '' }; // Réinitialiser le formulaire
  }

  confirmAppointment() {
    if (this.appointment.date && this.appointment.phone) {
      this.confirmationMessage = `Merci pour votre rendez-vous. Le chargé vous contactera au ${this.appointment.phone} à la date ${this.appointment.date}.`;
      this.closeModal(); // Fermer le modal après confirmation
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
