let defaultCurrency = "IDR";

/** SPEND
 * Money moves to products/services that is unlikely to be sold
 * ex:
 * @param float amount
 * @param string comment
 * @param string fromAccount
 * @param string fromGroup
 * @param string category
 * @param string (optional) currency = null
 */
function spend(
  amount,
  comment,
  fromAccount,
  fromGroup,
  category,
  currency = defaultCurrency
) {
  let parse = `spend,${comment},${fromAccount},${fromGroup},${amount},${currency}, ,${category} `;
  return parse;
}

/** EARN
 * Money transferred from another party, usually in context of salary or commission, not the sale of goods / assets.
 * ex: earn, 10000, Easy Crypto Salary, Salary, Reserves, Mandiri 

 * @param float amount
 * @param string comment
 * @param string sender
 * @param string toAccount
 * @param string toGroup
 * @param string (optional) currency = null
 */
function earn(
  amount,
  comment,
  sender,
  toAccount,
  toGroup,
  currency = defaultCurrency
) {
  let parse = `earn,${comment},${sender},,${amount},${currency},${toAccount},${toGroup} `;
  return parse;
}

/** PAID BY
 * Borrowing money from someone, but no transfer into personal domain 
 * ex: owe, 250, "Sara took me out on a date", Sara, Dine out, Date = debt group

 * @param float amount
 * @param string comment
 * @param string payer
 * @param string category 
 * @param string (optional) debtGroup = ''
 * @param string (optional) currency = null
 */
function paidby(
  amount,
  comment,
  payer,
  category,
  debtGroup = "",
  currency = defaultCurrency
) {
  let parse = `owe,${comment},${payer},${debtGroup},${amount},${currency},,${category} `;
  return parse;
}

/** BORROW / OWE
 * Borrowing money from someone, with transfer into personal domain.
 * ex: owe, 5000, "for investing in SLIS", Mom, Mandiri, (SLIS), SLIS Investing = the debt group

 * @param float amount
 * @param string comment
 * @param string payer
 * @param string toAccount
 * @param string toGroup 
 * @param string (optional) debtGroup = ''
 * @param string (optional) currency = null
 */
function owe(
  amount,
  comment,
  lender,
  toAccount,
  toGroup,
  debtGroup = "",
  currency = defaultCurrency
) {
  let parse = `owe,${comment},${lender},${debtGroup},${amount},${currency},${toAccount},${toGroup} `;
  return parse;
}

/** LEND
 * Lending money to someone for whatever reason
 * ex: lend, 5000, "Marco pays for Netflix", Mandiri, Reserves, Marco, Netflix, 

 * @param float amount
 * @param string comment
 * @param string fromAccount
 * @param string fromGroup
 * @param string borrower
 * @param string depositGroup
 * @param string (optional) currency = null
 */
function lend(
  amount,
  comment,
  fromAccount,
  fromGroup,
  borrower,
  depositGroup,
  currency = defaultCurrency
) {
  let parse = `lend,${comment},${fromAccount},${fromGroup},${amount},${currency},${borrower},${depositGroup}`;
  return parse;
}

/** BUY
 * Money moves to assets, has a resell value, or with the intention to be sold in the future.
 * ex: buy, 5000, "daily BTC", Tokocrypto, (House), House, BTC, 0.015
 * ex: buy, 5000, "daily BTC", Tokocrypto, (House), Binance, House, BTC, 0.015, Binance
 * @param float amount
 * @param string comment
 * @param string fromAccount
 * @param string fromGroup
 * @param string toGroup
 * @param string asset
 * @param float asset amount
 * @param string assetLocation
 * @param string (optional) currency = null
 */
function buy(
  amount,
  comment,
  fromAccount,
  fromGroup,
  toGroup,
  asset,
  assetAmount,
  assetLocation = fromAccount,
  currency = defaultCurrency
) {
  let swapID = `${currency}/${asset}/${fromGroup}`;
  let parse = `buy,${comment},${fromAccount},${fromGroup},${amount},${currency},${assetLocation},${toGroup},${assetAmount},${asset},${swapID}`;
  return parse;
}

/** MOVE
 * Move money/assets between accounts or groups
 * ex: move, 1, Binance, Tokocrypto, BTC
 * ex: move, 200, Mandiri, BCA
 * A swap is what you get in return from selling an asset.
 * @param float amount
 * @param string from
 * @param string to
 * @param string (optional) currency
 * @param string (optional) comment
 */

function move(
  amount,
  moveAccount = true,
  from,
  to,
  currency = defaultCurrency,
  comment = ""
) {
  if (moveAccount === true) {
    let parse = `move,${comment},${from},,${amount},${currency},${to}`;
    return parse;
  } else {
    let parse = `move,${comment},,${from},${amount},${currency},,${to}`;
    return parse;
  }
}

/** SELL
 * Money from the average buy price of liquidated assets. Returns two entries.
 * ex: sell, 1, BTC, 2000, IDR, sold all my BTC, Binance, House, Binance, (House), 1000 = ABP
 * A swap is what you get in return from selling an asset.
 * @param float assetAmount
 * @param string assetType
 * @param float swapAmount
 * @param string swapType
 * @param string comment
 * @param string assetLocation
 * @param string assetGroup
 * @param string swapGroup
 * @param float averageBuyPrice
 * @param string (optional) swapLocation
 */

function sell(
  assetAmount,
  assetType,
  swapAmount,
  swapType,
  comment,
  assetLocation,
  assetGroup,
  swapLocation,
  swapGroup,
  averageBuyPrice
) {
  let swapID = `${swapType}/${assetType}/${swapGroup}`;
  let revenue = assetAmount * averageBuyPrice;
  let clusterID = Math.floor(Math.random() * 100);
  if (revenue < swapAmount) {
    profit = "profit";
  } else {
    profit = "loss";
    return profit;
  }
  let parse = {
    a: `sell, ${comment},${assetLocation},${assetGroup},${assetAmount},${assetType},${swapLocation},${swapGroup},${revenue},${swapType},${swapID},${clusterID}`,
    b: `${profit}, ${comment},,,,,${swapLocation},${swapGroup},${swapAmount},${swapType},${swapID},${clusterID}`,
  };
  return parse;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

let a = buy(1000, "comment", "Tokocrypto", "House", "(House)", "BTC", 2);
console.log(a);
