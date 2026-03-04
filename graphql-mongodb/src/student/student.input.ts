import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateStudentInput {
    @Field()
    @MinLength(5)
    firstName: string;

    @Field()
    @MinLength(5)
    lastName: string;
}