import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Review } from '@perf-review/api-interfaces';
import { ReviewDTO } from './review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // GET - http://localhost:3333/api/review
  @Get()
  returnAll(): Promise<Review[]> {
    return this.reviewService.returnReviews();
  }

  // GET - http://localhost:3333/api/review/1
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Review> {
    return this.reviewService.findById(id);
  }

  // GET - http://localhost:3333/api/review/revieweeId/1
  @Get('/:sourceType/:id')
  findBySource(
    @Param('sourceType') sourceType: string,
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<Review[]> {
    return this.reviewService.findBySource(sourceType, id);
  }

  // POST - http://localhost:3333/api/review + Review interface in body
  @Post()
  create(@Body() review: ReviewDTO): Promise<Review> {
    return this.reviewService.createReview(review);
  }

  // PUT - http://localhost:3333/api/review/1 + Review interface in body
  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() review: ReviewDTO): Promise<Review> {
    return this.reviewService.updateReview(id, review);
  }

  // DELETE - http://localhost:3333/api/review/1
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.reviewService.deleteReview(id);
  }
}
