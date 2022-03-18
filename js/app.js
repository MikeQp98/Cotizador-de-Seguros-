// Constructores 

function Seguro(marca, year, tipo) {
    this.marca = marca; 
    this.year = year; 
    this.tipo = tipo; 
}

//Realiza la cotizacion con estos datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        Modelo Americano 1.15
        Modelo Asiatico 1.05
        Modelo Europeo 1.35
    */

    let cantidad;
    const base = 2000;
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
            default:
            break;
    }

    //Formula para leer el año del Carro
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor el costo se va a reducir un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    console.log(cantidad);

    /*
         sI EL SEGURO ES BASISO SE MULTIMPLA POR UN  50% MAS  
        sI EL SEGURO ES COMPLETO SE MULTIMPLA POR UN  50% MAS  
    */

        if(this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad;

        
}


function UI() {}

UI.prototype.llenarOpciones = () => {

    const max = new Date().getFullYear(), 
          min = max - 20;

const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {    

        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);

    }
}

// Muestra alerta en Pantallas

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement ('div');

    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
        div.classList.add('mensaje', 'mt-10')

        div.textContent = mensaje;

        // Insertar en el Html
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.insertBefore(div, document.querySelector('#resultado'));

        setTimeout(() => {
            div.remove();
        },3000);

}

UI.prototype.mostrarResultado = (total,seguro) => {

    const{marca, year, tipo} = seguro;

    let textoMarca;
    switch (marca) {
        
        case '1':
            textoMarca = 'Americano';
            break;
         case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
                break;
        default:
            break;
    }


    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class= "header"> Tu Resumen </p>
        <p class="font-bold">Marca: <span class="font-normal">  ${textoMarca} </span></p>
        <p class="font-bold">Año: <span class="font-normal">  ${year} </span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">  ${tipo} </span></p>
        <p class="font-bold">Total: <span class="font-normal">$  ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
   

    //Mostrar el Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() =>  {
        spinner.style.display = 'none'; // se borra el spinner pero 
        resultadoDiv.appendChild(div); // se muesta el resultado
    }, 3000);
}

//Instanciar UI
const ui = new UI();
console.log(ui)

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones(); // Llena el Select con los años

})


eventListeners()

function eventListeners () {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
} 

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer la marca Seleccionada
        const marca = document.querySelector('#marca').value
       
    //Leer el Año Seleccionado
    const year = document.querySelector('#year').value
    //Leer el tipo de cobertura 
      const tipo = document.querySelector('input[name="tipo"]:checked').value
     

      if(marca === '' || year === '' || tipo === '' ){
          ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
          return;
      }

      ui.mostrarMensaje('Cotizando...', 'exito');

      const resultados = document.querySelector('#resultado div');

      if (resultados != null ) {
          resultados.remove();
      }

      const seguro = new Seguro(marca, year, tipo);
      const total =  seguro.cotizarSeguro();
      
      ui.mostrarResultado(total, seguro);
}

