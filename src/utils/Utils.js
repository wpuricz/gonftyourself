import BigNumber from "bignumber.js";

export const DEFAULT_DECIMALS = 18;

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(baseAmount.toString());
  return amountBN.div(new BigNumber(10).pow(decimals));
}

export function toBaseUnitAmount(unitAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(unitAmount.toString());
  return amountBN.times(new BigNumber(10).pow(decimals));
}

export const getPriceFromAsset = (sellOrder) => {
  if (!sellOrder || !sellOrder[0]) return null; // also check created_date and closing_date to see if active
  // or "expiration_time": 1628994402
  const price = toUnitAmount(
    sellOrder[0].base_price,
    sellOrder[0].payment_token_contract
  );
  return parseFloat(price).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });
};

export const getMaxBidFromOrder = (orders, minMax) => {
  const prices = orders.map((order) => order.base_price);
  const bid = minMax === 0 ? Math.max(...prices) : Math.min(...prices);
  const price = toUnitAmount(bid, orders[0].payment_token_contract);
  return parseFloat(price).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });
};

// const getPrice = (currentPrice, paymentTokenContract) => {
//   const price = toUnitAmount(currentPrice, paymentTokenContract);
//   return parseFloat(price).toLocaleString(undefined, {
//     minimumSignificantDigits: 1,
//   });
// };
