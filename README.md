# Challenge Description

Use exactly four 4's to form every integer from 0 to 50 (may be till 100),
using only the operators +, −, ×, /, () (brackets), . (decimal point), √ (square root) and ! (factorial).

### Limitations
- The algorithm considers concatenation of two 4's as 44, but not three or four 4's
as the problem statement already mentioned the upper constraint to be not more than 100, so it will not be efficient if we take three 4's concatenation (i.e 444) into account.
*Limitaion: Does't use concatenation over results [eg. the program will not consider 4(4-4)4 as 404 or similarly (44/4)4 as 114].*
- Doesn't use to the power of 4 [eg. the program doesn't use (44/4)^4]
- Unsolved numbers less than and equals to 100 are 73, 77, 81, 87, 93, 99
- Bracket combinations checked
(((x, x), x), x)
(x, (x, (x, x)))
((x, x), (x, x))
(x, ((x, x), x))
((x, (x, x)), x)
((x, x), x)
(x, (x, x))

81 = (4-(4/4))^4

Can exclude operators in calculation