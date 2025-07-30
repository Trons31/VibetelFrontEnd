


export interface City {
  id: string;
  name: string;
  departmentId: string;
}

export interface CityApi {
  id: string;
  name: string;
  department: Department;
}



export interface searchCity {
  department: string;
  city: string;
  cityId?: string;
}

interface Country {
  geonameId: string;
  name: string;
  isoCode: string;
}

interface Department {
  geonameId: string;
  name: string;
  country: Country;
}

export interface LocationCity {
  id: string;
  name: string;
  department: Department;
}