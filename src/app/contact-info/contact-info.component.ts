import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  postalCode: string = '';
  city: string = '';
  parkingAddress: boolean = false;
  birthDate: string = '';
  submitted: boolean = false;

  cities: string[] = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 
    'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 
    'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 
    'Le Havre', 'Grenoble', 'Dijon', 'Nîmes', 
    'Angers', 'Villeurbanne', 'Saint-Denis',
    'Aix-en-Provence', 'Ajaccio', 'Amiens', 'Antibes', 
    'Béziers', 'Brest', 'Caen', 'Calais', 'Cannes', 
    'Clermont-Ferrand', 'Dunkerque', 'Évry', 'Fréjus', 
    'La Rochelle', 'Le Mans', 'Montluçon', 'Nancy', 
    'Nanterre', 'Neuilly-sur-Seine', 'Pau', 'Quimper', 
    'Rodez', 'Saint-Malo', 'Sète', 'Tarbes', 
    'Thionville', 'Troyes', 'Vichy', 'Albi', 
    'Annecy', 'Chalon-sur-Saône', 'Chambéry', 
    'Châteauroux', 'Colmar', 'Corte', 'Dieppe', 
    'Épernay', 'Lorient', 'Saint-Brieuc', 'Saint-Étienne-du-Rouvray'
];
postalCodes: string[] = [
  // Paris
  '75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
  '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020',// Marseille
  '13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008', '13009', '13010',
  '13011', '13012', '13013', '13014', '13015', '13016',// Lyon
  '69001', '69002', '69003', '69004', '69005', '69006', '69007', '69008', '69009',// Toulouse
  '31000', '31100', '31200', '31300', '31400', '31500',// Nice
  '06000', '06100', '06200', '06300',// Nantes
  '44000', '44100', '44200', '44300',// Strasbourg
  '67000', '67100', '67200',// Montpellier
  '34000', '34070', '34080', '34090',// Bordeaux
  '33000', '33100', '33200', '33300', '33800',// Lille
  '59000', '59160', '59260', '59777', '59800',// Rennes
  '35000', '35200', '35700',// Reims
  '51100', '51430', '51500',// Saint-Étienne
  '42000', '42100', '42230',// Le Havre
  '76600', '76610', '76620',// Grenoble
  '38000', '38100',// Dijon
  '21000',// Nîmes
  '30000', '30900',// Angers
  '49000', '49100',// Villeurbanne
  '69100',// Saint-Denis
  '93200',// Aix-en-Provence
  '13090', '13100', '13290',// Ajaccio
  '20000', '20090',// Amiens
  '80000', '80080', '80090',// Antibes
  '06600',// Béziers
  '34500',// Brest
  '29200',// Caen
  '14000',// Calais
  '62100',// Cannes
  '06150', '06400',// Clermont-Ferrand
  '63000', '63100',// Dunkerque
  '59140', '59240', '59640',// Évry
  '91000',// Fréjus
  '83370',// La Rochelle
  '17000',// Le Mans
  '72000', '72100',// Montluçon
  '03100',// Nancy
  '54000', '54100',// Nanterre
  '92000',// Neuilly-sur-Seine
  '92200',// Pau
  '64000',// Quimper
  '29000',// Rodez
  '12000',// Saint-Malo
  '35400',// Sète
  '34200',// Tarbes
  '65000',// Thionville
  '57100',// Troyes
  '10000',// Vichy
  '03200',// Albi
  '81000',// Annecy
  '74000',// Chalon-sur-Saône
  '71100',// Chambéry
  '73000',// Châteauroux
  '36000',// Colmar
  '68000',// Corte
  '20250',// Dieppe
  '76200',// Épernay
  '51200',// Lorient
  '56100',// Saint-Brieuc
  '22000',// Saint-Étienne-du-Rouvray 
  '76800'
];


  filteredCities: string[] = [];
  filteredPostalCodes: string[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // Charger les données d'objectif si disponibles
    const savedObjectiveData = localStorage.getItem('objectiveData');
    if (savedObjectiveData) {
      const objectiveData = JSON.parse(savedObjectiveData);
      // Vous pouvez éventuellement afficher ou utiliser ces données ici
      console.log('Données de l\'objectif chargées:', objectiveData);
    }
  }
   

  filterCities() {
    if (this.city.length >= 1) {
      this.filteredCities = this.cities.filter(city => 
        city.toLowerCase().startsWith(this.city.toLowerCase())
      );
    } else {
      this.filteredCities = [];
    }
  }

  selectCity(selectedCity: string) {
    this.city = selectedCity;
    this.filteredCities = []; // Cachez la liste déroulante après la sélection
  }

  filterPostalCodes() {
    this.filteredPostalCodes = this.postalCode.length >= 1 
      ? this.postalCodes.filter(code => code.startsWith(this.postalCode))
      : [];
  }

  selectPostalCode(selectedPostalCode: string) {
    this.postalCode = selectedPostalCode;
    this.filteredPostalCodes = [];
  }

  isFormValid(): boolean {
    return !!this.firstName && !!this.lastName && !!this.email &&
      !!this.phone && !!this.address && !!this.postalCode &&
      !!this.city && !!this.birthDate;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.isFormValid()) {
      console.log('Tous les champs sont obligatoires.');
      return;
    }

    // Récupérer les données de contact
    const contactData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      postalCode: this.postalCode,
      city: this.city,
      parkingAddress: this.parkingAddress,
      birthDate: this.birthDate
    };

    // Récupérer les données d'objectif
    const savedObjectiveData = localStorage.getItem('objectiveData');
    let objectiveData: any = {};
    if (savedObjectiveData) {
      objectiveData = JSON.parse(savedObjectiveData);
    }

    // Combiner les données
    const combinedData = {
      contact: contactData,
      objective: objectiveData
    };

    // Afficher les données combinées en JSON dans la console
    console.log('Données combinées:', JSON.stringify(combinedData, null, 2));

    // Enregistrer les données de contact
    localStorage.setItem('contactData', JSON.stringify(contactData));

    // Naviguer vers la page suivante
    this.router.navigate(['/vehicule-info']); // Remplacez par la route de votre page suivante
  }

  goBack() {
    this.router.navigate(['/objective']); // Remplacez par la route de votre page précédente
  }
}
