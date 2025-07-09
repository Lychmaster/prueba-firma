import { Component, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: []
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @Output() signature = new EventEmitter<string>();

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  startDrawing(event: MouseEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    this.ctx.beginPath();
  }

  draw(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isDrawing) return;

    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'blue';

    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  stopDrawing(): void {
    this.isDrawing = false;
    this.signature.emit(this.canvas.nativeElement.toDataURL());
  }

  resetCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }  

  startDrawingTouch(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.nativeElement.dispatchEvent(mouseEvent);
  }
  
  drawTouch(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.nativeElement.dispatchEvent(mouseEvent);
  }
    
  descargarFirma(): void {
    const dataURL = this.canvas.nativeElement.toDataURL('image/png', 0.9);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'firma.png';
    link.click();
  }
}
