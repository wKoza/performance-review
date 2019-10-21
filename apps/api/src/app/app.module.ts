import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeeController, ReviewController],
  providers: [AppService, EmployeeService, ReviewService]
})
export class AppModule {}
