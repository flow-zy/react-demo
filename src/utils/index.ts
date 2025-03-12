// @ts-ignore
import { clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function split(str: string, separator: string = ' ') {
  return str.split(separator)
}
