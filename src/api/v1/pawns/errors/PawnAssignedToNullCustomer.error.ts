export default class PawnAssignedToNullCustomerError extends Error {
    constructor() {
        super()
        this.message = "The Pawn must be assigned to an existing Customer"
    }
}