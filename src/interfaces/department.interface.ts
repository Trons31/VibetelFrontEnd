


export interface Department {
    id: string;
    name: string;
    countryId: string;
}


export interface CoverageDepartment {
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
