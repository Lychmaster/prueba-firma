import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-firma';

  onSignature(dataURL: string) {
    console.debug(dataURL);
  }

  guardarFirma(dataUrl: string) {
    // Puedes enviarla a un servidor
    //const base64 = dataUrl.replace(/^data:image\/(png|jpeg);base64,/, '');
  
    // Ejemplo de request:
    //this.http.post('/api/guardar-firma', { imagenBase64: base64 }).subscribe();
  }  
}


