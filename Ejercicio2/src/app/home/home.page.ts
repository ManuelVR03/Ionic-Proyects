import { Component } from '@angular/core';
import { LaLigaService } from '../laliga.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Partido } from '../modelo/partido';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  equipoLocal: string = '';
  equipoVisitante: string = '';
  equipos: any;
  partidos: any;
  creando = false;
  modificado = false;

  constructor(private dataService: LaLigaService, private navCtrl: NavController, private alertControler: AlertController) {}

  ngOnInit(){
    this.equipos = this.dataService.obtenerEquipos();
    this.partidos = this.dataService.obtenerPartidos();
  }

  crearPartido(){
    this.creando = true;
  }

  alertPartido(){
    this.alertControler.create({
      header: 'Gestionar Marcador',
      inputs: [
        {
          name: 'puntosLocal',
          type: 'number'
        },
        {
          name: 'puntosVisitante',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            this.cancelar();
          }
        },
        {
          text: 'ACTUALIZAR',
          handler: (data) => {
            let partido = new Partido(this.equipoLocal, data.puntosLocal, this.equipoVisitante, data.puntosVisitante);
            this.dataService.agregarPartido(partido);
            this.partidos = this.dataService.obtenerPartidos();
            this.equipoLocal = '';
            this.equipoVisitante = '';
            this.cancelar();
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  cancelar(){
    this.creando = false;
  }

  modificar(partido: Partido){
    this.modificado = true;
    this.alertControler.create({
      header: 'Gestionar Marcador',
      inputs: [
        {
          name: 'puntosLocal',
          type: 'number',
          value: partido.puntosLocal
        },
        {
          name: 'puntosVisitante',
          type: 'number',
          value: partido.puntosVisitante
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            this.modificado = false;
          }
        },
        {
          text: 'ACTUALIZAR',
          handler: (data) => {
            let partidoNew = new Partido(partido.equipoLocal, data.puntosLocal, partido.equipoVisitante, data.puntosVisitante);
            this.dataService.actualizarPartido(partidoNew);
            this.partidos = this.dataService.obtenerPartidos();
            this.equipoLocal = '';
            this.equipoVisitante = '';
            this.modificado = false;
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
    
  }

}
