


export interface Department {
    id: string;
    name: string;
    countryId: string;
}

export interface Country {
  geonameId: string;
  name: string;
  isoCode: string;
}

export interface DepartmentApi {
  geonameId: string;
  name: string;
  country: Country;
}


export interface CoverageDepartmentApi {
    departmentId: string;
    departmentName: string;
    totalApprovedMotelsInDepartment: number;
    totalUnapprovedMotelsInDepartment: number;
    totalCitiesWithApprovedMotels: number;
    cityDetails: {
        cityId: string;
        cityName: string;
        totalApprovedMotelsInCity: number;
        totalUnapprovedMotelsInCity: number;
    }[];
}
