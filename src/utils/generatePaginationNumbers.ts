export const generatePaginationNumbers = ( currentPage: number, totalPages: number) => {

    //Validamos si el numero de paginas es menor a 7 entonces mostraremos todas las paginas en la paginacion, creando un arreglo donde generaremos el numero de paginas
    if(totalPages <= 7){
        //Retornamos un arreglo donde el tamaño sera el totalPages o total de paginas y generamos el numero de paginas con un indice donde lo aumentamos de uno en uno hasta el nuemero total de paginas en esta caso : [1,2,3,4,5,6,7]
          return Array.from({length: totalPages}, (_, i) => i + 1 )
    }

    //Validamos si la pagina actual se encuentra entre las tres primeras pagianas, mostramos en la paginacion las primeras 3, puntos suspensivos y las ultimas dos : [1,2,3,...,4,5]
    if(currentPage <= 3){
        //Retornamos un arreglo con las tres primeras paginas, luego puntos suspensivos y las ultimas doas paginas deacuerdo al totalPages
        return [1,2,3,'...',totalPages -1, totalPages]
    }

    //Validamos si la pagina actual se encuentra entre las tres ultimas pagianas, mostramos en la paginacion las dos primeras, puntos suspensivos y las ultimas tres : [1,2,...,20,21,22]
    if(currentPage <= 3){
        //Retornamos un arreglo con las dos primeras paginas, luego puntos suspensivos y las ultimas tres paginas deacuerdo al totalPages
        return [1,2,'...',totalPages -2,totalPages -1, totalPages]
    }

    //Si la pagina actual esta en otro lugar en los tres puntos supensivos mostraremos la primera pagina, puntos suspensivos, la pagina actual y las paginas siguientes
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}