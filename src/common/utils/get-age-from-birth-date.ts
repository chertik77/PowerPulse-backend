export const getAgeFromBirthDate = (birthDate: string | Date) => {
  const today = new Date()
  const birthDateToCheck = new Date(birthDate)
  let age = today.getFullYear() - birthDateToCheck.getFullYear()
  const month = today.getMonth() - birthDateToCheck.getMonth()

  if (
    month < 0 ||
    (month === 0 && today.getDate() < birthDateToCheck.getDate())
  ) {
    age--
  }

  return age
}
