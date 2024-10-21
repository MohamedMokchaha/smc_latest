import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  vehicleForm!: FormGroup;
  submitted = false;
  acquisitionDateValid: boolean = true;
  dropdownOpen: boolean = false;
  combinedData: any;
  brands = [
    { name: 'Honda', logo: 'https://e7.pngegg.com/pngimages/444/697/png-clipart-honda-logo-honda-car-scooter-motorcycle-yamaha-motor-company-honda-logo-red-angle-text-thumbnail.png' },
    { name: 'Yamaha', logo: 'https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Logo-Yamaha.png' },
    { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/500px-Suzuki_logo_2.svg.png' },
    { name: 'Kawasaki', logo: 'https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Kawasaki-Logo.jpg' },
    { name: 'Ducati', logo: 'https://www.1min30.com/wp-content/uploads/2019/06/Ducati-embleme.jpg' },
    { name: 'Harley-Davidson', logo: 'https://cdn.room58.com/2024/04/26/fad430bba4969b27bcee42abe4f37d4f_6ed210840e81569d.png' },
    { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' },
    { name: 'KTM', logo: 'https://w7.pngwing.com/pngs/389/669/png-transparent-ktm-motogp-racing-manufacturer-team-car-motorcycle-logo-car-angle-text-trademark.png' },
    { name: 'Triumph', logo: 'https://cdn.worldvectorlogo.com/logos/logo-triumph.svg' },
    { name: 'MV Agusta', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/37/MV_Agusta_Logo_1945_noBG.png' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.vehicleForm = this.fb.group({
      vehicleBrand: ['', Validators.required],
      engineCapacity: ['', Validators.required],
      model: [''],
      type: [''],
      registrationNumber: [''],
      firstRegistrationDate: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
    });
  }

  // Gestion de l'ouverture/fermeture du dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Méthode pour sélectionner une marque
  selectBrand(brand: string) {
    this.vehicleForm.patchValue({ vehicleBrand: brand });
    
    // Utilisation de setTimeout pour laisser le temps à l'option d'être sélectionnée avant de fermer le dropdown
    setTimeout(() => {
      this.dropdownOpen = false; // Ferme le dropdown après sélection
    }, 100); // Délai pour garantir la fermeture après sélection
  }

  // Écoute les clics en dehors du dropdown pour le fermer
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const isDropdownClicked = target.closest('.dropdown-container, .input-icon');
    if (!isDropdownClicked) {
      this.dropdownOpen = false;
    }
  }

  // Soumission du formulaire
  onSubmit() {
    this.submitted = true;

    if (this.vehicleForm.invalid || !this.acquisitionDateValid) {
      return;
    }

    const savedContactData = localStorage.getItem('contactData');
    const contactData = savedContactData ? JSON.parse(savedContactData) : {};

    const savedObjectiveData = localStorage.getItem('objectiveData');
    const objectiveData = savedObjectiveData ? JSON.parse(savedObjectiveData) : {};

    this.combinedData = {
      contact: contactData,
      objective: objectiveData,
      vehicle: this.vehicleForm.value,
    };

    localStorage.setItem('vehicleData', JSON.stringify(this.vehicleForm.value));

    this.router.navigate(['/permis']);
  }

  // Redirection vers la page précédente
  goBack() {
    this.router.navigate(['/contact-info']);
  }
}
