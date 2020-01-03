class Usuarios {

    constructor(){
        this.personas = [];

    }

    agregarPersona(id, nombre, sala){
        let persona =  { id, nombre, sala }
        this.personas.push(persona)
        return this.personas;
    }

    getPerson(id){
       let persona = this.personas.filter( person => { 
           return person.id === id;

       })[0];
    
       return persona;
    }


    getPeople(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        
        let personasEnSala = this.personas.filter( persona =>  persona.sala === sala );

        return personasEnSala;
    }


    borrarPrsona(id){

        let personaBorrada =  this.getPerson(id);

        this.personas =  this.personas.filter( persona => {
        // esta funcio regresa las personas activas en el chat   
        return persona.id != id;
         });


         return personaBorrada;
    }


}



module.exports = {
    Usuarios
};
