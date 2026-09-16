export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 72

interface PasswordCheck {
  key: string
  label: string
  message: string
  test: (value: string) => boolean
}

export const PASSWORD_CHECKS: PasswordCheck[] = [
  {
    key: 'uppercase',
    label: 'Une majuscule',
    message: 'Le mot de passe doit contenir une majuscule',
    test: (value) => /[A-Z]/.test(value),
  },
  {
    key: 'lowercase',
    label: 'Une minuscule',
    message: 'Le mot de passe doit contenir une minuscule',
    test: (value) => /[a-z]/.test(value),
  },
  {
    key: 'digitOrSpecial',
    label: 'Un chiffre ou un caractère spécial',
    message: 'Le mot de passe doit contenir un chiffre ou un caractère spécial',
    test: (value) => /\d/.test(value) || /[^A-Za-z0-9]/.test(value),
  },
]

export const PASSWORD_RULES: PasswordCheck[] = [
  {
    key: 'length',
    label: '8 caractères minimum',
    message: 'Le mot de passe doit contenir au moins 8 caractères',
    test: (value) => value.length >= PASSWORD_MIN_LENGTH,
  },
  ...PASSWORD_CHECKS,
]

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = LOWER.toUpperCase()
const DIGITS = '0123456789'
const SPECIAL = '!@#$%^&*()-_=+?'
const ALL = LOWER + UPPER + DIGITS + SPECIAL

function randomOf(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)]
}

export function generateStrongPassword(length = 15): string {
  const required = [randomOf(LOWER), randomOf(UPPER), randomOf(DIGITS), randomOf(SPECIAL)]
  while (required.length < length) {
    required.push(randomOf(ALL))
  }
  for (let i = required.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[required[i], required[j]] = [required[j], required[i]]
  }
  return required.join('')
}