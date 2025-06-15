export const calculateFees = (price: number) => {
    const platformFeePercentage = 0.02; // 2% de VibeTel
    const epaycoFeePercentage = 0.0298; // 2.98% de ePayco
    const epaycoBaseFee = 900; // Base fija de ePayco
    const epaycoIVA = 0.19; // IVA del 19% para ePayco
  
    // Cálculo de tarifas
    const platformFee = price * platformFeePercentage;
    const epaycoFee = price * epaycoFeePercentage + epaycoBaseFee;
    const epaycoFeeWithIVA = epaycoFee * (1 + epaycoIVA);
  
    // Total de tarifas
    const totalFees = platformFee + epaycoFeeWithIVA;
  
    return { platformFee, epaycoFeeWithIVA, totalFees };
  };
  