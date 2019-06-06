import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notas: string = 'N1'
  final_n1:number ;
  final_n2:number ;
  qtd_n1:number ;
  qtd_nf:number ;
  psb_n1:number ;
  constructor(public navCtrl: NavController) {

  }
  ngOnInit(){
    Swal.fire(
      {
        type: "success",
        title: "Versão 2.0",
        text: "Hey! Acabou de sair a versão V2 dessa calculadora, voce pode ver ela por esse link aqui, corre la!",
        footer: "<a class='btn-special btn-pill' href='https://calculadora-de-notas.herokuapp.com/' target='_blank'>Dpzinha</a>"
      })
  }
  validation(){
    switch (this.notas) {
      case 'N1':
      return this.qtd_nf >= 0 && this.qtd_n1 >= 0;
      case 'N2':
      return this.psb_n1 >=0;
      case 'Final':
      return this.final_n1 >= 0 && this.final_n2 >= 0;
    }
  }
  calc() {
    switch (this.notas) {
      case 'N1':
      this.calcN2Grade()
        break;
      case 'N2':
      this.calcPossibleGrade();
        break;
      case 'Final':
        this.calcFinalGrade()
        break;
    }
  }
  calcFinalGrade() {
    let nota = (this.final_n1*0.4) + (this.final_n2*0.6);
    let type;
    let motivational;
    if(nota > 7.5){
      type = "success"
      motivational="<span style='color: green'><b>Parabens :)</b></span>";
    }
    else if(nota >= 5 && nota <=7.5){
      type="warning"
      motivational="<span style='color: #f8bb86'>O importante é que passou :) </span>";
    }
    else{
      type="error"
      motivational="<span style='color: red'><b>Prepara os 100 conto da sub! :/</b></span>";
    }
    Swal.fire({
      title: 'Notinha',
      html:
      `<p>A sua nota é: <b>${nota}</b></p>
      <p>${motivational}</p>`,
      type: type,
      animation: false,
      customClass: 'animated rubberBand'
    })
  }
  calcN2Grade(){
    let nota = ((this.qtd_nf - (this.qtd_n1 * 0.4)) / 0.6)
    let type;
    let motivational;
    if(nota > 7.5){
      type = "error"
      motivational="<span style='color: red'><b>Vai ter que correr atras hem :(</b></span>";
    }
    else if(nota >= 5 && nota <=7.5){
      type="warning"
      motivational="<span style='color: #f8bb86'>Melhor estudar pra N2 :/</span>";
    }
    else{
      type="success"
      motivational="<span style='color: green'><b>Ta de boa :)</b></span>";
    }

    Swal.fire({
      title: 'Notinha',
      html:
      `<p>Voce tem que tirar : <b>${nota}</b> na N2</p>
      <p>${motivational}</p> `,
      type: type,
      animation: false,
      customClass: 'animated rotateInUpRight'
    })
  }
  calcPossibleGrade(){
    let grades = [0,1,2,3,4,5,6,7,8,9,10];
    let possibleGrades = grades.map(grade => {
      return ((grade - (this.psb_n1 * 0.4)) / 0.6).toFixed(2);
    });
    let html = '';
    possibleGrades.forEach((element,index)=>{
      html+= `<p>Nota ${index}: -> ${element} </p>`;
    })
    Swal.fire({
      title: 'Notinha',
      html:
      `<p>As possiveis notas que voce pode tirar de acordo com a N2 são:</p>
        ${html} `,
      type: 'success',
      animation: false,
      customClass: 'animated zoomInDown'
    })
  }
}
