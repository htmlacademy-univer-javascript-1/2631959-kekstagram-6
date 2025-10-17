function isValidLength(str, maxLength) {
  str = String(str);
  return str.length <= maxLength;
}

function isPalindrome(palindrome) {
  function reverseString(string) {
    return string.split('').reverse().join('');
  }

  const formatted = String(palindrome)
    .replaceAll(' ', '')
    .toLowerCase();

  return formatted === reverseString(formatted);
}
