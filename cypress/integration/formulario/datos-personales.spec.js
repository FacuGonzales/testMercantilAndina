/// <reference types="cypress" />

context('DatosPersonales', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Debo poder rellenar el formulario y registrarme', () => {
        cy.wait(2500);
        cy.get('#apellidoId').type('Apellido Prueba');
        cy.wait(2000);
        cy.get('#nombreId').type('Nombre Prueba');
        cy.wait(2000);
        cy.get('#documentoId').type('13563996');
        cy.wait(2000);
        cy.get('#emailId').type('prueba@gmail.com');
        cy.wait(2000);
        cy.get('#celularId').type('3512597445');
        cy.wait(2000);
        cy.get('#telefonoId').type('3512597445');
        cy.wait(2000);
        cy.get('#domicilioId').type('Calle prueba 523');
        cy.wait(2000);
        cy.get('#provinciaId').select('Córdoba');
        cy.wait(2000);
        cy.get('#ciudadId').select('Bialet Massé');
        cy.wait(2000);
        cy.get('#fechaNacimientoId').type('1993-03-12');
        cy.wait(2000);
        cy.get('#usuarioId').type('pruebaUsuario03')
        cy.wait(2000);
        cy.get('#passwordId').type('1234Prueba')
        
        cy.wait(3000);
        cy.get('#buttonEnviar').click();

        cy.wait(3000);
        cy.get('#buttonSiguiente').click();
    
        // Debo poder rellenar el formulario de mi vehiculo
        cy.wait(2500);
        cy.get('#marcaId').select('AUDI');
        cy.wait(2000);
        cy.get('#anioId').clear();
        cy.wait(2000);
        cy.get('#anioId').type('2015');
        cy.wait(2000);
        cy.get('#modeloId').select('A4');
        cy.wait(3000);
        cy.get('#buttonEnviarDatos').click();

        cy.wait(3000);
        cy.get('datos-vehiculo-component.ng-star-inserted > .formularioContainer > .formularioContainer__botonContainer > .ng-star-inserted > #buttonSiguiente').click();

        // Debo poder seleccionar una cobertura
        cy.wait(2500);
        cy.get(':nth-child(1) > .tableContainer__table--descripcionContainer__td').click();
        cy.wait(3000);
        cy.get('coberturas-component.ng-star-inserted > .formularioContainer__botonContainer > .formularioContainer__botonContainer--buttonEnviar').click();
        cy.wait(3000);
        cy.get('coberturas-component.ng-star-inserted > .formularioContainer__botonContainer > .ng-star-inserted > .mat-focus-indicator').click();

        // Debo poder visualizar mis datos ingresados y confirmar.
        cy.wait(3500);
        cy.scrollTo('bottom');
        cy.wait(3000);
        cy.get('resumen-component.ng-star-inserted > .formularioContainer__botonContainer > .formularioContainer__botonContainer--buttonEnviar').click();
    })


    
})