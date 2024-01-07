import { SumTwoNumberNonNegative } from "../math";

namespace TestTypes {
  type type1 = Expect<Equal<SumTwoNumberNonNegative<0, 0>, 0>>;
}
