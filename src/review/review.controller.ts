import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CreateReviewDto} from "./dto/create-review.dto";
import {ReviewService} from "./review.service";
import {REVIEW_NOT_FOUND} from "./review.constants";
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {
    }


    @UsePipes(new ValidationPipe())
    @Post("create")
    async create(@Body() dto: CreateReviewDto){
        return this.reviewService.create(dto);
    }

    @Delete(":id")
    async delete(@Param("id") id: string){
        const deletedDoc = this.reviewService.delete(id);

        if(!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get("byProduct/:productId")
    async getByProduct(@Param("productId") productId: string){

        return this.reviewService.findByProductId(productId);

    }

}
