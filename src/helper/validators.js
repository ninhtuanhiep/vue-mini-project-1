const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim())
}

export function validatePassword(password) {
  if (password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự'
  }
  return null
}

export function validateRegisterForm({ fullName, email, password, confirmPassword }) {
  if (!fullName.trim()) {
    return 'Vui lòng nhập họ tên'
  }

  if (!email.trim()) {
    return 'Vui lòng nhập email'
  }

  if (!isValidEmail(email)) {
    return 'Email không đúng định dạng'
  }

  if (!password.trim()) {
    return 'Vui lòng nhập mật khẩu'
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    return passwordError
  }

  if (password !== confirmPassword) {
    return 'Mật khẩu nhập lại không khớp'
  }

  return null
}
