import { Injectable } from '@angular/core';
import { Partido } from '../app/modelo/partido';

@Injectable({
  providedIn: 'root',
})
export class LaLigaService {
  private equipos: string[] = ['Betis', 'Cádiz', 'Recreativo', 'Sevilla', 'Málaga', 'Córdoba', 'Almería', 'Jaén', 'Granada'];
  private partidos: Partido[] = [
    { equipoLocal: 'Sevilla', puntosLocal: 2, equipoVisitante: 'Betis', puntosVisitante: 5 },
    { equipoLocal: 'Cádiz', puntosLocal: 2, equipoVisitante: 'Málaga', puntosVisitante: 0 },
    { equipoLocal: 'Recreativo', puntosLocal: 1, equipoVisitante: 'Córdoba', puntosVisitante: 1 },
    { equipoLocal: 'Almería', puntosLocal: 0, equipoVisitante: 'Granada', puntosVisitante: 1 },
  ];

  constructor() {}

  // Obtener la lista de equipos
  obtenerEquipos(): string[] {
    return this.equipos;
  }

  // Obtener la lista de partidos
  obtenerPartidos(): Partido[] {
    return this.partidos;
  }

  // Añadir un nuevo partido a la lista
  agregarPartido(partido: Partido): void {
    const index = this.partidos.findIndex(
      (p) => p.equipoLocal === partido.equipoLocal && p.equipoVisitante === partido.equipoVisitante
    );
    if (index === -1) {
    this.partidos.push(partido);
    }else{
      
    }
  }

  // Actualizar un partido en la lista
  actualizarPartido(partido: Partido): void {
    const index = this.partidos.findIndex(
      (p) => p.equipoLocal === partido.equipoLocal && p.equipoVisitante === partido.equipoVisitante
    );
    if (index !== -1) {
      this.partidos[index] = partido;
    }
  }
}