/* eslint-disable @typescript-eslint/no-namespace */
type A = Math.Add<1, -1>; // 3
/**
 * @description 两个非负数相加
 */
type SumTwoNumberNonNegative<
  A extends number,
  B extends number,
  Temp1 extends any[] = [],
  Temp2 extends any[] = [],
  Temp3 extends any[] = []
> = Temp1["length"] extends B
  ? Temp2["length"] extends A
    ? Temp3["length"]
    : SumTwoNumberNonNegative<A, B, Temp1, [...Temp2, A], [...Temp3, B]>
  : SumTwoNumberNonNegative<A, B, [...Temp1, B], [...Temp2, A]>;

/**
 * @description 两个负数相加
 */
type SumTwoNumberBothNegative<
  A extends number,
  B extends number,
  Temp1 extends any[] = [],
  Temp2 extends any[] = [],
  Temp3 extends any[] = []
> = Temp1["length"] extends A
  ? Temp2["length"] extends B
    ? Temp3["length"]
    : SumTwoNumberBothNegative<A, B, Temp1, [...Temp2, B], [...Temp3, B]>
  : SumTwoNumberBothNegative<A, B, [...Temp1, A], Temp2, [...Temp3, A]>;
/**
 * @description 两个正数相减 其中 A > B
 */
type SubtractTwoNumberBothPositiveAndAGreaterB<
  A extends number,
  B extends number,
  Temp1 extends any[] = [],
  Temp2 extends any[] = [],
  Temp3 extends any[] = []
> = Temp1["length"] extends B
  ? Temp2["length"] extends A
    ? Temp3["length"]
    : SubtractTwoNumberBothPositiveAndAGreaterB<
        A,
        B,
        Temp1,
        [...Temp2, A],
        [...Temp3, B]
      >
  : SubtractTwoNumberBothPositiveAndAGreaterB<
      A,
      B,
      [...Temp1, B],
      [...Temp2, A]
    >;
/**
 * @description 两个正数相减 其中 A < B
 */
type SubtractTwoNumberBothPositiveAndALessB<
  A extends number,
  B extends number
> = SubtractTwoNumberBothPositiveAndAGreaterB<B, A>;

/**
 * @description 一个负数一个正数相加, 其中正数大于负数
 *
 */
type SumTwoNumberOnePositiveOneNegativeAndPositiveGreater<
  A extends number,
  B extends number
> = Math.IsNegative<A> extends true
  ? SubtractTwoNumberBothPositiveAndAGreaterB<B, Math.Negation<A>>
  : SubtractTwoNumberBothPositiveAndAGreaterB<A, Math.Abs<B>>;
/**
 * @description 一个负数一个正数相加, 其中正数小于负数
 */
type SumTwoNumberOnePositiveOneNegativeAndPositiveLess<
  A extends number,
  B extends number
> = Math.IsNegative<A> extends true
  ? SumTwoNumberNotNegative<Math.Negation<A>, B>
  : SumTwoNumberNotNegative<A, Math.Negation<B>>;

/**
 * @description 判断两个负数都是负数
 */
type IsTwoNumberBothNegative<
  A extends number,
  B extends number
> = Math.IsNegative<A> extends true
  ? Math.IsNegative<B> extends true
    ? true
    : false
  : false;
/**
 * @description 两个正数比较大小 A > B 返回 true 否则返回 false
 */
type TwoNumberBothPositiveGreater<
  A extends number,
  B extends number,
  Temp1 extends any[] = Darwish.Iteraor<A>,
  Temp2 extends any[] = Darwish.Iteraor<B>
> = Temp1["length"] extends 0
  ? false
  : Temp1 extends [infer F, ...infer R]
  ? Temp1["length"] extends Temp2["length"]
    ? true
    : TwoNumberBothPositiveGreater<A, B, R, Temp2>
  : false;
/**
 * @description 两个数是否是非负数
 */
type IsTwoNumberBothNonNegativeNum<
  A extends number,
  B extends number
> = Math.IsNonNegativeNum<A> extends true
  ? Math.IsNonNegativeNum<B> extends true
    ? true
    : false
  : false;

type A22 = Math.SomeSignNumber<0, 1>; // 2
export declare namespace Math {
  type Add<A extends number, B extends number> = SomeSignNumber<
    A,
    B
  > extends true
    ? true
    : false;
  // ? IsTwoNumberBothNonNegativeNum<A, B> extends true
  //   ? SumTwoNumberNotNegative<A, B>
  //   : Math.Negation<SumTwoNumberNotNegative<A, B>>
  // : false;

  type Subtract<
    A extends number,
    B extends number,
    Temp1 extends any[] = [],
    Temp2 extends any[] = [],
    Temp3 extends any[] = []
  > = Temp1["length"] extends B
    ? Temp2["length"] extends A
      ? Temp3["length"]
      : Subtract<A, B, Temp1, [...Temp2, A], [...Temp3, B]>
    : Subtract<A, B, [...Temp1, B], [...Temp2, A]>;
  /**
   * @description 两个数比较大小 A > B 返回 true 否则返回 false
   */
  type TwoNumberGreater<A extends number, B extends number> = Darwish.Equal<
    A,
    B
  > extends true
    ? false
    : IsTwoNumberBothNegative<A, B> extends true
    ? TwoNumberGreater<Abs<B>, Abs<A>>
    : IsNegative<A> extends true
    ? false
    : IsNegative<B> extends true
    ? true
    : Darwish.Equal<A, 0> extends true
    ? false
    : Darwish.Equal<B, 0> extends true
    ? true
    : TwoNumberBothPositiveGreater<A, B>;
  /**
   * @description 判断一个类型是否是负数
   * @example
   * type A = isNegative<1> // false
   * type B = isNegative<-1> // true
   */
  type IsNegative<N extends number> = `${N}` extends `-${string}`
    ? true
    : false;
  /**
   * @description abs 绝对值 结果是一个字符串
   */
  type AbsStr<T extends number | string | bigint> =
    `${T}` extends `-${infer Num}` ? Num : `${T}`;
  /**
   * @description abs 绝对值 结果是原类型
   */
  type Abs<T extends number | string | bigint> = T extends number | bigint
    ? Darwish.ToNumber<AbsStr<T>>
    : never;
  /**
   * @description 一个数字取反
   */
  type Negation<T extends number> = IsNegative<T> extends true
    ? Abs<T>
    : Darwish.ToNumber<`-${T}`>;
  /**
   * @description 是否是0
   */
  type IsZero<T extends number> = Darwish.Equal<T, 0> extends true
    ? true
    : false;
  /**
   * @description 两个数符号是否相同
   */
  type SomeSignNumber<
    A extends number,
    B extends number
  > = IsZero<A> extends true
    ? IsZero<B> extends true
      ? true
      : false
    : Math.IsNegative<A> extends true
    ? Math.IsNegative<B> extends true
      ? true
      : false
    : Math.IsNegative<A> extends false
    ? Math.IsNegative<B> extends false
      ? true
      : false
    : false;
  /**
   * @description 一个数是否是非负数
   */
  type IsNonNegativeNum<T extends number> = IsNegative<T> extends false
    ? true
    : false;
}
export type { SumTwoNumberNonNegative };
