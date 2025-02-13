import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并类名工具函数
 * @param  {...any} inputs - 类名输入
 * @returns {string} 合并后的类名
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
