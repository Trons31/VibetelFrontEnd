export const calculateTotalPrice = (basePrice: number) => {
    const ePaycoFeePercentage = parseFloat(process.env.NEXT_PUBLIC_EPAYCO_FEE_PERCENTAGE || '0');
    const ePaycoBaseFee = parseFloat(process.env.NEXT_PUBLIC_EPAYCO_BASE_FEE || '0');
    const ePaycoIVAPercentage = parseFloat(process.env.NEXT_PUBLIC_EPAYCO_IVA_PERCENTAGE || '0');
    const platformFeePercentage = parseFloat(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE || '0');

    const ePaycoFee = basePrice * ePaycoFeePercentage + ePaycoBaseFee;
    const ePaycoIVA = ePaycoFee * ePaycoIVAPercentage;
    const platformFee = basePrice * platformFeePercentage;

    const total = basePrice + ePaycoFee + ePaycoIVA + platformFee;

    return roundToNearestHundred(total);
  };

  const roundToNearestHundred = (value: number) => {
    const remainder = value % 100;
    if (remainder < 50) {
      return value - remainder; // Redondear hacia abajo
    } else {
      return value + (100 - remainder); // Redondear hacia arriba
    }
  };