import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {modelOptions, prop, Severity} from "@typegoose/typegoose";
import {Types} from "mongoose";

@modelOptions({ options: {allowMixed: Severity.ALLOW} })
export class ReviewModel extends TimeStamps {

    @prop()
    _id: string;

    @prop()
    name: string;

    @prop()
    title: string;

    @prop()
    description: string;

    @prop()
    rating: number;

    @prop()
    productId: Types.ObjectId
}
