import { Module } from '@nestjs/common';
import {TypegooseModule} from "nestjs-typegoose";
import {ReviewController} from "./review.controller";
import {ReviewService} from "./review.service";
import {ReviewModel} from "./review.model";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: "Review"
        }
      }
    ]),
      ConfigModule
  ],
  providers: [ReviewService]
})
export class ReviewModule {}
