import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let s1 = document.createElement('script');
    let getCopyrightText = document.getElementById('footer');
    s1.type = 'text/javascript';
    s1.innerHTML = `document.getElementById("year").innerHTML = new Date().getFullYear();`;
    if (getCopyrightText) {
      getCopyrightText.appendChild(s1);
    }
  }
}
