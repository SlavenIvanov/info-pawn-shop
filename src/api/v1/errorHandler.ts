import PawnAssignedToNullCustomerError from './pawns/errors/PawnAssignedToNullCustomer.error'

// @ts-ignore
export default function errorHandler(err, req, res, next) {
    if (err instanceof PawnAssignedToNullCustomerError) {
        res.status(400).send({message: err.message})
    }
    next(err)
}