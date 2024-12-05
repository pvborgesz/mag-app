import { AppError } from "@/shared/helpers/errors"

export const boolean = (value?: any) => {
  if (String(value).trim() === '' || value === null || value === undefined) {
    return undefined
  }
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') {
      return true
    }
    if (value.toLowerCase() === 'false') {
      return false
    }
  }
  if (typeof value !== 'boolean') {
    throw new AppError(`${value} deve ser um booleano ou uma representação de string válida de booleano`)
  }
  if (typeof value === 'boolean') {
    return value
  }
  return undefined
}
