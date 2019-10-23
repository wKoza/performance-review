import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ReviewModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
