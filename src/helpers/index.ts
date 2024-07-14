export const getAge = (birthDate: string) => {
  const today = new Date()
  const dateOfBirth = new Date(birthDate)
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const month = today.getMonth() - dateOfBirth.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }

  return age
}
