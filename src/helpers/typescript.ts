/**
 * Unlike TypeScript's `NonNullable`, this does _not_ include `undefined`
 */
export type Nullable<T> = T | null

export const isDefined = <T>(x: T | null | undefined): x is T =>
  x !== null && x !== undefined

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>
