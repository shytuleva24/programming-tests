import {Component, ElementRef, OnInit} from '@angular/core';
import { Application } from '@splinetool/runtime';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  // private app: Application;
  // private canvas: HTMLCanvasElement;
  //
  // constructor(private elementRef: ElementRef) { }
  //
  ngOnInit(): void {
    // this.canvas = this.elementRef.nativeElement.querySelector('canvas');
    // this.app = new Application(this.canvas);
    // this.app.load('https://prod.spline.design/gmBh-Jlxikic0hY8/scene.splinecode');
  }
}

