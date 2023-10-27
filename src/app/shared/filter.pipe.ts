import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Funcion para filtar datos enviados desde un api arroja un array de tipo any
   * @param value  es el json que manda el api y lo guardamos en un array
   * @param filterString es la palabra con la que vas a filtrar toda la informacion(la escribe el usuario)
   * @param propName para filtar por propiedad como titulo o categorias
   * @returns
   */
  transform(value: any[], filterString: string, propName: string): any[] {
    const result: any = []; //almacena la nueva infromacion filtrada a mostrar

    //si los parametros para filtrar estan vacios retornamos la informacion completa (el json que manda el api)
    if (!value || filterString === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {
      if (
        a[propName].trim().toLowerCase().includes(filterString.toLowerCase())
      ) {
        result.push(a);
      }
    });
    return result;
  }
}
