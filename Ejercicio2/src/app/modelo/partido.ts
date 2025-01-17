export class Partido {
  equipoLocal: string;
  puntosLocal: number;
  equipoVisitante: string;
  puntosVisitante: number;
  
    constructor(equipoLocal: string, puntosLocal: number, equipoVisitante: string, puntosVisitante: number) {
      this.equipoLocal = equipoLocal;
      this.puntosLocal = puntosLocal;
      this.equipoVisitante = equipoVisitante;
      this.puntosVisitante = puntosVisitante;
    }
  }
  