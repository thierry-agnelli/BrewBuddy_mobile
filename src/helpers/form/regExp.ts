/**
 * Form validation regExp
 */

// Checking mail
const mailRegExp = new RegExp(
  "^(?!.*[.-]{2})([\\da-z.-])+@(?!.*[.-]{2})([\\da-z.-])+$",
);

// Checking password
// 8 char min
// one upper case
// one digits
// one special caracter
const pwdRegExp = new RegExp(
  "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&-<>#\\/])" +
    "[\\dA-Za-z@$!@$!%*?&-<>#\\/]{8,}$",
);

const REGEXP = {
  mail: mailRegExp,
  password: pwdRegExp,
};

/* Exports */
export { REGEXP, mailRegExp, pwdRegExp };
