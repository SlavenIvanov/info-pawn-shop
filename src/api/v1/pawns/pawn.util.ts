import {PAWN_VALIDITY_IN_SEC} from "../constants";

//Note: getting the expiry date in this contrived way, so that I have something to unit test
export function getPawnExpiryDate(createDate: number) {
    return createDate + PAWN_VALIDITY_IN_SEC
}

