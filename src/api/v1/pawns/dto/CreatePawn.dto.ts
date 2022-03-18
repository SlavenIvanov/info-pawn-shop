import {IsInt, IsString, Min, MinLength} from "class-validator"

export class CreatePawnDto {

    @IsString()
    @MinLength(5)
    description: string

    @IsInt()
    @Min(100)
    loanSum: number

    @IsInt()
    loanedBy: number

}