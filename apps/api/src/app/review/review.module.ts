import { forwardRef, Module } from '@nestjs/common';
import { EmployeeModule } from './../employee/employee.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [forwardRef(() => EmployeeModule)],
  exports: [ReviewService],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
