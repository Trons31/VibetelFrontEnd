


export interface City {
    id: string;
    name: string;
    departmentId: string;
}


export interface searchCity {
    country: string;
    department: string;
    city: string;
    cityId?:string;
}