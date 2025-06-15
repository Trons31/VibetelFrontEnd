


//Esta función sleep toma una cantidad de segundos como parámetro, crea una promesa que se resuelve después de ese tiempo, y devuelve esa promesa. Esto nos permitira  simular pausas en componentes especificos mientras obtenemos informacion de la base de datos.
export const sleep = ( seconds: number = 1 )  => {
   
    //Retornamos una promesa y dentro de la funcion setTimeOut despues de un determinado tiempo la resolvemos en true, esto nos permitira simular tiempos de espera.

    return new Promise ( resolve => {
        //Definimos un setTimeout que es una función de JavaScript que ejecuta una función después de un cierto período de tiempo especificado en milisegundos.
        setTimeout(() => {
          //Despues del tiempo de espera finalmente resolvemos la Promise utilizando el valor de true
          resolve(true);
        },seconds * 1000  )// Definimos el tiempo de espera para que se ejecute el codigo en el cuerpo de setTimeOut, tomamos los segundos y conviertimos los segundos proporcionados en milisegundos, ya que setTimeout espera el tiempo en milisegundos.
    })

}