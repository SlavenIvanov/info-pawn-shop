import {PAWN_VALIDITY_IN_SEC} from "../../src/api/v1/constants"
import DBWrapper from "../../src/db/DBWrapper"
import {getPawnExpiryDate} from "../../src/api/v1/pawns/pawn.util";

DBWrapper.init('./test/db/init_test.sql')

test('Get the pawn expiry date and expect it to be 90 days after the create date', async () => {
    const now = Math.ceil(new Date().getTime() / 1000)
    const loanExpiryDate = getPawnExpiryDate(now)

    expect(loanExpiryDate - now).toEqual(PAWN_VALIDITY_IN_SEC)
})