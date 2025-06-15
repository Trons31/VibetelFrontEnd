interface City {
  departmentId: string;
  name: string;
  id: string;
}

export const cities: City[] = [
  // Antioquia (AN)
  { departmentId: "AN", name: "Medellín", id: "ME" },
  { departmentId: "AN", name: "Bello", id: "BE" },
  { departmentId: "AN", name: "Envigado", id: "EN" },
  { departmentId: "AN", name: "Itagüí", id: "IT" },
  { departmentId: "AN", name: "Rionegro", id: "RN" },

  // Córdoba (CD)
  { departmentId: "CD", name: "Montería", id: "MO" },
  { departmentId: "CD", name: "Cereté", id: "CE" },
  { departmentId: "CD", name: "Sahagún", id: "SG" },
  { departmentId: "CD", name: "Lorica", id: "LO" },
  { departmentId: "CD", name: "Tierralta", id: "TI" },

  // Sucre (SU)
  { departmentId: "SU", name: "Sincelejo", id: "SI" },
  { departmentId: "SU", name: "Corozal", id: "CR" },
  { departmentId: "SU", name: "Sampués", id: "SA" },
  { departmentId: "SU", name: "San Marcos", id: "SM" },
  { departmentId: "SU", name: "Tolú", id: "TO" },

  // Atlántico (AT)
  { departmentId: "AT", name: "Barranquilla", id: "BA" },
  { departmentId: "AT", name: "Soledad", id: "SO" },
  { departmentId: "AT", name: "Malambo", id: "MA" },
  { departmentId: "AT", name: "Sabanalarga", id: "SB" },
  { departmentId: "AT", name: "Galapa", id: "GA" },

  // Bolívar (BV)
  { departmentId: "BV", name: "Cartagena", id: "CA" },
  { departmentId: "BV", name: "Magangué", id: "MG" },
  { departmentId: "BV", name: "Turbaco", id: "TU" },
  { departmentId: "BV", name: "El Carmen de Bolívar", id: "CB" },
  { departmentId: "BV", name: "Arjona", id: "AR" },

  // Boyacá (BY)
  { departmentId: "BY", name: "Tunja", id: "TUJ" },
  { departmentId: "BY", name: "Duitama", id: "DU" },
  { departmentId: "BY", name: "Sogamoso", id: "SGM" }, // Nuevo ID
  { departmentId: "BY", name: "Chiquinquirá", id: "CH" },
  { departmentId: "BY", name: "Puerto Boyacá", id: "PB" },

  // Caldas (CL)
  { departmentId: "CL", name: "Manizales", id: "MAZ" },
  { departmentId: "CL", name: "Villamaría", id: "VI" },
  { departmentId: "CL", name: "La Dorada", id: "LD" },
  { departmentId: "CL", name: "Chinchiná", id: "CHN" },
  { departmentId: "CL", name: "Riosucio", id: "RI" },

  // Cesar (CS)
  { departmentId: "CS", name: "Valledupar", id: "VA" },
  { departmentId: "CS", name: "Aguachica", id: "AG" },
  { departmentId: "CS", name: "Bosconia", id: "BO" },
  { departmentId: "CS", name: "Codazzi", id: "CO" },
  { departmentId: "CS", name: "Curumaní", id: "CU" },

  // Chocó (CH)
  { departmentId: "CH", name: "Quibdó", id: "QU" },
  { departmentId: "CH", name: "Istmina", id: "IS" },
  { departmentId: "CH", name: "Condoto", id: "COT" }, // Nuevo ID
  { departmentId: "CH", name: "Tadó", id: "TA" },
  { departmentId: "CH", name: "Acandí", id: "AC" },

  // Cundinamarca (CU)
  { departmentId: "CU", name: "Bogotá", id: "BOG" },
  { departmentId: "CU", name: "Soacha", id: "SOH" },
  { departmentId: "CU", name: "Facatativá", id: "FA" },
  { departmentId: "CU", name: "Zipaquirá", id: "ZI" },
  { departmentId: "CU", name: "Girardot", id: "GI" },

  // Huila (HU)
  { departmentId: "HU", name: "Neiva", id: "NE" },
  { departmentId: "HU", name: "Pitalito", id: "PI" },
  { departmentId: "HU", name: "Garzón", id: "GAZ" },
  { departmentId: "HU", name: "La Plata", id: "LP" },
  { departmentId: "HU", name: "Campoalegre", id: "CAM" },

  // Valle del Cauca (VC)
  { departmentId: "VC", name: "Cali", id: "CAL" }, // Este ID también se repite
  { departmentId: "VC", name: "Palmira", id: "PA" },
  { departmentId: "VC", name: "Buenaventura", id: "BU" },
  { departmentId: "VC", name: "Tuluá", id: "TL" },
  { departmentId: "VC", name: "Buga", id: "BUG" }, // Nuevo ID

  // Meta (ME)
  { departmentId: "ME", name: "Villavicencio", id: "VIC" },
  { departmentId: "ME", name: "Granada", id: "GR" },
  { departmentId: "ME", name: "Acacías", id: "ACS" }, // Este ID también se repite
  { departmentId: "ME", name: "Puerto López", id: "PL" },
  { departmentId: "ME", name: "San Martín", id: "SMT" },

  // Santander (SA)
  { departmentId: "SA", name: "Bucaramanga", id: "BUC" }, // Corregido
  { departmentId: "SA", name: "Floridablanca", id: "FL" },
  { departmentId: "SA", name: "Girón", id: "GIR" }, // Corregido
  { departmentId: "SA", name: "Piedecuesta", id: "PIE" }, // Corregido
  { departmentId: "SA", name: "Barrancabermeja", id: "BAR" }, // Corregido
];
