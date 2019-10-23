import { forwardRef, Module } from '@nestjs/common';
import { ReviewModule } from './../review/review.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [forwardRef(() => ReviewModule)],
  exports: [EmployeeService],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
