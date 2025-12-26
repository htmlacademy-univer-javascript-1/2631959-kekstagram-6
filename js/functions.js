export function validateLength(string, maxLength) {
  return string.length <= maxLength;
}

export function isPalindrome(palindrome) {
  const reverseString = (string) => string.split('').reverse().join('');

  const formatted = palindrome
    .replaceAll(' ', '')
    .toLowerCase();

  return formatted === reverseString(formatted);
}

export function extractNumbers(input) {
  const string = String(input);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return parseInt(result, 10);
}

export function checkMeetingTime(workDayStart, workDayEnd, meetingStart, meetingLength) {
  const convertToMinutes = (timeString) => {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
  };

  const startOfWork = convertToMinutes(workDayStart);
  const endOfWork = convertToMinutes(workDayEnd);
  const startOfMeeting = convertToMinutes(meetingStart);
  const endOfMeeting = startOfMeeting + meetingLength;

  const isStartValid = startOfMeeting >= startOfWork;
  const isEndValid = endOfMeeting <= endOfWork;

  return isStartValid && isEndValid;
}
